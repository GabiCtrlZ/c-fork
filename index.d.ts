export interface Cfork {
  fork(): number,
  isRunning(pid: number): number,
  kill(pid: number): void,
  exit(number): void,
}

export const cfork: Cfork