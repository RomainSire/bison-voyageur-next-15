import { EntryFieldTypes } from "contentful";
import { TagType } from "./TagType";

/**
 * Post type from contentful
 */
export interface PostType {
	contentTypeId: "post";
	fields: {
		/**
		 * Title of the post
		 */
		title: EntryFieldTypes.Text;
		/**
		 * Slug of the post
		 */
		slug: EntryFieldTypes.Text;
		/**
		 * Date of the post
		 */
		date: EntryFieldTypes.Date;
		/**
		 * Tags is a reference to the tag content type
		 */
		tags: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TagType>>;
		/**
		 * Thumbnail of the post
		 * NB: Type for asset is badly defined in contentful.
		 * To type it correctly use (post.fields.thumbnail as Asset).fields.file.url
		 * @see https://stackoverflow.com/a/78122682
		 */
		thumbnail: EntryFieldTypes.AssetLink;
		/**
		 * Featured image of the post
		 * NB: Type for asset is badly defined in contentful.
		 * To type it correctly use (post.fields.featuredImage as Asset).fields.file.url
		 * @see https://stackoverflow.com/a/78122682
		 */
		featuredImage: EntryFieldTypes.AssetLink;
		/**
		 * Summary of the post
		 */
		summary: EntryFieldTypes.Text;
		/**
		 * Content of the post
		 */
		content: EntryFieldTypes.RichText;
	};
}

/**
 * Light version of the post type (without content and featuredImage)
 */
export type PostTypeLight = Omit<PostType, "fields"> & {
	fields: Omit<PostType["fields"], "content" | "featuredImage">;
};
