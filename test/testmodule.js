const { cfork } = require('../index.js')

console.log('should print this once')

const pid = cfork.fork()
console.log('forked pid: ' + pid)