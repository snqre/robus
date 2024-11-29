import type {AbsoluteUnit} from "->web";
import type {BaseProp} from "->web";

export type AbsoluteUnitProp = BaseProp | `${number}${AbsoluteUnit}` | number;