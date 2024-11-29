import type {Maybe} from "->core";
import type {Errcode} from "->core";

export function assert(condition: boolean): asserts condition is true;
export function assert<T extends Errcode>(condition: boolean, errcode: T): asserts condition is true;
export function assert<T extends Errcode>(condition: boolean, errcode: T, data: unknown): asserts condition is true;
export function assert<T extends Errcode>(condition: boolean, errcode?: T, data?: unknown): asserts condition is true {
    if (condition) return;
    const e: Error = Error(String(errcode));
    const stack: Maybe<string> = e.stack;
    Error.captureStackTrace(e, assert);
    e.stack = stack;
    e.cause = data;
    e.message = String(errcode ?? "???");
    throw e;
}