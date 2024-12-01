import {BuildActionStandardConfig} from "->ts";
import {build} from "src/ts/Mod";

(async () => {
    (await build(BuildActionStandardConfig({
        entry: [
            "src/core/Mod.ts",
            "src/fs/Mod.ts",
            "src/path/Mod.ts",
            "src/server/Mod.ts",
            "src/ts/Mod.ts",
            "src/web/Mod.ts"
        ],
        outDir: "dist",
        format: ["cjs", "esm"],
        dts: true,
        sourcemap: true,
        clean: true,
        config: "tsconfig.json"
    }))).unwrap();
})();