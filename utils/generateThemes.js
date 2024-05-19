const themes = require("../themes");

const generatedThemes = {};
Object.entries(themes).forEach(([themeName, themeColors]) => {
  const obj = {
    [`html[data-theme="${themeName}"]`]: {
      "--primary": themeColors.primary,
      "--solid": themeColors.solid,
      "--inverted": themeColors.inverted,
      "--primary-inverted": themeColors['primary-inverted']
    },
  };
  Object.assign(generatedThemes, obj);
});

module.exports = generatedThemes;
