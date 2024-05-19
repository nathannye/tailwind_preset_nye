const opacities = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

const opacityParser = (rgbVar, opacityValue) => {
  return opacityValue ? `rgba(${rgbVar},${opacityValue})` : `rgb(${rgbVar})`;
};

// Generate opacity variants from custom vars
const opacityGenerator = (varName, rgbVar) => {
  const colorsWithOpacity = {};
  opacities.forEach((opacityVal) => {
    const obj = {
      [`${varName}/${opacityVal * 100}`]: `rgba(${rgbVar}, ${opacityVal})`,
    };

    Object.assign(colorsWithOpacity, obj);
  });
  // Generate base color with no opacity multiplier
  Object.assign(colorsWithOpacity, { [varName]: `rgb(var(--${varName}))` });

  return colorsWithOpacity;
};

module.exports = { opacityParser, opacityGenerator };
