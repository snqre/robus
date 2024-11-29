export type Function<T, X> = 
    | ((args: T) => Promise<X>)
    | ((args: T) => X);