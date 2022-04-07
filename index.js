const cfork = require('./build/Release/cfork')

module.exports = {
	cfork: {
		fork: cfork.fork,
		kill: (pid) => {
			if (typeof pid !== 'number' || pid <= 0) {
				throw new Error('pid must be a valid process id')
			}
			return cfork.kill(pid)
		},
		exit: (code) => {
			if (typeof code !== 'number' || (code !== 0 && code !== 1)) {
				throw new Error('exit code must be 0 or 1')
			}
			return cfork.exit(code)
		},
		isRunning: (pid) => {
			if (typeof pid !== 'number' || pid <= 0) {
				throw new Error('pid must be a valid process id')
			}
			return cfork.isRunning(pid)
		},
	}
}