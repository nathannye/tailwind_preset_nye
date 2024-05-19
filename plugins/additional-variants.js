const plugin = require('tailwindcss/plugin')

const additionalVariantsPlugin = plugin(function ({ addVariant }) {
  addVariant('not-first', '&:not(:first-child)')
  addVariant('not-last', '&:not(:last-child)')
})

module.exports = additionalVariantsPlugin