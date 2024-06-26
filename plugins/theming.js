const plugin = require('tailwindcss/plugin');
const DEFAULT_THEME_ATTRS = require('../_defaults/_theming');
const { hexToRgb } = require('../utils');

const opacities = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
let colorObj = {}

const themePlugin = plugin(({ theme, addBase }) => {

  const { element, dataAttribute, defaultTheme } = { ...DEFAULT_THEME_ATTRS, ...theme('themeConfig') }

  const colors = theme('themeColors');


  // if colors are normal strings, dont turn themes on
  if (Object.values(colors).some(color => typeof color !== 'object')) return;


  const generateTheme = (themeName, colors, i) => {
    let vars = {}
    const base = {}

    const isDefault = typeof defaultTheme === 'string' ? (defaultTheme === themeName) : i === 0

    Object.entries(colors).forEach(([name, value]) => {

      if (isDefault) {
        colorObj[name] = `rgb(var(--${name}))`
      }
      vars[`--${name}`] = hexToRgb(value)
    })

    if (isDefault) {
      addBase({
        ':root': vars
      })
    } else {
      addBase({
        [`${element}[${dataAttribute}="${themeName}"]`]: vars
      })
    }

  }


  Object.entries(colors).forEach(([colorName, colorValue], index) => {
    // if (typeof colorValue === 'string') return;

    generateTheme(colorName, colorValue, index);

  })
}, {
  theme: {
    colors: colorObj
  }
})




module.exports = themePlugin;