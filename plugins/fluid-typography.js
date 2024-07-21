const _DEFAULT_TYPOGRAPHY = require('../_defaults/_typography')

const { toRem } = require('../utils')
const plugin = require('tailwindcss/plugin')


const createMax = (size, min) => {
  return `max(${min}px,${toRem(size)})`
}

const font = ({ size, lineHeight: line, letterSpacing: letter }, settings) => {

  const { minFontSize, minScalingFontSize } = settings

  const dontScale = minScalingFontSize && (size > minScalingFontSize)

  let font = {
    fontSize: dontScale ? `${size}px` : createMax(size, minFontSize),
    lineHeight: line ? line.toString() : '.9',
    letterSpacing: letter ? `${letter}em` : '-.03em',
  }

  return font
}

const fluidTypographyPlugin = plugin(function ({ theme, matchUtilities }) {
  const fontSizes = theme('fontSize')
  const settings = { ..._DEFAULT_TYPOGRAPHY, ...theme('fluidTypography') }


  const values = {}
  // get only keys from the fontSizes object
  Object.entries(fontSizes).map(([key, value]) => {
    if (!value.size) return
    values[key] = value.size
  })

  matchUtilities(
    {
      text: (value) => {
        if (!fontSizes[value]) return
        return {
          ...font(fontSizes[value], settings)
        }
      }
    },
    { values }
  )
})

export default fluidTypographyPlugin