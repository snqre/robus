import type {SizeUnit} from "->web";
import type {BaseProp} from "->web";

export type SizeUnitProp = BaseProp | `${number}${SizeUnit}` | number;