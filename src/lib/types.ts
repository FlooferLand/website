import type { PostCategory } from "./generated/types";

export type PostMetadata = {
	title: string;
	desc: string;
	date: Date;
	category: PostCategory;
	tags: Array<string>;
	published: boolean;
}

export type Post = {
	metadata: PostMetadata,
	
	slug: string;
	thumbnailPath: string;
};

