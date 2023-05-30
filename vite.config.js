import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/scss/app.scss",
                "resources/js/app.js",
                //"resources/js/auth.js",
                //"resources/js/dashboard.js",
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            //"@modules": "/resources/js/app/modules",
            //"@libs": "/resources/js/app/libs",
            "@nodeJS": "/node_modules"
        },
    },
});
