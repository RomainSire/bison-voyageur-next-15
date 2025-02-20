import { createMockPostLight } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import PostPreview from "./PostPreview";

// Mock post object
const mockedPost = createMockPostLight({
	title: "Sample Post",
	slug: "sample-post",
	date: "2024-12-01T00:00:00Z",
	thumbnail: {
		title: "Sample Image",
		url: "//path/to/sample-image.jpg",
		fileName: "sample-image.jpg",
	},
});

describe("PostPreview", () => {
	it("should render the title correctly", () => {
		render(<PostPreview post={mockedPost} />);
		const title = screen.getByRole("heading", { name: "Sample Post" });
		expect(title).toBeInTheDocument();
	});

	it("should render the date correctly", () => {
		render(<PostPreview post={mockedPost} />);
		const date = screen.getByText("dimanche 1 décembre 2024");
		expect(date).toBeInTheDocument();
	});

	it("should render the image with correct alt attributes", () => {
		render(<PostPreview post={mockedPost} />);
		const image = screen.getByAltText("Sample Image");
		expect(image).toBeInTheDocument();
	});
});
