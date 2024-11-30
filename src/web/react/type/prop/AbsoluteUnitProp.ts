import type {AbsoluteUnit} from "src/web/Mod";
import type {BaseProp} from "src/web/Mod";

export type AbsoluteUnitProp = BaseProp | `${number}${AbsoluteUnit}` | number;