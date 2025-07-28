import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: ['charmshospitality.com', 'www.charmshospitality.com']
  }
});
