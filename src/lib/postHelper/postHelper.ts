/**
 * Get all images from a markdown string
 * @param postContent - The content of the post
 * @returns An array of objects containing the src and alt of each image
 */
export function getAllImagesFromMarkdown(postContent: string) {
	return (
		postContent.match(/!\[.*?\]\((.*?)\)/g)?.map((image) => {
			const src = image.match(/\((.*?)\)/)?.[1] ?? "";
			const alt = image.match(/\[(.*?)\]/)?.[1] ?? "";
			return { src, alt };
		}) ?? []
	);
}
