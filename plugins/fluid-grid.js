
const { _DEFAULT_DEVICES, _DEFAULT_OVERLAY } = require('../_defaults/_grid')
const plugin = require('tailwindcss/plugin')
const { toRem } = require('../utils')

const MAX_RULES = 30

const generateNumbers = (max = MAX_RULES) => {
  let numbers = {}
  for (let i = 1; i <= max; i++) {
    numbers[i] = i
  }
  return numbers
}

const SPREAD_RULES = {
  tighter: -2,
  tight: -1,
  wide: 1,
  wider: 2,
}

// const globalValues = {
//   screen: '100vh',
//   's-screen': '100svh',
//   'd-screen': '100dvh',
//   none: 'none',
//   full: '100%',
//   auto: 'auto',
//   '0': '0px',
//   px: '1px',
// }

const GRID_VARIABLES = {
  'cols': 'column',
  'margin': 'margin',
  'gutter': 'gutter',
}

const PROPERTIES = {
  mx: ['margin-right', 'margin-left'],
  ml: ['margin-left'],
  mr: ['margin-right'],
  mt: ['margin-top'],
  my: ['margin-top', 'margin-bottom'],
  mb: ['margin-bottom'],
  m: ['margin'],
  p: ['padding'],
  top: ['top'],
  left: ['left'],
  right: ['right'],
  bottom: ['bottom'],
  inset: ['inset'],
  px: ['padding-right', 'padding-left'],
  py: ['padding-top', 'padding-bottom'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pl: ['padding-left'],
  pb: ['padding-bottom'],
  'min-w': ['min-width'],
  'max-w': ['max-width'],
  w: ['width'],
  'min-h': ['min-height'],
  'max-h': ['max-height'],
  h: ['height'],
  'scroll-p': ['scroll-padding'],
  'scroll-m': ['scroll-margin'],
  'scroll-px': ['scroll-padding-left', 'scroll-padding-right'],
  'scroll-mx': ['scroll-margin-left', 'scroll-margin-right'],
  'scroll-py': ['scroll-padding-top', 'scroll-padding-bottom'],
  'scroll-my': ['scroll-margin-top', 'scroll-margin-bottom'],
  square: ['width', 'height'],
  gap: ['column-gap', 'row-gap'],
  'gap-x': ['column-gap'],
  'gap-y': ['row-gap'],
  indent: ['text-indent'],
}

const generateGridSvg = (device, gridSettings) => {
  const { size, columns, margin, gutter, scaledSize } = device
  const { color, opacity, width } = gridSettings
  const s = scaledSize || size

  let lines = ``

  const arr = Array.from({ length: columns }, (_, i) => i)
  const marginPercentage = ((margin) / s) * 100
  const gutterPercentage = ((gutter) / s) * 100


  // left margin
  lines += `<rect x='${marginPercentage}%' y='0' height='100%' fill='${color}' width='${width}' opacity='${opacity}' />`

  // columns and gutters
  arr.forEach((index) => {

    if (index === 0) return

    let allGutters = ((columns - 1) * gutter) // width of all gutters
    let w = s - (margin * 2) - allGutters // width of all columns combined
    let c = w / columns // width of a single column (px)
    let colWidth = c * index
    let cwg = ((colWidth / s) * 100) + (gutterPercentage * index - 1)

    lines += `<rect x='calc(${marginPercentage}% + ${cwg}% + 2.5px)' y='0' height='100%' fill='${color}' width='${width}' opacity='${opacity}' />`

    lines += `<rect x='calc(${marginPercentage}% + ${cwg}% + ${gutterPercentage}% + 2.5px)' y='0' height='100%' fill='${color}' width='${width}' opacity='${opacity}' />`
  })

  // right margin
  lines += `<rect x='calc(100% - ${marginPercentage}%)' y='0' height='100%' fill='red' width='${width}' opacity='${opacity} ' />`

  return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>${lines}</svg>");`

}

const generateVariables = (devices, addBase, gridSettings) => {
  const baseVariables = {
    '--scrollbar': '0px',
    '--all-gutters': 'calc(var(--gutter) * (var(--column-count) - 1));',
    '--column': `calc((var(--screen-width) - (var(--margin) * 2) - var(--all-gutters)) / var(--column-count));`,

  }

  Object.entries(devices).forEach(([name, device], index) => {
    const isFirstDevice = index === 0
    const isLastDevice = index === Object.keys(devices).length - 1
    const { margin = 10, gutter = 10, columns = 10, size, scaledSize, maxScalingWidth } = device

    let mediaQuery
    let gridVars = {}
    let overlay = {}

    // if (isLastDevice) {
    //   mediaQuery = `@media (min-width: ${size}px)`
    // } else {
    //   mediaQuery = `@media (${isFirstDevice ? 'max' : 'min'}-width: ${size}px)${(maxScalingWidth) ? ` and (max-width: ${maxScalingWidth}px)` : ''}`
    // }

    if (isFirstDevice) {

      // mediaQuery = `@media (max-width: ${size}px)`
      gridVars = {
        '--margin': toRem(margin),
        '--gutter': toRem(gutter),
        '--column-count': `${columns}`,
        '--comp-size': `${scaledSize || size}`,
        '--screen-width': 'calc(100vw - var(--scrollbar));',
        ...baseVariables
      }
      overlay = {
        'body': {
          ['&::before']: {
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'var(--grid-visibility)',
            right: 0,
            bottom: 0,
            maxWidth: maxScalingWidth ? maxScalingWidth + 'px' : '100%',
            width: '100%',
            margin: '0 auto',
            height: '100lvh',
            content: '""',
            pointerEvents: 'none',
            backgroundImage: generateGridSvg(device, gridSettings),
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }
        }
      }
    } else {
      mediaQuery = `@media (min-width: ${size}px)`
      gridVars = {
        [mediaQuery]: {
          '--margin': toRem(margin),
          '--gutter': toRem(gutter),
          '--column-count': `${columns}`,
          '--comp-size': `${scaledSize || size}`,
          ...baseVariables
        }
      }

      overlay = {
        'body': {
          ['&::before']: {
            [mediaQuery]: {
              zIndex: 999999,
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'var(--grid-visibility)',
              right: 0,
              bottom: 0,
              maxWidth: maxScalingWidth ? maxScalingWidth + 'px' : '100%',
              width: 'calc(var(--screen-width) + 2 * var(--margin))',
              margin: '0 auto',
              height: '100lvh',
              content: '""',
              pointerEvents: 'none',
              backgroundImage: generateGridSvg(device, gridSettings),
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }
          }
        }
      }
    }

    const fontScaling = {
      // [mediaQuery]: {
      '--grid-visibility': 'none',
      // [mediaQuery]: {
      fontSize: 'calc(var(--screen-width) / (var(--comp-size)) * 10);'
      // }
      // }
    }

    if (maxScalingWidth) {
      gridVars[`@media (max-width: ${maxScalingWidth}px)`] = {
        '--max-scaling': maxScalingWidth + 'px',
        '--screen-width': maxScalingWidth
      }
    }

    if (maxScalingWidth) {
      fontScaling[`@media (min-width: ${maxScalingWidth}px)`] = {
        fontSize: '1rem !important'
      }
    }

    addBase({
      ':root': {
        ...gridVars
      },
      'html': {
        ...fontScaling
      },
      ...overlay,
      '.grid-contain': {
        maxWidth: 'var(--max-scaling)',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    })
  })
}

const generateGridUtilities = (matchUtilities) => {
  const colWidth = (columns) => {
    const isArray = Array.isArray(columns)
    let cols = isArray ? +columns[0] : +columns
    let spread = isArray ? SPREAD_RULES[columns[1]] : 0

    if (cols > 1) {
      return `calc((var(--column) * ${cols}) + var(--gutter) * ${(cols - 1) + spread});`
    } else {
      return 'calc(var(--column) * 1);'
    }
  }

  const generateSpreadValues = () => {
    let obj = {}
    Object.entries(SPREAD_RULES).forEach(([key, value]) => {
      for (let i = 1; i <= MAX_RULES; i++) {
        obj[i] = i
        obj[`${i}-${key}`] = [i, key]
      }
    })
    return obj
  }

  const variableProperty = (variable, value) => {
    return `calc(var(--${variable}) * ${value});`
  }

  Object.entries(GRID_VARIABLES).forEach(([varShorthand, variable]) => {
    Object.entries(PROPERTIES).forEach(([propertyShorthand, properties]) => {
      let varName = `${varShorthand}-${propertyShorthand}`
      // Create spread rules for cols shorthand
      if (varShorthand === 'cols') {
        matchUtilities(
          {
            [varName]: (value) => {
              let rule = {}
              properties.forEach((property) => {
                let v
                v = colWidth(value)
                rule[property] = v
              })
              return rule
            },
          },
          {
            values: generateSpreadValues()
          }
        )
      } else {
        matchUtilities(
          {
            [varName]: (value) => {
              let rule = {}
              properties.forEach((property) => {
                let v
                v = variableProperty(varShorthand, value)
                rule[property] = v
              })
              return rule
            },
          },
          {
            values: generateNumbers()
          }
        )
      }
    })
  })
}


const fluidGridPlugin = plugin(function ({ addBase, theme, matchUtilities }) {
  const devices = { ..._DEFAULT_DEVICES, ...theme('devices') }
  const gridSettings = { ..._DEFAULT_OVERLAY, ...theme('gridOverlay') }

  if (!devices) {
    console.warn('No devices found, using defaults')
  }

  generateVariables(devices, addBase, gridSettings)
  generateGridUtilities(matchUtilities)
  // generateSvgGrid(devices, gridSettings, addBase)

})

export default fluidGridPlugin