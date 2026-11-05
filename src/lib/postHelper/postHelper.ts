import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";

/**
 * Get all images from a rich text document
 * @param postContent - The content of the post
 * @returns An array of assets
 */
export function getAllImagesFromRichText(postContent: Document): Asset[] {
	const images: Asset[] = [];
	postContent.content.forEach((node) => {
		if (node.nodeType === "embedded-asset-block") {
			images.push(node.data.target as Asset);
		}
	});
	return images;
}
