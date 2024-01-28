import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import { getHighlighter, bundledLanguages } from "shiki";

async function highlighter(code, lang = "text") {
	const highlighter = await getHighlighter({
		themes: ["dark-plus"],
		langs: Object.keys(bundledLanguages)
	});
	const html = escapeSvelte(
		highlighter.codeToHtml(code, {
			lang,
			theme: "dark-plus"
		})
	);
	return `{@html \`${html}\`}`;
}

/** @type {import("mdsvex").mdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: highlighter
	},
	layout: {
		_: "./src/mdsvex.svelte"
	}
};

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: [".svelte", ".md"],

	kit: {
		adapter: adapter()
	}
};

export default config;
