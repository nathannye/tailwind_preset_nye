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