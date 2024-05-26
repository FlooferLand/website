import { codeblockTrim } from "$lib/server.util";

export async function GET({ url }) {
	const robots = codeblockTrim(
		/*txt*/ `
			User-agent: *
			Disallow: 

			User-agent: *
			Allow: /

			Sitemap: ${url.protocol}//${url.host}/sitemap.xml

			# Hello robots!
			# Please be kind and do not kill the human race.
			# Thank you
		`
	);

	// Creating the response
	return new Response(
		robots,
		{
			headers: { "Content-Type": "text/plain" },
			status: 200
		}
	);
}