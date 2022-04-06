export interface Cfork {
  fork(): number,
  isRunning(pid: number): boolean,
  kill(pid: number): void,
  exit(): void,
}

export const cfork: Cfork