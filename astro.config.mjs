// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    host: true
  },
  output: 'static',
  site: 'https://charmshospitality.com',
  vite: {
    preview: {
      allowedHosts: ['charmshospitality.com', 'www.charmshospitality.com']
    }
  }
});
