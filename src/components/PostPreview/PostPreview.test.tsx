import { PostSchemaLight } from "@/Schemas/PostSchema";
import { render, screen } from "@testing-library/react";
import PostPreview from "./PostPreview";

// Mock post object
const mockPost: PostSchemaLight = {
	id: "1",
	slug: "sample-post",
	title: "Sample Post",
	date: "2024-12-01",
	mainPicture: {
		filename_disk: "sample-image.jpg",
		title: "Sample Image",
		width: 800,
		height: 600,
	},
};

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
