import { cfork } from '../cfork'

console.log('should print this once')

const pid = cfork.fork()

console.log(`forked pid: ${pid}`)
