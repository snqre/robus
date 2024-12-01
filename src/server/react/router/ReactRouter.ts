import {Router} from "express";
import {Result} from "->core";
import {Ok} from "->core";
import {Err} from "->core";
import {join} from "->path";
import {has} from "->fs";

export type ReactRouterR = Result<ReactRouterT, ReactRouterE>;
export type ReactRouterT = Router;
export type ReactRouterE =
    | "ERR_APP_DIRECTORY_REQUIRED"
    | "ERR_INVALID_REACT_APP_DIRECTORY";
export async function ReactRouter(directory: string): Promise<ReactRouterR> {
    const app0: string = join(directory, "App.tsx");
    const app1: string = join(directory, "App.html");
    if (!has(directory)) return Err("ERR_APP_DIRECTORY_REQUIRED");
    if (!has(app0)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
    if (!has(app1)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
    return Ok(Router().get("/", async (rq, rs) => rs.sendFile(app1)));
}