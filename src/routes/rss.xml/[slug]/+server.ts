import { rssGet } from "$lib/rss";

export async function GET({ url, params }) {
	return await rssGet(url.host, params.slug);
}
