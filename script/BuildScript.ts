import {build} from "src/ts/Mod";

(async () => {
    (await build({
        entry: [
            "src/core/Mod.ts",
            "src/server/Mod.ts",
            "src/web/Mod.ts",
            "src/ts/Mod.ts"
        ],
        outDir: "dist",
        format: ["cjs", "esm"],
        dts: true,
        sourcemap: true,
        clean: true,
        config: "tsconfig.json"
    })).unwrap();
})();