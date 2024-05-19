const _DEFAULT_TYPOGRAPHY = require('../_defaults/_typography')

const { toRem } = require('../utils')
const plugin = require('tailwindcss/plugin')


const createMax = (size) => {
  return `max(12px,${toRem(size)})`
}

const font = ({ size, lineHeight: line, letterSpacing: letter }) => {
  let font = {
    fontSize: createMax(size),
    lineHeight: line ? line.toString() : '.9',
    letterSpacing: letter ? `${letter}em` : '-.03em',
  }

  return font
}

const fluidTypographyPlugin = plugin(function ({ theme, matchUtilities }) {
  const fontSizes = theme('fontSize')
  const settings = { ...theme('fluidTypography'), ..._DEFAULT_TYPOGRAPHY }


  const values = {}
  // get only keys from the fontSizes object
  Object.entries(fontSizes).map(([key, value]) => {
    if (!value.size) return
    values[key] = value.size
  })

  matchUtilities(
    {
      text: (value) => ({
        ...font(fontSizes[value])
      }),
    },
    { values }
  )
  // })
})

export default fluidTypographyPlugin