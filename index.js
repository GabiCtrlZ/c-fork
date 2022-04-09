const cfork = require('./build/Release/cfork')
const { isPositiveInteger, isRunningOnLinux } = require('./utils')
const {
	NOT_SUPPORTED_ERROR,
	INVALID_PID_ERROR,
	INVALID_CODE_ERROR,
	TIMEOUT_ERROR,
	CHILD_THROWN_ERROR,
} = require('./errors')

const fork = () => {
	if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)

	return cfork.fork()
}

const kill = (pid) => {
	if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
	if (!isPositiveInteger(pid)) throw new Error(INVALID_PID_ERROR)

	return cfork.kill(pid)
}

const exit = (code) => {
	if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
	if (code !== 1 && code !== 0) throw new Error(INVALID_CODE_ERROR)

	return cfork.exit(code)
}

const isRunning = (pid) => {
	if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
	if (!isPositiveInteger(pid)) throw new Error(INVALID_PID_ERROR)

	return cfork.isRunning(pid)
}

const waitForChildToSettle = (pid, timeout) => {
	if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error(TIMEOUT_ERROR))
			cfork.kill(pid)
		}, timeout)

		const check = () => {
			const exitCode = isRunning(pid)
			if (exitCode === 15) {
				clearTimeout(timer)
				resolve(exitCode)
			} else if (exitCode === 9) {
				clearTimeout(timer)
				reject(new Error(CHILD_THROWN_ERROR))
			}
			else {
				setTimeout(check, 1000)
			}
		}

		check()
	})
}

module.exports = {
	cfork: {
		fork,
		kill,
		exit,
		isRunning,
		waitForChildToSettle,
	},
	NOT_SUPPORTED_ERROR,
	INVALID_PID_ERROR,
	INVALID_CODE_ERROR,
	TIMEOUT_ERROR,
	CHILD_THROWN_ERROR,
}