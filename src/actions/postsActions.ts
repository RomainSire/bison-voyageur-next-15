import directus from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";

/**
 * Get the three last posts summary
 */
export async function getAllPosts() {
	"use server";
	return directus.request(
		readItems("post", {
			fields: [
				"id",
				"title",
				"slug",
				"date",
				{ mainPicture: ["filename_disk", "title", "height", "width"] },
				"tag",
				"summary",
			],
			sort: "-date",
		}),
	);
}

/**
 * Get the three last posts summary
 * @param number - Number of posts to get (default 3)
 */
export async function getLastPosts(number: number = 3) {
	"use server";
	const allPosts = await getAllPosts();
	return allPosts.slice(0, number);
}

/**
 * Get the full post by id
 */
export async function getPostById(id: string) {
	"use server";
	return directus.request(
		readItem("post", id, {
			fields: [
				"id",
				"title",
				"slug",
				"date",
				{ mainPicture: ["filename_disk", "title", "height", "width"] },
				"tag",
				"summary",
				"content",
			],
		}),
	);
}

/**
 * Get the full post by slug
 */
export async function getPostBySlug(slug: string) {
	"use server";
	const allPosts = await getAllPosts();
	const postSummary = allPosts.find((post) => post.slug === slug);
	if (!postSummary) {
		throw new Error("Post not found");
	}
	return getPostById(postSummary.id);
}

/**
 * Get all the tags
 */
export async function getAllTags() {
	"use server";
	const allPosts = await getAllPosts();
	const tags = allPosts.flatMap((post) => post.tag);
	return [...new Set(tags)];
}

/**
 * Get all the posts by tag
 */
export async function getPostsByTag(tag: string) {
	"use server";
	const allPosts = await getAllPosts();
	return allPosts.filter((post) => post.tag.includes(tag));
}
