import type {PathLike} from "fs";
import {Err, Result} from "->core";
import {Ok} from "->core";
import {None} from "->core";
import * as FileSystem from "fs";
import * as Path from "path";

export function has(path: PathLike): boolean {
    return FileSystem.existsSync(path);
}

export type MkDirActionR = Result<MkDirActionT, MkDirActionE>;
export type MkDirActionT = null;
export type MkDirActionE = NodeJS.ErrnoException;
export async function mkdir(path: string, options: FileSystem.MakeDirectoryOptions = {}): Promise<MkDirActionR> {
    return await new Promise((resolve, reject) => FileSystem.mkdir(path, options, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type ReadFileActionR = Result<ReadFileActionT, ReadFileActionE>;
export type ReadFileActionT = Buffer;
export type ReadFileActionE = NodeJS.ErrnoException;
export async function readFile(path: string): Promise<ReadFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.readFile(path, (e, content) => e ? reject(Err(e)) : resolve(Ok(content))));
}

export type WriteFileActionR = Result<WriteFileActionT, WriteFileActionE>;
export type WriteFileActionT = null;
export type WriteFileActionE = NodeJS.ErrnoException;
export async function writeFile(path: string, content: NodeJS.ArrayBufferView): Promise<WriteFileActionR>;
export async function writeFile(path: string, content: string): Promise<WriteFileActionR>;
export async function writeFile(path: string, content: NodeJS.ArrayBufferView, options: FileSystem.WriteFileOptions): Promise<WriteFileActionR>;
export async function writeFile(path: string, content: string, options: FileSystem.WriteFileOptions): Promise<WriteFileActionR>;
export async function writeFile(path: string, content: string | NodeJS.ArrayBufferView, options: FileSystem.WriteFileOptions = {}): Promise<WriteFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.writeFile(path, content, options, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type UnlinkFileActionR = Result<UnlinkFileActionT, UnlinkFileActionE>;
export type UnlinkFileActionT = null;
export type UnlinkFileActionE = NodeJS.ErrnoException;
export async function unlinkFile(path: string): Promise<UnlinkFileActionR> {
    return await new Promise((resolve, reject) => FileSystem.unlink(path, e => e ? reject(Err(e)) : resolve(Ok(null))));
}

export type RmDirActionR = Result<RmDirActionT, RmDirActionE>;
export type RmDirActionT = null;
export type RmDirActionE = NodeJS.ErrnoException;
export async function rmdir(path: string, opt: FileSystem.RmDirOptions = {}): Promise<RmDirActionR> {
    return await new Promise((resolve, reject) => FileSystem.rmdir(path, opt, e => e ? reject(Err(e)) : resolve(Ok(null))));
}



export type CopyActionR = Result<CopyActionT, CopyActionE>;
export type CopyActionT = void;
export type CopyActionE = unknown;
export async function copy(path: string, destination: string) {
    let stat: FileSystem.Stats = await FileSystem.promises.stat(path);
    if (stat.isDirectory()) {

    }
}


export async function copyFile(path: string, to: string, encoding: string, overwrite: boolean) {
    if (!overwrite && has(path)) return Ok(null);
    let content: ReadFileActionR = await readFile(path);
    if (content.err) return content;
    writeFile(to, )
}