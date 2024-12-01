import type {PathLike} from "fs";
import {Err, Result} from "->core";
import {Ok} from "->core";
import * as FileSystem from "fs";
import * as Path from "path";
import * as Fs from "->fs";

// NOTE: This module provides file and directory utilities built on top of the Node.js `fs` module.
//       It includes functions for reading, writing, removing, and copying files, as well as
//       working with directories. All functions return a `Result` type that wraps either a success
//       (`Ok`) or an error (`Err`), making it easier to handle errors in a functional programming style.
//       Additionally, these functions use TypeScript's type system for strong typing and safety.

export type {Dirent} from "fs";
export type {PathLike} from "fs";

export function has(path: PathLike): boolean {
    return FileSystem.existsSync(path);
}


// #region File

export type ReadFileActionR = Result<ReadFileActionT, ReadFileActionE>;
export type ReadFileActionT = Buffer;
export type ReadFileActionE = NodeJS.ErrnoException;
export async function readFile(path: Fs.PathLike): Promise<ReadFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.readFile(path, (e, content) => e ? reject(Err(e)) : resolve(Ok(content))));
}

export type WriteFileActionR = Result<WriteFileActionT, WriteFileActionE>;
export type WriteFileActionT = null;
export type WriteFileActionE = NodeJS.ErrnoException;
export async function writeFile(path: Fs.PathLike, content: NodeJS.ArrayBufferView): Promise<WriteFileActionR>;
export async function writeFile(path: Fs.PathLike, content: string): Promise<WriteFileActionR>;
export async function writeFile(path: Fs.PathLike, content: NodeJS.ArrayBufferView, options: FileSystem.WriteFileOptions): Promise<WriteFileActionR>;
export async function writeFile(path: Fs.PathLike, content: string, options: FileSystem.WriteFileOptions): Promise<WriteFileActionR>;
export async function writeFile(path: Fs.PathLike, content: string | NodeJS.ArrayBufferView, options: FileSystem.WriteFileOptions = {}): Promise<WriteFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.writeFile(path, content, options, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type RemoveFileActionR = Result<RemoveFileActionT, RemoveFileActionE>;
export type RemoveFileActionT = null;
export type RemoveFileActionE = NodeJS.ErrnoException;
export async function removeFile(path: string): Promise<RemoveFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.unlink(path, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type CopyFileActionConfig = {
    from: Fs.PathLike;
    to: Fs.PathLike;
    encoding?: BufferEncoding;
    overwrite?: boolean;
};
export const CopyFileActionConfig = (c: CopyFileActionConfig) => c;
export type CopyFileActionR = Result<CopyFileActionT, CopyFileActionE>;
export type CopyFileActionT = WriteFileActionT;
export type CopyFileActionE = 
    | ReadFileActionE
    | WriteFileActionE;
export async function copyFile(c: CopyFileActionConfig): Promise<CopyFileActionR> {
    if (!c.overwrite && has(c.to)) return Ok(null);
    let content: ReadFileActionR = await readFile(c.from);
    if (content.err) return content;
    return await writeFile(c.to, content.val.toString(c.encoding));
}


// #region Directory

export type MountDirectoryActionConfig = 
    & FileSystem.MakeDirectoryOptions
    & {
    at: Fs.PathLike;
};
export const MountDirectoryActionConfig = (c: MountDirectoryActionConfig) => c;
export type MountDirectoryActionR = Result<MountDirectoryActionT, MountDirectoryActionE>;
export type MountDirectoryActionT = null;
export type MountDirectoryActionE = NodeJS.ErrnoException;
export async function mountDirectory(c: MountDirectoryActionConfig): Promise<MountDirectoryActionR> {
    return await new Promise((resolve, reject) => FileSystem.mkdir(c.at, c, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type ReadDirectoryActionR = Result<ReadDirectoryActionT, ReadDirectoryActionE>;
export type ReadDirectoryActionT = Array<string>;
export type ReadDirectoryActionE = NodeJS.ErrnoException;
export async function readDirectory(path: PathLike): Promise<ReadDirectoryActionR> {
    return await new Promise((resolve, reject) => FileSystem.readdir(path, (e, content) => e ? reject(Err(e)) : resolve(Ok(content))));
}

export type ReadDirectorySyncActionConfig = 
    | BufferEncoding
    | null
    | {
    encoding: BufferEncoding | null; 
    withFileTypes?: false; 
    recursive?: boolean; 
};
export const ReadDirectorySyncActionConfig = (c: ReadDirectorySyncActionConfig) => c;
export type ReadDirectorySyncActionR = Result<ReadDirectorySyncActionT, ReadDirectorySyncActionE>;
export type ReadDirectorySyncActionT = 
    | Array<Fs.Dirent>
    | Array<string>;
export type ReadDirectorySyncActionE = NodeJS.ErrnoException;
export function readDirectorySync(path: string, c: ReadDirectorySyncActionConfig): ReadDirectorySyncActionR {
    return Result.wrap(() => FileSystem.readdirSync(path, c));
}

export type RemoveDirectoryActionConfig =
    & FileSystem.RmDirOptions
    & {
    path: PathLike;
};
export const RemoveDirectoryActionConfig = (c: RemoveDirectoryActionConfig) => c;
export type RemoveDirectoryActionR = Result<RemoveDirectoryActionT, RemoveDirectoryActionE>;
export type RemoveDirectoryActionT = null;
export type RemoveDirectoryActionE = NodeJS.ErrnoException;
export async function removeDirectory(c: RemoveDirectoryActionConfig): Promise<RemoveDirectoryActionR> {
    return await new Promise((resolve, reject) => FileSystem.rmdir(c.path, c, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type CopyDirectoryActionR = Result<CopyDirectoryActionT, CopyDirectoryActionE>;
export type CopyDirectoryActionT = null;
export type CopyDirectoryActionE = 
    | MountDirectoryActionE
    | ReadDirectoryActionE
    | "ERR_SOURCE_DIRECTORY_REQUIRED";
export async function copyDirectory(from: string, to: string): Promise<CopyDirectoryActionR> {
    if (!has(from)) return Err("ERR_SOURCE_DIRECTORY_REQUIRED");
    if (!has(to)) {
        let r: MountDirectoryActionR = (await mountDirectory(MountDirectoryActionConfig({at: to, recursive: true})));
        if (r.err) return r;
    }
    let ents: ReadDirectoryActionR = await readDirectory(from);
    if (ents.err) return ents;
    for (let ent of ents.unwrap()) {
        let path0: string = Path.join(from, ent);
        let path1: string = Path.join(to, ent);
        let r: Result<void,
            | CopyDirectoryActionE
            | CopyFileActionE> 
            = await Result.wrapAsync(async () => {
                let stats = FileSystem.statSync(path0);
                if (stats.isDirectory()) {
                    let recCopyR = await copyDirectory(path0, path1);
                    if (recCopyR?.err) recCopyR.unwrap();
                }
                else if (stats.isFile()) {
                    let copyR = await copyFile(CopyFileActionConfig({from: path0, to: path1, overwrite: true}));
                    if (copyR.err) return copyR.unwrap();
                }
                return;
            });
        if (r.err) return r;
    }
    return Ok(null);
}