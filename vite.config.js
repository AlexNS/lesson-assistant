import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 3000 } = process.env;

function MoveManifestPlugin(desiredManifestPath) {
  let outDir, manifest;

  const defaultManifestPath = ".vite/manifest.json";

  return {
    name: "move-manifest",
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir;

      const resolvedManifest = resolvedConfig.build.manifest;
      if (resolvedManifest) {
        manifest =
          typeof resolvedManifest === "string"
            ? resolvedManifest
            : defaultManifestPath;
      } else {
        manifest = false;
      }
    },
    async writeBundle(_options, _bundle) {
      if (manifest === false) return;

      await fs.rename(
        path.resolve(__dirname, outDir, manifest),
        desiredManifestPath
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/p': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: 'manifest.json',
    rollupOptions: {
      input: {
        'frontend-admin': path.resolve(__dirname, 'frontend-admin.html'),
      },
    },
    assetsDir: '.',
    outDir: path.resolve(__dirname, 'public'),
  },
  experimental: {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      console.log(filename);
      return `/a/${filename}`;
    }
  },
  plugins: [react(), MoveManifestPlugin("./src/server/config/manifest.json")],
  preview: {
    appType: 'mpa',
    open: 'http://localhost:4173/src/frontend/admin/index.html'
  },
  publicDir: path.resolve(__dirname, 'src/static'),
})
