import { PluginOption } from 'vite';

export const injectGa = (gaId: string): PluginOption => ({
  name: 'custom:ga-tag-inject-transform',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(
      /<\/head>/,
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');</script></head>`,
    );
  },
});
