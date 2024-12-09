import type {
	MainPictureSchema,
	MainPictureSchemaLight,
} from "./MainPictureSchema";

/**
 * The schema of a post
 */
export interface PostSchema {
	id: string;
	status: string;
	sort: number;
	date_created: string;
	date_updated: string;
	title: string;
	slug: string;
	date: string;
	tag: string[];
	mainPicture: MainPictureSchema;
	summary: string;
	content: string;
}

/**
 * The schema of a post, but with less data. This will be used when all posts are fetched
 */
export type PostSchemaLight = Pick<
	PostSchema,
	"id" | "slug" | "title" | "date"
> & {
	mainPicture: MainPictureSchemaLight;
};
