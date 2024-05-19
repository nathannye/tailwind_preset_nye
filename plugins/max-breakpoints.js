const plugin = require('tailwindcss/plugin')
const _DEFAULT_DEVICES = require('../_defaults/_grid')


const maxBreakpointsPlugin = plugin(function ({ theme, addVariant }) {
  const devices = theme('devices') || _DEFAULT_DEVICES

  Object.entries(devices).forEach(([key, value]) => {
    const { size } = value

    // Create a -max breakpoint for each device
    addVariant(key, `@media (min-width: ${size}px)`)
    addVariant(`${key}-max`, `@media (max-width: ${size}px)`)
  })
})

module.exports = maxBreakpointsPlugin