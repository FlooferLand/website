import { postsPath } from "$lib/config.js";
import { getPost } from "$lib/posts.js";
import { compile } from "mdsvex";
import fs from "fs";
import { getMdsvexOptions } from "$lib/markdown.js";
import { userTheme } from "$lib/stores/theme.js";

export async function load({ params }) {
    if (params.slug.startsWith('_')) return;
    const file: string = fs.readFileSync(`${postsPath}/${params.slug}/index.md`, { encoding: "utf-8" });
    const compilation = await compile(file, getMdsvexOptions(true, userTheme == "dark"));
    let html;
    if (compilation) {
        html = compilation.code;
    } else {
        html = /*html*/ `<h3 style="red">Server-side compilation failed for this post!</h3>`;
    }

    return {
        slug: params.slug,
        post: getPost(params.slug),
        htmlContent: html
    };
}
