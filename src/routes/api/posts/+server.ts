import { json } from "@sveltejs/kit";
import { isValidMetadata, type Post } from "$lib/types";

type BlobFile = {
	default: object;
	metadata: object;
};

interface IChecks {
	[key: string]: boolean;
}

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob("/src/posts/*/post.md", { eager: true });
	for (const path in paths) {
		const file: BlobFile = paths[path] as BlobFile;
		const slug = path.split("/").at(-2);
		const thumbnail = `/src/posts/${slug}/thumbnail.webp`;

		const fileExists = file && typeof file === "object";
		const slugExists = slug != undefined && typeof slug === "string";
		const fileHasMetadata = isValidMetadata(file.metadata);

		const checks: IChecks = { fileExists, slugExists, fileHasMetadata };

		if (fileExists && fileHasMetadata && slugExists) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug, thumbnail } satisfies Post;
			post.published && posts.push(post);
		} else {
			let stringChecks: string = "";
			for (const [key, value] of Object.entries(checks)) {
				stringChecks += `\t${key}: ${value ? "☑️" : "❌"}\n`;
			}
			throw Error(`\nBlog at "${path}" is invalid:\n${stringChecks}\n`);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);
	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
