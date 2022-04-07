export interface Cfork {
  fork(): number,
  isRunning(pid: number): number,
  kill(pid: number): void,
  exit(): void,
}

export const cfork: Cfork