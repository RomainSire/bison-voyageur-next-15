import { createMockPostPreview } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import PostPreview from "./PostPreview";

// Mock post object
const mockedPost = createMockPostPreview({
	title: "Sample Post",
	slug: "sample-post",
	date: "2024-12-01",
	mainPicture: {
		caption: "Sample Image",
		src: "/pictures/01-sample-post/sample-image.jpg",
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

	it("should link to the post page", () => {
		render(<PostPreview post={mockedPost} />);
		expect(screen.getByRole("link")).toHaveAttribute(
			"href",
			"/post/sample-post",
		);
	});
});
