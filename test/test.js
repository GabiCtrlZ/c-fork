const { cfork } = require('../index.js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {

  const pid = cfork.fork()
  if (pid === 0) {
    console.log('child is running')
    await sleep(5_000)
    console.log('child exiting')
    cfork.exit(0)
  }
  else {
    await cfork.waitForChildToSettle(pid, 10_000)
    console.log('child exited successfully')
  }
}

main()