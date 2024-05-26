import { postsPath } from "$lib/config";
import type { Post, PostMetadata } from "$lib/types";
import path from "path";
import fs from "fs";
import yaml from "yaml";

// Types & variables
interface BlogPosts {
	[slug: string]: Post;
}
export let cachedBlogPosts: BlogPosts = {};
export const categoriesArray = [
	"programming",
    "life",
    "discord",
    "relationships",
    "rustlang",
	"tutorial"
];
export const tagsArray = categoriesArray;

// Caching replacement functions
// TODO: Make getPosts() return {BlogPosts} instead of Post[]
//       Sorting should maybe be done client-side
export function getPost(slug: string) : Post {
	return cachedBlogPosts[slug];
}
export function getPosts() : Post[] {
	const posts = Object.values(cachedBlogPosts);
	posts.sort(
		(first, second) =>
			second.metadata.date.getTime() - first.metadata.date.getTime()
	);
	return posts;
}

/** Server-side. Uses FS to initialize the cache for all posts */
export async function initializeCache() {
	cachedBlogPosts = await internalGetPosts();
}

/** Server-side. Uses FS to get a post */
async function internalGetPost(slug: string) : Promise<Post> {
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
		const [day, month, year] = parsedMetadata.date.split(/\/|-/g);
		metadata.date = new Date(year, month - 1, day);
		if (metadata.published == undefined) {
			metadata.published = false;
		}
		if (metadata.tags == undefined) {
			metadata.tags = [];
		}

		return metadata;
	})();

	// Constructing the post
	return { metadata, slug, thumbnailPath } satisfies Post;
}

/** Server-side. Uses FS to get the posts */
async function internalGetPosts() : Promise<BlogPosts> {
	const posts: BlogPosts = {};

	const folders: string[] = fs.readdirSync(postsPath);
	for (const folder of folders) {
		const folderPath = path.join(postsPath, folder)
		const folderStats = fs.statSync(folderPath);
		
        // Finding the post's directory
		if (folderStats.isDirectory()) {
			const slug = folder
			const post = await internalGetPost(slug);
			if (post.metadata.published)
				posts[slug] = post;
		}
	}
	
	return posts;
}