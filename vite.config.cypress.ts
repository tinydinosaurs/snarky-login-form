import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
	plugins: [
		tailwindcss(),
		tsconfigPaths(),
		istanbul({
			cypress: true,
			requireEnv: false,
		}),
		// DO NOT include reactRouter() here!
	],
});
