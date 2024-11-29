export function none<T, X extends Array<T>>(item: X): boolean;
export function none<T>(item: T): boolean;
export function none<T>(item: T): boolean {
    if (item === undefined) return true;
    if (item === null) return true;
    if (Array.isArray(item)) return item.length === 0;
    return false;
}