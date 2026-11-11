import { createMockPostPreview } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import PostPreviewList from "./PostPreviewList";

const mockPosts = [
	createMockPostPreview({
		title: "Sample Post 1",
		slug: "sample-post-1",
		date: "2024-12-01",
		mainPicture: { caption: "Sample Image 1" },
	}),
	createMockPostPreview({
		title: "Sample Post 2",
		slug: "sample-post-2",
		date: "2024-12-02",
		mainPicture: { caption: "Sample Image 2" },
	}),
];

describe("PostPreviewList", () => {
	it("renders a list of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		mockPosts.forEach((post) => {
			expect(screen.getByText(post.title)).toBeInTheDocument();
		});
	});

	it("renders the correct number of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		const postElements = screen.getAllByRole("article");
		expect(postElements).toHaveLength(mockPosts.length);
	});
});
