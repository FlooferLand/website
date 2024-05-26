import { getAllRouteAddresses } from "$lib/server.util.js";

export async function GET({ url }) {
	// Getting all the pages
	const routes: string[] = getAllRouteAddresses(url);

	// Creating the response
	return new Response(
		routes.join('\n'),
		{
			headers: { "Content-Type": "text/plain; charset=utf-8" },
			status: 200
		}
	);
}