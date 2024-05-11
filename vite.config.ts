import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";
import { postsPath } from '$lib/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"##posts": path.resolve(__dirname, postsPath)
		}
	},
	assetsInclude: [
		// "**/*.yml"
	]
	// test: {
	// 	include: ["src/**/*.{test,spec}.{js,ts}"]
	// }
});
