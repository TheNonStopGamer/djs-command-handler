// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export function assertArrayType<T, U extends T>(array: T[], filterType: Constructor<U>): boolean {
  return array.every(e => e instanceof filterType);
}