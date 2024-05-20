export const toRem = (px) => {
  return `${+px / 10}rem`
}

export const generateNumericScale = (start, end, step = 1, unit = '') => {
  let scale = {}
  for (let i = start; i <= end; i += step) {
    scale[i] = `i${unit}`
  }
  return scale
}

export const hexToRgb = (hex) => {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }

  // 6 digits
  if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `${r} ${g} ${b}`;
}