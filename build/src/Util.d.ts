declare type Constructor<T> = new (...args: any[]) => T;
export declare function assertArrayType<T, U extends T>(array: T[], filterType: Constructor<U>): boolean;
export {};
