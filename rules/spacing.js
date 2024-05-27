const { toRem } = require('../utils')

const arr = Array.from({ length: 1001 }, (_, i) => i)
const spacing = {}

arr.forEach((i) => {
  spacing[i] = toRem(i)
})

module.exports = spacing