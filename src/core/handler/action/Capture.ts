import type {Function} from "->core";
import type {Outcome} from "->core";

export async function capture<T>(action: Function<void, T>): Promise<Outcome<T>> {
    try {
        return [null, await action()];
    }
    catch (e) {
        return [e, null];
    }
}