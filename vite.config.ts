import { defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";
import path from "path";

function root(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

export default defineConfig({
  root: "src",
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
  },
  plugins: [
    webExtension({
      manifest: "manifest.json",
      watchFilePaths: [root("src/manifest.json")],
    }),
  ],
});
