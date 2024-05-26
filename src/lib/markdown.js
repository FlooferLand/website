import { getHighlighter, bundledLanguages } from "shiki";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
// import * as remarkA11yEmoji from "@fec/remark-a11y-emoji";
// import { addCopyButton } from "shiki-transformer-copy-button";
import { transformerNotationHighlight } from "@shikijs/transformers"
import remarkImages from "remark-images";
import remarkMentions from "remark-mentions";
import { escapeSvelte } from "mdsvex";
import rehypeSanitize from "rehype-sanitize";

/**
 * @param {string} code
 * @param {string} lang
 * @param {boolean} darkTheme
 * @returns import("mdsvex").HighlighterGeneric
 */
export async function shikiCodeHighlighter(code, lang = "text", darkTheme) {
	const highlighter = await getHighlighter({
		themes: ["dark-plus", "dracula"],
		langs: Object.keys(bundledLanguages)
	});
	const html = escapeSvelte(
		highlighter.codeToHtml(code, {
			lang,
			theme: darkTheme ? "dark-plus" : "light-plus",
			transformers: [
				// addCopyButton(code),
				transformerNotationHighlight({ classActiveLine: "line-highlight" }),
			],
			mergeWhitespaces: "never",
		})
	);
	return html;
}

/**
 * 
 * @param {object} pluginOptions 
 */
const remarkHeaderMagic = (pluginOptions) => {
	/** @param {any} rootNode */
	return function(rootNode) {
		if (!rootNode && !rootNode.children) return;
		const nodes = rootNode.children;
		
		/** @type {Array<String>} */
		const uniqueHeaderIds = [];
		for (let node of nodes) {
			if (!node.children || node.children.length == 0) continue;
			
			// /** @type {{ type: string, value: string }} */
			const headingChild = node.children[0];
			if (node.type == "heading" && headingChild.type == "text") {
				headingChild.value = headingChild.value.trim();
				const headingId = headingChild.value
					.toLowerCase()
					.trim()
					.replaceAll(' ', '-')
					.replaceAll(/[^a-zA-Z-]/g, '');
				if (uniqueHeaderIds.includes(headingId)) {
					console.error(`Heading of name "${headingChild.value}" doesn't have a unique ID (id=${headingId})`);
					continue;
				}
				node["data"] = {
					hProperties: {
						id: headingId,
						class: "markdown-header",
					}
				}
				node.children.unshift({
					type: "link",
					title: null,
					url: `#${headingId}`,
					children: [{ type: "text", value: " " }],
					data: {
						hProperties: {
							class: "header-copy-hash",
							rel: ["nofollow"],
						},
					},
				});
				uniqueHeaderIds.push(headingId);
			}
			// for (let child of node.children) {
			// 	if (node.type == "heading" && child.type == "link") {
			// 		console.log(child);
			// 	}
			// }
		}
	}
}

/**
 * @param {boolean} trustworthy
 * @param {boolean} darkTheme
*/
export const getMdsvexOptions = (trustworthy = false, darkTheme = true) => {
	/** @type {object}} */
	const options = {
		extensions: [".md"],
		highlight: {
			/**
			 * @param {string} code
			 * @param {string} lang
			*/
			highlighter: (code, lang) => shikiCodeHighlighter(code, lang, darkTheme),
			// Language aliases can be set up here!
		},
		layout: {
			_: "./src/mdsvex.svelte"
		},
		remarkPlugins: [
			remarkHeaderMagic,
			remarkUnwrapImages,
			[remarkToc, { tight: true }],
			remarkBreaks,
			remarkGfm,
			// remarkEmbed,
			// remarkA11yEmoji,
			remarkImages,
			[remarkMentions, { usernameLink: (/** @type {any} */ username) => `/wiki/creatures/${username}/` }]
		],
		smartypants: true
	};
	if (!trustworthy) {
		// @ts-ignore
		options["rehypePlugins"] = [
			[rehypeSanitize, { clobberPrefix: "" }]
		];
	}
	return options;
};