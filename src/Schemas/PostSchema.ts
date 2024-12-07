import { DirectusFile } from "@directus/sdk";

/**
 * The schema of a post
 */
export interface PostSchema {
	slug: string;
	title: string;
	mainPicture: DirectusFile;
	date: string;
}
