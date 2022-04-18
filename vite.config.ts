import { defineConfig } from "vite";

export default defineConfig({
  
  build: {
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
      name: 'vutils'
    }
  }

})