import { PostType, PostTypeLight } from "@/Types/PostType";
import { contentfulClient } from "./clientManager";

/**
 * Get all posts preview
 * @param order - Order of the posts
 */
export const getAllPosts = async (order: "asc" | "desc" = "desc") => {
	const response = await contentfulClient.getEntries<PostTypeLight>({
		content_type: "post",
		select: [
			"fields.title",
			"fields.slug",
			"fields.date",
			"fields.tags",
			"fields.thumbnail",
			"fields.summary",
		],
		order: [order === "asc" ? "fields.date" : "-fields.date"],
	});
	return response.items;
};

/**
 * Get only the n last posts
 * @param n - Number of posts to get
 */
export const getLastPosts = async (n: number = 3) => {
	const response = await contentfulClient.getEntries<PostTypeLight>({
		content_type: "post",
		select: [
			"fields.title",
			"fields.slug",
			"fields.date",
			"fields.tags",
			"fields.thumbnail",
			"fields.summary",
		],
		order: ["-fields.date"],
		limit: n,
	});
	return response.items;
};

/**
 * Get a post by its slug
 * @param slug - Slug of the post
 */
export const getPostBySlug = async (slug: string) => {
	const response = await contentfulClient.getEntries<PostType>({
		content_type: "post",
		"fields.slug": slug,
	});
	return response.items[0];
};

/**
 * Get all posts by tag
 * @param tagId - ID of the tag to filter
 */
export const getPostsByTag = async (tagId: string) => {
	const response = await contentfulClient.getEntries<PostTypeLight>({
		content_type: "post",
		"fields.tags.sys.id": tagId,
		select: [
			"fields.title",
			"fields.slug",
			"fields.date",
			"fields.tags",
			"fields.thumbnail",
			"fields.summary",
		],
	});
	return response.items;
};
