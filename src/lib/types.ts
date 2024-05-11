export type Category = "None" | "Programming" | "Mental health";

export type PostMetadata = {
	title: string;
	desc: string;
	date: Date;
	category: Category;
	published: boolean;
}

export type Post = {
	metadata: PostMetadata,
	
	slug: string;
	thumbnailPath: string;
};
