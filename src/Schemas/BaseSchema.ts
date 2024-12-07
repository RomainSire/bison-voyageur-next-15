import { DirectusFile } from "@directus/sdk";
import { PostSchema } from "./PostSchema";

/**
 * The base schema of the project, contains all the schemas and is provided to the Directus SDK
 */
export default interface BaseSchema {
	post: PostSchema[];
	directus_files: DirectusFile[];
}
