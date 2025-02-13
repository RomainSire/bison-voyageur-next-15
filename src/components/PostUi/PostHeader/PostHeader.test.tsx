import { BLOCKS, Document } from "@contentful/rich-text-types";
import { render, screen } from "@testing-library/react";
import PostHeader from "./PostHeader";

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

describe("PostHeader Component", () => {
	test("renders correctly with given post data", () => {
		render(<PostHeader post={mockPost} />);

		expect(screen.getByAltText("Featured Image")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Sample Post",
		);
	});
});
