import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";
import { postsPath } from "./src/lib/config";
import { enhancedImages } from "@sveltejs/enhanced-img";

// Asset locations
const rootFolder = __dirname
const assetsFolder = path.resolve(rootFolder)
const postsFolder = path.resolve(rootFolder, postsPath);
//const libFolder = path.resolve(rootFolder, "./src/lib")

// Config
export default defineConfig({
	plugins: [
		sveltekit(),
		enhancedImages(),
	],
	resolve: {
		alias: {
			"$assets": assetsFolder,
			"@posts": postsFolder,
		}
	},
	assetsInclude: [
		"**/*.yml"
	],
	server: {
		fs: {
			allow: [
				assetsFolder
			]
		}
	},
	build: {
		minify: false,
		cssMinify: false,
	}
	// test: {
	// 	include: ["src/**/*.{test,spec}.{js,ts}"]
	// }
});
