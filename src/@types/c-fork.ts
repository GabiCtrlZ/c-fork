export interface Cfork {
  fork(): number,
  isRunning(pid: number): number,
  kill(pid: number): void,
  exit(code: number): void,
  waitForChildToSettle(pid: number, timeout: number): Promise<number>,
}
