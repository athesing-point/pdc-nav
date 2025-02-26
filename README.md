# Point.com Navigation Animations & Management

PDC Navigation
This repo is for our new navigation component on PDC. We are offloading logic from native webflow interactions to custom JS solution for more control over states across different nav variants.

## Build Setup

This project uses [Bun](https://bun.sh/) as the JavaScript runtime and build tool.

### Prerequisites

- Install Bun: `curl -fsSL https://bun.sh/install | bash`

### Project Setup

1. Clone the repository
2. Install dependencies: `bun install`

### Build Commands

- Development mode with watch: `bun run dev`
- Production build: `bun run build`

### Build Configuration

The build process is configured in `build.js` using esbuild:

- Entry point: `src/nav-states.js`
- Output: `dist/` directory
- Format: ESM (ECMAScript modules)
- Target: ES2020
- Includes minification

### Customizing the Build

To modify the build configuration:

1. Edit the `buildOptions` object in `build.js`
2. Add or modify scripts in `package.json` as needed
