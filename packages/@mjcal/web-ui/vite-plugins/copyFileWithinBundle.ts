import { PluginOption } from 'vite';

export const copyFileWithinBundle = (from: string, to: string): PluginOption => {
  return {
    name: 'custom:copy-file-within-bundle',
    enforce: 'post',
    async generateBundle(_options, bundle) {
      const asset = bundle[from];

      if (!asset) return;
      if (asset.type !== 'asset') throw new Error(`${asset}`);

      this.emitFile({
        type: 'asset',
        fileName: to,
        source: asset.source,
      });
    },
  };
};
