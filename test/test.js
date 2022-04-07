const { cfork } = require('../index.js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {

  const pid = cfork.fork()
  if (pid === 0) {
    console.log('child:', pid)
    let counter = 0
    for (let i = 0; i < 10_000_000_000; i++) {
      counter++
    }
    console.log('child exiting')
    cfork.exit()
  }
  else {
    console.log('parent:', pid)
    let retries = 0;
    let isRunning = cfork.isRunning(pid)
    while (isRunning === 0) {
      isRunning = cfork.isRunning(pid)
      console.log(`isRunning: ${isRunning}`)
      if (retries > 10) {
        console.log('taking too long, killing:', pid)
        cfork.kill(pid)
      }
      console.log('waiting for child to finish', retries)
      await sleep(1000)
      retries++
    }
    console.log('child', pid, 'has finished')
  }
}

main()