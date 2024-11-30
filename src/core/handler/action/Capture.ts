import type {Function} from "src/core/Mod";
import type {Outcome} from "src/core/Mod";

export async function capture<T>(action: Function<void, T>): Promise<Outcome<T>> {
    try {
        return [null, await action()];
    }
    catch (e) {
        return [e, null];
    }
}