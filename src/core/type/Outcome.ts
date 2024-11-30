import type {Maybe} from "src/core/Mod";

export type Outcome<T> = [e: Maybe<unknown>, x: Maybe<T>];