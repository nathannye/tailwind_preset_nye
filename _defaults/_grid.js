const _DEFAULT_DEVICES = {
  sm: {
    columns: 10,
    size: 390,
    gutter: 10,
    margin: 20,
  },
  md: {
    columns: 4,
    size: 768,
    scaledSize: 768,
    gutter: 16,
    // maxScalingWidth: 540,
    margin: 16,
  },
  lg: {
    columns: 12,
    size: 1024,
    // scaledSize: 1280,
    maxScalingWidth: 1920,
    gutter: 16,
    margin: 48,
  },
}

const _DEFAULT_OVERLAY = {
  color: 'blue',
  opacity: 0.5,
  width: '4px',
}

module.exports = { _DEFAULT_DEVICES, _DEFAULT_OVERLAY }