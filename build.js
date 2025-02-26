import { build } from "esbuild";
import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const isWatchMode = process.argv.includes("--watch");

// Get all JavaScript files from src directory
const srcDir = join(__dirname, "src");
const entryPoints = readdirSync(srcDir)
  .filter((file) => file.endsWith(".js"))
  .map((file) => join(srcDir, file));

// Build configuration
const buildOptions = {
  entryPoints,
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2020"],
  outdir: "dist",
  sourcemap: true,
};

if (isWatchMode) {
  // Watch mode
  const context = await build({
    ...buildOptions,
    watch: {
      onRebuild(error, result) {
        if (error) {
          console.error("Watch build failed:", error);
        } else {
          console.log("Watch build succeeded:", result);
        }
      },
    },
  });
  console.log("Watching for changes...");
} else {
  // One-time build
  try {
    await build(buildOptions);
    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}
