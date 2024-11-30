import type {SizeUnit} from "src/web/Mod";
import type {BaseProp} from "src/web/Mod";

export type SizeUnitProp = BaseProp | `${number}${SizeUnit}` | number;