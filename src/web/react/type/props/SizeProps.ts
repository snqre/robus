import type {SizeUnitProp} from "->web";
import type {CssProps} from "->web";

export type SizeProps = {
    width?: SizeUnitProp;
    height?: SizeUnitProp;
    aspectRatio?: CssProps["aspectRatio"];
};