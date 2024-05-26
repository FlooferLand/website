import { codeblockTrim, entityEscape, getAllRouteAddresses } from "$lib/server.util.js";

export async function GET({ url }) {	
	// Getting all the pages	
	const routes: string[] = [];
	for (const address of getAllRouteAddresses(url, c => `<!-- ${c} -->`, false)) {
		const xml = codeblockTrim(
			/*xml*/ `
				<url><loc>${entityEscape(address)}</loc></url>
			`
		);

		routes.push(xml + '\n');
	}

	// Creating the XML
	const code = codeblockTrim(
		/*xml*/ `
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${routes.join('\n')}
			</urlset>
		`
	);

	// Creating the response
	return new Response(
		code,
		{
			headers: { "Content-Type": "application/xml; charset=utf-8" },
			status: 200
		}
	);
}