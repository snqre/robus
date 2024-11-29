import type {AbsoluteUnit} from "->web";
import type {AngleUnit} from "->web";
import type {FrequencyUnit} from "->web";
import type {RelativeUnit} from "->web";
import type {ResolutionUnit} from "->web";
import type {TimeUnit} from "->web";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;