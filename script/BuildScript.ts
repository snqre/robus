import {build} from "->ts";

(async () => {
    await build({
        entry: [
            "src/core/Index.ts",
            "src/server/Index.ts",
            "src/web/Index.ts",
            "src/ts/Index.ts"
        ],
        outDir: "dist",
        format: ["cjs", "esm"],
        dts: true,
        sourcemap: true,
        clean: true,
        config: "tsconfig.json"
    });
})();