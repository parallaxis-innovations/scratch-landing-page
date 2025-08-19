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
    },
    plugins: [
      {
        name: 'well-known-json-content-type',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (
              req.url === '/.well-known/apple-app-site-association' ||
              req.url === '/.well-known/assetlinks.json'
            ) {
              res.setHeader('Content-Type', 'application/json');
            }
            next();
          });
        }
      }
    ]
  },

  adapter: node({
    mode: 'standalone'
  })
});