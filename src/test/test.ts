import { cfork } from '../cfork'

const sleep = (ms: number): Promise<void> => new Promise((resolve) => { setTimeout(resolve, ms) })

const main = () => cfork.runFunctionInChild(async () => {
  console.log('child is running')
  await sleep(5_000)
  console.log('child exiting')
}, 10_000)

main()
