import * as config from "$lib/config";
import type { Post } from "$lib/types";
import { formatDate } from "$lib/utils";
import { getPosts } from "$lib/posts";

export async function rssGet(hostUrl: string, slug: string | undefined) : Promise<Response> {
	const allPosts: Post[] = getPosts();

	// Formatting the posts
	let rssPosts: string = "";
	allPosts.forEach((post) => {
		if (slug == undefined || post.metadata.category.toLowerCase() == slug.toLowerCase()) {
			rssPosts += makePost(post, hostUrl) + '\n';
		}
	});

	// Formatting everything
	const title = config.title + (slug ? `@ ${slug}` : "");
	const description = config.desc + (slug ? `(${slug} category)` : "");
	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${title}</title>
				<description>${description}</description>
				<link>${hostUrl}</link>
				<atom:link href="${hostUrl}/rss.xml" rel="self" type="application/rss+xml"/>
				<language>en-us</language>
				<generator>Svelte server</generator>
				${rssPosts}
			</channel>
		</rss>
	`.trim();

	const headers = { "Content-Type": "application/xml" };
	return new Response(xml, { headers });
}

const makePost = (post: Post, hostUrl: string) =>
	`
		<item>
			<title>${post.metadata.title}</title>
			<description>${post.metadata.desc}</description>
			<link>${hostUrl}/${post.slug}</link>
			<guid isPermaLink="true">${config.getPostUrl({ hostUrl, slug: post.slug })}</guid>
			<pubDate>${new Date(formatDate(post.metadata.date)).toUTCString()
				.replaceAll(" 22:00:00 GMT", "")}</pubDate>
		</item>
	`
