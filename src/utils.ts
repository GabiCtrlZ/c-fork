export const isPositiveInteger = (value: unknown) => (typeof value === 'number' && value > 0 && Number.isInteger(value))
export const isRunningOnLinux = () => process.platform === 'linux'
