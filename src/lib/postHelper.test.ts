import { getAllImagesFromMarkdown } from "./postHelper";

describe("getAllImagesFromMarkdown", () => {
	it("should return an empty array if no images are found", () => {
		const postContent = "This is a post without images.";
		const result = getAllImagesFromMarkdown(postContent);
		expect(result).toEqual([]);
	});

	it("should return an array with one image object if one image is found", () => {
		const postContent =
			"This is a post with one image ![alt text](http://example.com/image.jpg).";
		const result = getAllImagesFromMarkdown(postContent);
		expect(result).toEqual([
			{ src: "http://example.com/image.jpg", alt: "alt text" },
		]);
	});

	it("should return an array with multiple image objects if multiple images are found", () => {
		const postContent =
			"This is a post with multiple images ![alt text 1](http://example.com/image1.jpg) and ![alt text 2](http://example.com/image2.jpg).";
		const result = getAllImagesFromMarkdown(postContent);
		expect(result).toEqual([
			{ src: "http://example.com/image1.jpg", alt: "alt text 1" },
			{ src: "http://example.com/image2.jpg", alt: "alt text 2" },
		]);
	});

	it("should return an array with empty src and alt if the markdown is malformed", () => {
		const postContent =
			"This is a post with malformed image ![](http://example.com/image.jpg) and ![alt text]().";
		const result = getAllImagesFromMarkdown(postContent);
		expect(result).toEqual([
			{ src: "http://example.com/image.jpg", alt: "" },
			{ src: "", alt: "alt text" },
		]);
	});
});
