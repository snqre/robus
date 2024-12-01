import * as PathL from "path";

// NOTE: These utilities are safe to use in TypeScript because they internally ensure that
//       the input values are of the `string` type, which prevents runtime errors like
//       `TypeError` when incorrect types are passed. As long as your code is well-typed
//       and follows TypeScript's type system, these functions will not throw unexpected
//       errors related to type mismatches. This makes them suitable for use in well-written
//       TypeScript applications where types are correctly validated during development.

export type {FormatInputPathObject} from "path";
export type {PlatformPath} from "path";
export {basename as base} from "path";
export {extname as extension} from "path";
export {dirname as directory} from "path";
export {join} from "path";
export {format} from "path";
export {isAbsolute} from "path";
export {normalize} from "path";
export {relative} from "path";
export {resolve} from "path";
export {toNamespacedPath} from "path";

export type ParsedPath = PathL.ParsedPath;
export const ParsedPath = PathL.parse;