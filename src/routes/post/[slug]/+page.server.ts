import { getPost } from '$lib/posts.js';


export async function load({ params }) {
    return {
        slug: params.slug,
        post: await getPost(params.slug)
    };
}
