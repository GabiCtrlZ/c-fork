const isPositiveInteger = (value) => (typeof value === 'number' && value > 0 && Number.isInteger(value))
const isRunningOnLinux = () => process.platform === 'linux'

module.exports = {
  isPositiveInteger,
  isRunningOnLinux,
}