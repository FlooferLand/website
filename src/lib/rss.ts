import * as config from "$lib/config";
import type { Post } from "$lib/types";
import { formatDate } from "$lib/utils";

export async function rssGet(hostUrl: string, slug: string | undefined) : Promise<Response> {
	const response = await fetch("api/posts");
	const allPosts: Post[] = await response.json();

	// Formatting the posts
	let rssPosts: string = "";
	allPosts.forEach((post) => {
		if (slug == undefined || post.category.toLowerCase() == slug.toLowerCase()) {
			rssPosts += makePost(post, hostUrl) + '\n';
		}
	});

	// Formatting everything
	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.desc}</description>
				<link>${hostUrl}</link>
				<atom:link href="${hostUrl}/rss.xml" rel="self" type="application/rss+xml"/>
				<language>en-us</language>
				<generator>Svelte server 'src/routes/rss.xml/+server.ts'</generator>
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
			<title>${post.title}</title>
			<description>${post.desc}</description>
			<link>${hostUrl}/${post.slug}</link>
			<guid isPermaLink="true">${hostUrl}/${post.slug}</guid>
			<pubDate>${new Date(formatDate(post.date)).toUTCString()
				.replaceAll(" 22:00:00 GMT", "")}</pubDate>
		</item>
	`
