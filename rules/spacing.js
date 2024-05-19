const { toRem } = require('../utils')

const arr = Array.from({ length: 1001 }, (_, i) => i)

const spacing = arr.map((i) => ({ [i]: toRem(i) }))

module.exports = spacing