import type { DirectusFile } from "@directus/sdk";

/**
 * The schema of the main picture of a post
 */
export type MainPictureSchema = DirectusFile;

/**
 * The schema of a main picture, but with less data. This will be used when all posts are fetched
 */
export type MainPictureSchemaLight = Pick<
	DirectusFile,
	"filename_disk" | "title" | "height" | "width"
>;
