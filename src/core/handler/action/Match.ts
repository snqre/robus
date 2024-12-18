import type {Function} from "src/core/Mod";
import type {MaybeAsync} from "src/core/Mod";
import type {Maybe} from "src/core/Mod";

export function match<T, X>(e: unknown, errcode: T | Array<T>, action: Function<unknown, X>): MaybeAsync<Maybe<X>> {
    if (!("cause" in (e as any)
        && "message" in (e as any)
        && "name" in (e as any)
        && "stack" in (e as any)
        && typeof (e as any).message === "string"
        && typeof (e as any).name === "string"
        && Array.isArray(errcode) ? errcode.includes((e as any).message) : errcode === (e as any).message
    )) return;
    return new Promise(async resolve => resolve((await action((e as any).cause))));
}