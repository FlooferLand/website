import { rssGet } from "$lib/rss";

export async function GET({ url }) {
	return await rssGet(url.host, undefined);
}
