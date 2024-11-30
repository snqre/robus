import type {RelativeUnit} from "src/web/Mod";
import type {BaseProp} from "src/web/Mod";

export type RelativeUnitProp = BaseProp | `${number}${RelativeUnit}`;