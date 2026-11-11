import { type Content, loadContent } from "./loader";
import type { Post, PostPreview, Tag } from "./types";

export type { Picture, Post, PostPreview, Tag } from "./types";

let cache: Content | undefined;

/** Loads content/ and public/pictures/ once per process (at build time). */
const loadedContent = (): Content => (cache ??= loadContent());

const toPreview = ({
	slug,
	title,
	date,
	summary,
	tags,
	mainPicture,
}: Post): PostPreview => ({ slug, title, date, summary, tags, mainPicture });

const byDateDesc = (a: Post, b: Post) => b.date.localeCompare(a.date);

/** All posts previews, sorted by date. */
export const getAllPosts = (order: "asc" | "desc" = "desc"): PostPreview[] => {
	const sorted = [...loadedContent().posts].sort(byDateDesc);
	if (order === "asc") sorted.reverse();
	return sorted.map(toPreview);
};

/** The `n` most recent posts previews. */
export const getLastPosts = (n: number = 3): PostPreview[] =>
	getAllPosts("desc").slice(0, n);

export const getPostBySlug = (slug: string): Post | undefined =>
	loadedContent().posts.find((post) => post.slug === slug);

/** Posts previews carrying the tag, newest first. */
export const getPostsByTag = (tagSlug: string): PostPreview[] =>
	getAllPosts("desc").filter((post) =>
		post.tags.some((tag) => tag.slug === tagSlug),
	);

/** All tags, in the order of content/tags.json. */
export const getAllTags = (): Tag[] => [...loadedContent().tags];

export const getTagBySlug = (slug: string): Tag | undefined =>
	loadedContent().tags.find((tag) => tag.slug === slug);
