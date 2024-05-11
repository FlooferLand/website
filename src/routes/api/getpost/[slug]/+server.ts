import { getPost } from "$lib/posts";
import { json } from "@sveltejs/kit";

export async function GET({ params }) : Promise<Response> {
	const post = await getPost(params.slug);
	return json(post);
}
