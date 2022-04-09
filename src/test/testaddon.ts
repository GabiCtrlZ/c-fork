import unixFork from '../unix-fork'

console.log('should print this once')

const pid = unixFork.fork()

console.log(`forked pid: ${pid}`)
