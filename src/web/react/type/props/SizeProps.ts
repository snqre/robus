import type {SizeUnitProp} from "src/web/Mod";
import type {CssProps} from "src/web/Mod";

export type SizeProps = {
    width?: SizeUnitProp;
    height?: SizeUnitProp;
    aspectRatio?: CssProps["aspectRatio"];
};