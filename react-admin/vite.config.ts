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
          },
          /*
        hmr: {
            protocol: 'wss', // or 'ws' if you're not using HTTPS internally
            host: 'localhost',
            port: 443, // because it's running behind https://localhost
            //path: '/hmr', // ✅ must match nginx WS proxy path
        },  
        */                
    },
    base: './',
});
