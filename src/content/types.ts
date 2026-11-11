export type Picture = {
	src: string;
	width: number;
	height: number;
	caption: string;
};

export type Tag = { slug: string; name: string };

export type PostPreview = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	/** Always in the global order of content/tags.json. */
	tags: Tag[];
	mainPicture: Picture;
};

export type Post = PostPreview & {
	/** Raw Markdown body, without the frontmatter. */
	content: string;
	/** Pictures of the text, in the order of the text. */
	pictures: Picture[];
};
