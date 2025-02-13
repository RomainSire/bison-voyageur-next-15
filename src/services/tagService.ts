import { TagType } from "@/Types/TagType";
import { contentfulClient } from "./clientManager";

/**
 * Get all tags, ordered by created date
 */
export const getAllTags = async () => {
	const response = await contentfulClient.getEntries<TagType>({
		content_type: "tag",
		order: ["sys.createdAt"],
	});
	return response.items;
};

/**
 * Get a tag by its slug
 */
export const getTagBySlug = async (slug: string) => {
	const response = await contentfulClient.getEntries<TagType>({
		content_type: "tag",
		"fields.slug": slug,
	});
	return response.items[0];
};
