import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { getMdsvexOptions } from "./src/lib/markdown.js";

/** @type import("@sveltejs/kit").Config */
const config = {
	preprocess: [vitePreprocess(), mdsvex(getMdsvexOptions(true))],
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter(),
		files: {
			assets: "assets"
		}
	}
};

export default config;