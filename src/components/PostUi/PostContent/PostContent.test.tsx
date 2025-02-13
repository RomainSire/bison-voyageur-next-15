import { BLOCKS, Document } from "@contentful/rich-text-types";
import { render, screen } from "@testing-library/react";
import PostContent from "./PostContent";

const content: Document = {
	nodeType: BLOCKS.DOCUMENT,
	content: [
		{
			nodeType: BLOCKS.PARAGRAPH,
			content: [
				{
					nodeType: "text",
					value: "Sample Content",
					marks: [],
					data: {},
				},
			],
			data: {},
		},
	],
	data: {},
};

const mockPost = {
	sys: {
		id: "1",
	},
	fields: {
		title: "Sample Post",
		slug: "sample-post",
		date: "2013-06-01",
		thumbnail: {
			sys: {
				id: "1",
			},
			fields: {
				title: "Sample Image",
				file: {
					url: "//path/to/sample-image.jpg",
					details: {
						image: {
							width: 100,
							height: 100,
						},
					},
				},
			},
		},
		featuredImage: {
			sys: {
				id: "2",
			},
			fields: {
				title: "Featured Image",
				file: {
					url: "//path/to/featured-image.jpg",
					details: {
						image: {
							width: 200,
							height: 200,
						},
					},
				},
			},
		},
		content,
	},
} as any;

describe("PostContent Component", () => {
	test("renders correctly with given post", () => {
		render(<PostContent post={mockPost} />);

		expect(screen.getByText("samedi 1 juin 2013")).toBeInTheDocument();
		expect(screen.getByText("Sample Content")).toBeInTheDocument();
	});
});
