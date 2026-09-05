import {defineConfig} from 'astro/config';
import {loadEnv} from 'vite';
import sitemap from '@astrojs/sitemap';
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL;
if (!site) throw new Error('Set PUBLIC_SITE_URL in .env');
export default defineConfig({
  site, trailingSlash: 'never', output: 'static',
  integrations: [sitemap({filter: page => !new URL(page).pathname.startsWith('/404'), namespaces: {news: false, xhtml: false, image: false, video: false}})],
});
