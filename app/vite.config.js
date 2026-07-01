import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Must match the GitHub Pages repo name exactly (case-sensitive)
  base: '/EscapesTravelCurators.github.io/',

  build: {
    outDir: '../dist',    // output to repo root /dist for gh-pages
    emptyOutDir: true,
  },
});
