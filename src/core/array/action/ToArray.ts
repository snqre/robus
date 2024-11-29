export function toArray<T>(item: T): Array<T> {
    if (Array.isArray(item)) return item;
    else return [item];
}