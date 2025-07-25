import { defineConfig } from 'cypress';
import viteConfig from './vite.config.cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
			viteConfig,
		},
		setupNodeEvents(on, config) {
			codeCoverageTask(on, config);
			return config;
		},
	},
});
