import type {BuildActionE} from "->ts";
import type {BuildActionR} from "->ts";
import {Router} from "express";
import {Result} from "->core";
import {Ok} from "->core";
import {Err} from "->core";
import {build} from "->ts";
import {existsSync} from "fs";
import {join} from "path";

/**
 * How the directory should be structured
 * 
 * -> web
 *   -> public NOTE This directory will be copied to the distributable as
 *                  well as all content within it.
 *   App.tsx   NOTE This will be transpiled in the distributable into .js
 *                  so make sure to link the App.html to this.
 *   App.html NOTE This will be copied in the distributable.
 * 
 */

export type ReactRouterR = Result<ReactRouterT, ReactRouterE>;
export type ReactRouterT = Router;
export type ReactRouterE =
    | BuildActionE
    | "ERR_OUTDIR_REQUIRED"
    | "ERR_TSX_REQUIRED"
    | "ERR_HTML_REQUIRED";
export async function ReactRouter(directory: string, config: string): Promise<ReactRouterR> {
    const tsx: string = join(directory, "App.tsx");
    const html: string = join(directory, "App.html");
    if (!existsSync(directory)) return Err("ERR_OUTDIR_REQUIRED");
    if (!existsSync(tsx)) return Err("ERR_TSX_REQUIRED");
    if (!existsSync(html)) return Err("ERR_HTML_REQUIRED");
    let result: BuildActionR = await build({
        entry: [tsx],
        outDir: directory,
        format: ["esm"],
        target: "esnext",
        sourcemap: true,
        config: config
    });
    if (result.err) return result;
    return Ok(Router().get("/", async (rq, rs) => rs.sendFile(html)));
}