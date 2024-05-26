import { getPosts } from "$lib/posts";
import { json } from "@sveltejs/kit";

export async function GET() : Promise<Response> {
	const posts = getPosts();
	return json(posts);
}
