import type {AbsoluteUnit} from "src/web/Mod";
import type {AngleUnit} from "src/web/Mod";
import type {FrequencyUnit} from "src/web/Mod";
import type {RelativeUnit} from "src/web/Mod";
import type {ResolutionUnit} from "src/web/Mod";
import type {TimeUnit} from "src/web/Mod";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;