// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

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
  },

  adapter: node({
    mode: 'standalone'
  })
});