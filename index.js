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
		exit: cfork.exit,
		isRunning: (pid) => {
			if (typeof pid !== 'number' || pid <= 0) {
				throw new Error('pid must be a valid process id')
			}
			cfork.isRunning(pid)
			return cfork.isRunning(pid) !== -1
		},
	}
}