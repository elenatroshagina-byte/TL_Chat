import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { NodePackageImporter } from "sass-embedded";

const githubPagesAssets = () => ({
  name: "github-pages-assets",
  generateBundle(_options, bundle) {
    const fontFacePattern = /@font-face\s*\{[^{}]*\}/g;
    const requiredFamilies = new Set([
      "REACTOR Open Sans",
      "REACTOR Roboto Condensed",
      "REACTOR Noto Sans",
      "REACTOR Default Icon",
      "REACTOR Global Icon",
    ]);
    const removedFontFiles = new Set();
    const retainedFontFiles = new Set();

    for (const asset of Object.values(bundle)) {
      if (asset.type !== "asset" || !asset.fileName.endsWith(".css")) continue;

      const css = String(asset.source);
      asset.source = css.replace(fontFacePattern, block => {
        const family = (block.match(/font-family:\s*([^;]+)/)?.[1] ?? "").replaceAll(/["']/g, "").trim();
        const fileName = block.match(/url\((?:["']?)(?:\.\/)?([^)"']+\.(?:woff2|ttf))/)?.[1];
        const isIcon = family.includes("Icon");
        const isRequiredTextFamily = requiredFamilies.has(family);
        const isRequiredAlphabet = fileName?.includes("cyrillic") || fileName?.includes("latin");
        const retain = isIcon || (isRequiredTextFamily && isRequiredAlphabet);

        if (fileName) (retain ? retainedFontFiles : removedFontFiles).add(fileName);
        return retain ? block : "";
      });
    }

    for (const [fileName] of Object.entries(bundle)) {
      const baseName = fileName.split("/").pop();
      if (baseName && removedFontFiles.has(baseName) && !retainedFontFiles.has(baseName)) {
        delete bundle[fileName];
      }
    }
  },
});

export default defineConfig({
  // Relative asset URLs let the same build run from any GitHub Pages
  // repository subpath without hardcoding the repository name.
  base: "./",
  plugins: [react(), githubPagesAssets()],
  optimizeDeps: {
    exclude: [
      "@reactor/reactor",
      "@reactor/table",
      "@reactor/core",
      "@reactor/browser",
      "@reactor/hooks",
      "@reactor/intl",
      "@reactor/style",
      "@reactor/theme",
      "@reactor/windows"
    ]
  },
  resolve: {
    alias: {
      "@REACTOR_ICONS": resolve("node_modules/@reactor/style/src/assets/figma")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        importers: [new NodePackageImporter()]
      }
    }
  }
});
