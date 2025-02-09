import { render, screen } from "@testing-library/react";
import PostPreview from "./PostPreview";

// Mock post object
const mockPost = {
	sys: {
		id: "1",
	},
	fields: {
		title: "Sample Post",
		slug: "sample-post",
		date: "2024-12-01",
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
	},
} as any;

describe("PostPreview", () => {
	it("should render the title correctly", () => {
		render(<PostPreview post={mockPost} />);
		const title = screen.getByRole("heading", { name: "Sample Post" });
		expect(title).toBeInTheDocument();
	});

	it("should render the date correctly", () => {
		render(<PostPreview post={mockPost} />);
		const date = screen.getByText("dimanche 1 décembre 2024");
		expect(date).toBeInTheDocument();
	});

	it("should render the image with correct alt attributes", () => {
		render(<PostPreview post={mockPost} />);
		const image = screen.getByAltText("Sample Image");
		expect(image).toBeInTheDocument();
	});
});
