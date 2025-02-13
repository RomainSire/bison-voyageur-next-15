import { getAllImagesFromRichText } from "./postHelper";

describe("getAllImagesFromRichText", () => {
	it("should return an array of assets from a rich text document", () => {
		const mockAsset: any = {
			sys: {
				id: "asset-id",
				type: "Asset",
				createdAt: "2021-01-01T00:00:00Z",
				updatedAt: "2021-01-01T00:00:00Z",
				locale: "en-US",
				revision: 1,
			},
			fields: {
				title: "Image Title",
				file: {
					url: "/path/to/image.jpg",
					details: {
						size: 12345,
						image: {
							width: 800,
							height: 600,
						},
					},
					fileName: "image.jpg",
					contentType: "image/jpeg",
				},
			},
		};

		const mockDocument: any = {
			nodeType: "document",
			data: {},
			content: [
				{
					nodeType: "embedded-asset-block",
					content: [],
					data: {
						target: mockAsset,
					},
				},
			],
		};

		const result = getAllImagesFromRichText(mockDocument);
		expect(result).toEqual([mockAsset]);
	});

	it("should return an empty array if there are no embedded assets", () => {
		const mockDocument: any = {
			nodeType: "document",
			data: {},
			content: [
				{
					nodeType: "paragraph",
					content: [
						{
							nodeType: "text",
							value: "This is a paragraph.",
							marks: [],
							data: {},
						},
					],
					data: {},
				},
			],
		};

		const result = getAllImagesFromRichText(mockDocument);
		expect(result).toEqual([]);
	});
});
