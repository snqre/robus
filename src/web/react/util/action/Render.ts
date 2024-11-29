import type {Maybe} from "->core";
import type {Component} from "->web";
import {Result} from "->core";
import {Ok} from "->core";
import {Err} from "->core";
import {createRoot as Root} from "react-dom/client";

export type RenderActionR = Result<RenderActionT, RenderActionE>;
export type RenderActionT = void;
export type RenderActionE =
    | "ERR_RENDER_TARGET_REQUIRED";
export function render(app: Component): RenderActionR {
    let element: Maybe<HTMLElement> = document.getElementById("root");
    if (element) return Ok(Root(element).render(app));
    return Err("ERR_RENDER_TARGET_REQUIRED");
}