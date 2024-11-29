export type Closure<T extends unknown[], X> =
    | ((... args: T) => Promise<X>)
    | ((... args: T) => X);