import { EntryFieldTypes } from "contentful";

/**
 * Tag type from contentful
 */
export interface TagType {
	contentTypeId: "tag";
	fields: {
		/**
		 * Name of the tag
		 */
		name: EntryFieldTypes.Text;
		/**
		 * Slug of the tag
		 */
		slug: EntryFieldTypes.Text;
	};
}
