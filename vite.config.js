import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
        react()
    ],
    server: {
        proxy: {
          '/sanctum': 'http://127.0.0.1:8000',
          '/login': 'http://127.0.0.1:8000',
          '/logout': 'http://127.0.0.1:8000',
          '/register': 'http://127.0.0.1:8000',
          '/api': 'http://127.0.0.1:8000',
        },
    },
});
