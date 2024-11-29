import type {TranspileReactAppActionE} from "->server";
import type {TranspileReactAppActionR} from "->server";
import {Router} from "express";
import {Result} from "->core";
import {Ok} from "->core";
import {Err} from "->core";
import {transpileReactApp} from "->server";
import {existsSync} from "fs";
import {join} from "path";

export type ReactRouterR = Result<ReactRouterT, ReactRouterE>;
export type ReactRouterT = Router;
export type ReactRouterE =
    | TranspileReactAppActionE
    | "ERR_OUTDIR_REQUIRED"
    | "ERR_TSX_REQUIRED"
    | "ERR_HTML_REQUIRED";
export async function ReactRouter(directory: string): Promise<ReactRouterR> {
    const tsx: string = join(directory, "App.tsx");
    const html: string = join(directory, "App.html");
    if (!existsSync(directory)) return Err("ERR_OUTDIR_REQUIRED");
    if (!existsSync(tsx)) return Err("ERR_TSX_REQUIRED");
    if (!existsSync(html)) return Err("ERR_HTML_REQUIRED");
    let result: TranspileReactAppActionR = await transpileReactApp(tsx, directory);
    if (result.err) return result;
    return Ok(Router().get("/", async (rq, rs) => rs.sendFile(html)));
}