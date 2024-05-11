import { postsPath } from "$lib/config";
import type { Post, PostMetadata } from "$lib/types";
import path from "path";
import fs from "fs";
import yaml from "yaml";

/** Server-side. Uses FS to get a post */
export async function getPost(slug: string) : Promise<Post> {
	// Paths
	const metadataPath  = `${postsPath}/${slug}/metadata.yml`;
	const thumbnailPath = `${postsPath}/${slug}/thumbnail.webp`;

	// Reading the post metadata
	const metadata: PostMetadata = (() => {
		const fileContent = fs.readFileSync(metadataPath, { encoding: "utf-8" });
		if (!fileContent)
			throw Error(`Could not read the metadata for post "${slug}" at ${metadataPath}`);
	
		// Parsing the data
		const parsedMetadata = yaml.parse(fileContent);
		if (!parsedMetadata)
			throw Error(`Could not parse the metadata for post "${slug}" at ${metadataPath}. Invalid YAML`);
		
		// Defaults and such
		const metadata: PostMetadata = parsedMetadata satisfies PostMetadata;
		if (metadata.published == undefined) {
			metadata.published = true;
		}

		return metadata;
	})();

	// Constructing the post
	return { metadata, slug, thumbnailPath } satisfies Post;
}

/** Server-side. Uses FS to get the posts */
export async function getPosts() : Promise<Post[]> {
	const posts: Post[] = [];

	const folders: string[] = fs.readdirSync(postsPath);
	for (const folder of folders) {
		const folderPath = path.join(postsPath, folder)
		const folderStats = fs.statSync(folderPath);
		
        // Finding the post's directory
		if (folderStats.isDirectory()) {
			const slug = folder
			const post = await getPost(slug);
			if (post.metadata.published)
				posts.push(post);
		}
	}

	posts.sort((first, second) => new Date(second.metadata.date).getTime() - new Date(first.metadata.date).getTime());
	
	return posts;
}