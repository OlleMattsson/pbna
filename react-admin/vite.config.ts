import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        watch: {
            usePolling: true,
            interval: 100,       // ms between polls
            disableGlobbing: false
          }        
    },
    base: './',
});
