import type {Maybe} from "->core";
import type {ExecException} from "child_process";
import {Result} from "->core";
import {Ok} from "->core";
import {Err} from "->core";
import {exec} from "child_process";

export type TranspileReactAppActionR = Result<TranspileReactAppActionT, TranspileReactAppActionE>;
export type TranspileReactAppActionT = void;
export type TranspileReactAppActionE =
    | ExecException;
export async function transpileReactApp(path: string, outdir: string): Promise<TranspileReactAppActionR> {
    let e: Maybe<ExecException> = await new Promise(resolve => exec(`bun build ${path} --outdir ${outdir}`, e => resolve(e)));
    if (e) return Err(e);
    return Ok(undefined);
}