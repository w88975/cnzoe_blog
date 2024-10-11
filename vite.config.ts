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
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		host: '0.0.0.0',
		proxy: {
			'^/api': {
				target: process.env.NODE_ENV === 'production' ? 'https://blog.lwhzak.workers.dev' : 'http://localhost:8787',
				changeOrigin: true,
				autoRewrite: true,
			}
		}
	}
})
