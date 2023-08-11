import { build } from "esbuild";
import { copyFile, rm, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

try {
  await rm("out", { recursive: true });
} catch (ignored) {}

const result = await build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  platform: "node",
  target: ["node20"],
  outfile: "out/bin/main.js",
  minify: true,
  metafile: true,
});

await writeFile("out/metafile.json", JSON.stringify(result.metafile));

await copyFile(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../node_modules/bnf-parser/bnf.json",
  ),
  "out/bnf.json",
);
