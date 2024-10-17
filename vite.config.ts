import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
	],
	base: '/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util',]
  },
	server: {
		host: '0.0.0.0',
		port: 8080,
    // headers: {
    //   'Cross-Origin-Opener-Policy': 'same-origin',
    //   'Cross-Origin-Embedder-Policy': 'require-corp'
    // },
		proxy: {
			'^/api': {
				target: process.env.NODE_ENV === 'production' ? 'https://blog.lwhzak.workers.dev' : 'http://localhost:8787',
				changeOrigin: true,
				autoRewrite: true,
			}
		}
	}
})
