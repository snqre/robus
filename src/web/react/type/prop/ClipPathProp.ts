import type {BaseProp} from "->web";

export type ClipPathProp =
    | BaseProp
    | "none"
    | `inset(${string})`
    | `circle(${string})`
    | `ellipse(${string})`
    | `polygon(${string})`
    | `path(${string})`
    | "margin-box"
    | "border-box"
    | "padding-box"
    | "content-box"
    | `url(${string})`;