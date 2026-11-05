import { PostTypeLight } from "@/Types/PostType";
import { createMockPostLight } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import PostPreviewList from "./PostPreviewList";

const mockPosts: Entry<PostTypeLight, undefined, string>[] = [
	createMockPostLight({
		id: "1",
		title: "Sample Post 1",
		slug: "sample-post-1",
		date: "2024-12-01T00:00:00Z",
		thumbnail: {
			title: "Sample Image 1",
			url: "//path/to/sample-image-1.jpg",
		},
	}),
	createMockPostLight({
		id: "2",
		title: "Sample Post 2",
		slug: "sample-post-2",
		date: "2024-12-02T00:00:00Z",
		thumbnail: {
			title: "Sample Image 2",
			url: "//path/to/sample-image-2.jpg",
		},
	}),
];

describe("PostPreviewList", () => {
	it("renders a list of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		mockPosts.forEach((post) => {
			expect(screen.getByText(post.fields.title)).toBeInTheDocument();
		});
	});

	it("renders the correct number of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		const postElements = screen.getAllByRole("article");
		expect(postElements).toHaveLength(mockPosts.length);
	});
});
