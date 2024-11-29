import type {Maybe} from "->core";

export type Outcome<T> = [e: Maybe<unknown>, x: Maybe<T>];