import { build } from "esbuild";
import { join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const isWatchMode = process.argv.includes("--watch");

// Only build the nav-states.js file, which imports ResumeApplicationToast.js
const entryPoint = join(__dirname, "src", "nav-states.js");
const outFile = join(__dirname, "dist", "nav-states.js");

// Helper function to format file size
const formatSize = (bytes) => {
  const units = ["B", "KB", "MB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Helper function to get timestamp
const getTimestamp = () => {
  return new Date().toLocaleTimeString();
};

// Build configuration - always use production settings
const buildOptions = {
  entryPoints: [entryPoint],
  bundle: true,
  minify: true, // Always minify
  format: "esm",
  target: ["es2020"],
  outfile: outFile,
  sourcemap: true,
  metafile: true,
  define: {
    "process.env.NODE_ENV": '"production"', // Always set NODE_ENV to production
  },
};

const buildWithStats = async (options) => {
  console.log(`🔧 Building for production...`);
  const originalSize = fs.existsSync(entryPoint) ? fs.statSync(entryPoint).size : 0;
  console.log(`📊 Original size: ${formatSize(originalSize)}`);

  const result = await build(options);
  const buildSize = fs.existsSync(outFile) ? fs.statSync(outFile).size : 0;
  const reduction = (((originalSize - buildSize) / originalSize) * 100).toFixed(2);

  console.log(`🟢 [${getTimestamp()}] Build succeeded`);
  console.log(`📦 Bundle size: ${formatSize(buildSize)} (${reduction}% reduction)`);
  return result;
};

if (isWatchMode) {
  // Watch mode with explicit configuration
  const context = await build({
    ...buildOptions,
    watch: {
      onRebuild(error, result) {
        if (error) {
          console.error(`❌ [${getTimestamp()}] Watch build failed:`, error);
        } else {
          buildWithStats(buildOptions);
        }
      },
      pattern: ["src/**/*.js"], // Watch all JS files in src directory
    },
  });

  console.log(`👀 Watching for changes in src directory...`);
} else {
  // One-time build
  try {
    await buildWithStats(buildOptions);
  } catch (error) {
    console.error(`❌ [${getTimestamp()}] Build failed:`, error);
    process.exit(1);
  }
}
