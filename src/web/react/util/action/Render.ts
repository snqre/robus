import type {Maybe} from "src/core/Mod";
import type {Component} from "src/web/Mod";
import {Result} from "src/core/Mod";
import {Ok} from "src/core/Mod";
import {Err} from "src/core/Mod";
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