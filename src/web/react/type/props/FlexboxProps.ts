import * as Web from "src/web/Mod";

export type FlexboxProps =
    & Web.SizeProps
    & Web.SizeShorthandProps
    & Web.SizeClampProps
    & Web.SizeClampShorthandProps
    & Omit<Web.SpacingProps,
        | "marginTrim">
    & Web.SpacingShorthandProps
    & Pick<Web.JusifyProps, 
        | "justifyContent">
    & Pick<Web.AlignmentProps,
        | "alignContent"
        | "alignItems"
        | "alignSelf">
    & Web.FlexProps
    & Web.ParentProps
    & {};