import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgicon from 'vite-plugin-svgicon'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        svgicon({
            include: ['*/icons/svg/*.svg']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'path': 'path-browserify',
        }
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    server: {
        proxy: {
            ...['/api', '/static', '/auth'].reduce(
                (acc, ctx) => ({
                    ...acc,
                    [ctx]: {
                        target: 'http://127.0.0.1:8000',
                        changeOrigin: true
                    },
                }),
                {}
            ),
        }
    },
})
