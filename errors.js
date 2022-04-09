const NOT_SUPPORTED_ERROR = 'cfork is not supported on this platform'
const INVALID_PID_ERROR = 'pid must be a valid process id'
const INVALID_CODE_ERROR = 'code must be 1 or 0'
const TIMEOUT_ERROR = 'child process did not finish in time'
const CHILD_THROWN_ERROR = 'child process threw an error'

module.exports = {
  NOT_SUPPORTED_ERROR,
  INVALID_PID_ERROR,
  INVALID_CODE_ERROR,
  TIMEOUT_ERROR,
  CHILD_THROWN_ERROR,
}