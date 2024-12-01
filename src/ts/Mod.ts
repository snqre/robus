import type {MountDirectoryActionE} from "->fs";
import type {CopyFileActionR} from "->fs";
import type {CopyDirectoryActionR} from "->fs";
import type {CopyDirectoryActionE} from "->fs";
import {Result} from "->core";
import {Err} from "->core";
import {Ok} from "->core";
import {MountDirectoryActionConfig} from "->fs";
import {CopyFileActionConfig} from "->fs";
import {join} from "->path";
import {has} from "->fs";
import {mountDirectory} from "->fs";
import {copyFile} from "->fs";
import {copyDirectory} from "->fs";
import * as Tsup from "tsup";

export type BuildActionConfig =
    | BuildActionStandardConfig
    | ReactAppConfig;
export type BuildActionStandardConfig =
    & Tsup.Options
    & {
    type: "standard";
};
export const BuildActionStandardConfig = (c: Omit<BuildActionStandardConfig, "type">): BuildActionStandardConfig => ({type: "standard", ... c});
export type ReactAppConfig = {
    type: "react";
    directory: string;
    outDir: string;
    config?: string;
};
export const BuildActionReactAppConfig = (c: Omit<ReactAppConfig, "type">): ReactAppConfig => ({type: "react", ... c});
export type BuildActionR = Result<BuildActionT, BuildActionE>;
export type BuildActionT = void;
export type BuildActionE = 
    | MountDirectoryActionE
    | CopyDirectoryActionE
    | "ERR_INVALID_REACT_APP_DIRECTORY"
    | "ERR_UNSUPPORTED_CONFIG";

/**
 * **REACT APP CONFIGURATION**
 * 
 * This configuration is designed to build and package a React app as a distributable client. 
 * The app will be transpiled and packaged in a way that allows it to run as a client-side 
 * application, which can either be distributed separately or embedded into a server's 
 * distributable bundle.
 * 
 * ## Directory Structure:
 * The directory structure should follow this pattern:
 * 
 * ```
 *    (dir) public      (Optional) Contains static assets like CSS, images, etc. This folder 
 *                                 will be copied to the distributable.
 *    App.tsx         The main React entry file. It will be transpiled into JavaScript.
 *    App.html        The HTML template file for the app.
 * ```
 * 
 * **Public Folder**: The contents of the `public` folder will be copied to the final 
 * distributable, including CSS files, images, and any other assets required for the app.
 * 
 * **React App Build**: The `App.tsx` file will be transpiled into JavaScript and 
 * the `App.html` file will be copied into the output directory. The server, if used, 
 * can then serve the React app's static files from the `public` directory.
 * 
 * **Server and Client Separation**: The server and client can be packaged and 
 * distributed separately, but they can still share the same public directory to 
 * access static assets.
 * 
 * ## Config Types:
 * - `BuildActionStandardConfig`: A generic configuration for building any project with `tsup`.
 * - `BuildActionReactAppConfig`: A configuration specifically for building a React app.
 * 
 * ## Example:
 * ```typescript
 * build(BuildActionReactAppConfig({
 *  directory: "./src",
 *  outDir: "./dist",
 *  config: "tsconfig.json"
 * }));
 * ```
 * 
 * ## Error Handling:
 * - `"ERR_INVALID_REACT_APP_DIRECTORY"`: Indicates that the provided React app directory is invalid or missing required files.
 * - `"ERR_UNSUPPORTED_CONFIG"`: Indicates an unsupported configuration type.
 * 
 */

export async function build(c: BuildActionConfig): Promise<BuildActionR> {
    if (c.type === "standard") return await Result.wrapAsync(async () => await Tsup.build(c));
    if (c.type === "react") {
        let app0: string = join(c.directory, "App.tsx");
        let app1: string = join(c.directory, "App.html");
        let pub: string = join(c.directory, "public");
        if (!has(app0)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
        if (!has(app1)) return Err("ERR_INVALID_REACT_APP_DIRECTORY");
        let mountDirectoryR = await mountDirectory(MountDirectoryActionConfig({at: c.outDir, recursive: true}));
        if (mountDirectoryR.err) return mountDirectoryR;
        let buildActionR: BuildActionR = await build({
            type: "standard",
            entry: [app0],
            outDir: c.outDir,
            format: "esm",
            target: "esnext",
            sourcemap: true,
            config: c.config
        });
        if (buildActionR.err) return buildActionR;
        let copyFileR: CopyFileActionR = await copyFile(CopyFileActionConfig({from: app1, to: join(c.outDir, "App.html")}));
        if (copyFileR.err) return copyFileR;
        let copyDirectoryR: CopyDirectoryActionR = await copyDirectory(pub, c.outDir);
        if (copyDirectoryR.err) return copyDirectoryR;
        return Ok(undefined);
    }
    return Err("ERR_UNSUPPORTED_CONFIG");
}