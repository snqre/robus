import type {Dirent} from "fs";
import {Result} from "->core";
import {Err} from "->core";
import {join} from "path";
import {existsSync} from "fs";
import {mkdirSync} from "fs";
import {copyFileSync} from "fs";
import {readdirSync} from "fs";
import * as Tsup from "tsup";

/**
 * REACT APP CONFIG
 * Will compile a directory and package it as a distributable client.
 * To adhear to the standards the src directory should have an App.tsx
 * and App.html files respectively, a public folder if any which will contain
 * any css, images, or anything the client requires when launching it.
 * 
 * If a server is used, the distributable can be packaged inside the server's
 * distributable, and the server will be able to access the client's public directory.
 * 
 * This means the server and the client are both compiled seperately and can
 * both be distributed separately.
 * 
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

export type Config =
    | StandardConfig
    | ReactAppConfig;
export type StandardConfig =
    & Tsup.Options
    & {
    type: "standard";
};
export type ReactAppConfig = {
    type: "react";
    directory: string;
    outDir: string;
    config?: string;
};
export type BuildActionR = Result<BuildActionT, BuildActionE>;
export type BuildActionT = void;
export type BuildActionE = unknown;
export async function build(config: Config): Promise<BuildActionR> {
    if (config.type === "standard") return await Result.wrapAsync(async () => await Tsup.build(config));
    if (config.type === "react") {
        let app0: string = join(config.directory, "app.tsx");
        let app1: string = join(config.directory, "app.html");
        let pub: string = join(config.directory, "public");
        if (!existsSync(app0)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
        if (!existsSync(app1)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
        let result: BuildActionR = await build({
            type: "standard",
            entry: [app0],
            outDir: config.outDir,
            format: "esm",
            target: "esnext",
            sourcemap: true,
            config: config.config
        });
        if (result.err) return result;
        mkdirSync(config.outDir, {recursive: true});
        copyFileSync(app1, join(config.outDir, "app.html"));
        if (existsSync(pub)) {

        }
    }
    return Err("ERR_UNSUPPORTED_CONFIG");
}

function _copy(dir: string, dest: string) {
    let items: Result<Dirent[], unknown> = Result.wrap(() => readdirSync(dir, {withFileTypes: true}));
    if (items.err) return items;
    mkdirSync(dest, {recursive: true});
    for (let i)

    for (let item in items.unwrap()) {
        let path: string = join(dir, item.name)
    }
}