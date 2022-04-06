const cfork = require('./build/Release/cfork');

module.exports = {
	cfork: {
		fork: cfork.fork,
		kill: cfork.kill,
		exit: cfork.exit,
		isRunning: (pid) => cfork.isRunning(pid) !== -1,
	}
};