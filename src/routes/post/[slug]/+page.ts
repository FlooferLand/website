import type { Post } from "$lib/types.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}/post.md`);
		return {
			content: post.default,
			meta: post.metadata as Post
		};
	} catch (e) {
		throw error(404, `Could not find slug "${params.slug}"`);
	}
}
