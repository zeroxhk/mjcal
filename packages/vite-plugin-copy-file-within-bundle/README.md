# vite-plugin-copy-file-within-bundle

This plugin allow copying files within bundle.

## Examples

```ts
import { defineConfig } from 'vite';
import { copyFileWithinBundle } from './vite-plugins/copyFileWithinBundle';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [copyFileWithinBundle('index.html', '404.html')],
});
```
