// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// Static site (§4: statik, hızlı, SEO). The lead form's own endpoint
// (/api/lead) is the one server route — kept functional now via the node
// adapter, swapped for the real backend later (PRD §4, form endpoint).
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  site: 'https://rotaai.example', // TODO: gerçek domain
  vite: {
    plugins: [tailwindcss()],
    // Repo lives on a non-APFS external drive where fsevents is unreliable, so
    // Vite can silently serve stale code. Poll for changes instead (same fix as
    // review-console). See memory: review-console-status HMR gotcha.
    server: { watch: { usePolling: true, interval: 300 } },
  },
});
