import { PostType, PostTypeLight } from "@/Types/PostType";
import { TagType } from "@/Types/TagType";
import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
if (!spaceId || !accessToken) {
	throw new Error("Contentful spaceId and accessToken must be provided");
}

const client = createClient({
	space: spaceId,
	accessToken: accessToken,
});

/**
 * Get all posts preview
 * @param order - Order of the posts
 */
export const getAllPosts = async (order: "asc" | "desc" = "desc") => {
	const response = await client.getEntries<PostTypeLight>({
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
	const response = await client.getEntries<PostTypeLight>({
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
	const response = await client.getEntries<PostType>({
		content_type: "post",
		"fields.slug": slug,
	});
	return response.items[0];
};

/**
 * Get all tags, ordered by created date
 */
export const getAllTags = async () => {
	const response = await client.getEntries<TagType>({
		content_type: "tag",
		order: ["sys.createdAt"],
	});
	return response.items;
};

/**
 * Get all posts by tag
 * @param tagId - ID of the tag to filter
 */
export const getPostsByTag = async (tagId: string) => {
	const response = await client.getEntries<PostTypeLight>({
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
