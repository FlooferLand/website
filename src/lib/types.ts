export type Category = "None" | "Programming" | "Mental health";

export type Post = {
	title: string;
	desc: string;
	date: string;
	category: Category;
	published: boolean;

	slug: string;
};

export function isValidMetadata(obj: object): boolean {
	return (
		obj &&
		"title" in obj &&
		"desc" in obj &&
		"date" in obj &&
		"category" in obj &&
		"published" in obj
	);
}
