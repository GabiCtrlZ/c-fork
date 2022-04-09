import unixFork from './unix-fork'
import { isPositiveInteger, isRunningOnLinux } from './utils'
import {
  NOT_SUPPORTED_ERROR,
  INVALID_PID_ERROR,
  INVALID_CODE_ERROR,
  TIMEOUT_ERROR,
  CHILD_THROWN_ERROR,
} from './errors'

const fork = (): number => {
  if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)

  return unixFork.fork()
}

const kill = (pid: number): number => {
  if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
  if (!isPositiveInteger(pid)) throw new Error(INVALID_PID_ERROR)

  return unixFork.kill(pid)
}

const exit = (code: number): number => {
  if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
  if (code !== 1 && code !== 0) throw new Error(INVALID_CODE_ERROR)

  return unixFork.exit(code)
}

const isRunning = (pid: number): number => {
  if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)
  if (!isPositiveInteger(pid)) throw new Error(INVALID_PID_ERROR)

  return unixFork.isRunning(pid)
}

const waitForChildToSettle = (pid: number, timeout: number): Promise<number> => {
  if (!isRunningOnLinux()) throw new Error(NOT_SUPPORTED_ERROR)

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(TIMEOUT_ERROR))
      unixFork.kill(pid)
    }, timeout)

    const check = () => {
      const exitCode = isRunning(pid)

      if (exitCode === 15) {
        clearTimeout(timer)
        resolve(exitCode)
      } else if (exitCode === 9) {
        clearTimeout(timer)
        reject(new Error(CHILD_THROWN_ERROR))
      } else {
        setTimeout(check, 1000)
      }
    }

    check()
  })
}

const runFunctionInChild = async <T extends () => void>(fn: T, timeout: number): Promise<void> => {
  const pid = fork()

  if (pid === 0) {
    let exitCode = 0

    try {
      await fn()
    } catch (error) {
      exitCode = 1
      throw error
    } finally {
      exit(exitCode)
    }
  } else {
    await waitForChildToSettle(pid, timeout)
  }
}

export const cfork = {
  fork,
  kill,
  exit,
  isRunning,
  waitForChildToSettle,
  runFunctionInChild,
}
