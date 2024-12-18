import { PostSchemaLight } from "@/Schemas/PostSchema";
import { render, screen } from "@testing-library/react";
import PostPreviewList from "./PostPreviewList";

const mockPosts: PostSchemaLight[] = [
	{
		id: "1",
		slug: "post-1",
		title: "Post 1",
		date: "2023-01-01",
		mainPicture: {
			filename_disk: "image1.webp",
			title: "Image 1",
			height: 100,
			width: 100,
		},
	},
	{
		id: "2",
		slug: "post-2",
		title: "Post 2",
		date: "2023-01-02",
		mainPicture: {
			filename_disk: "image2.webp",
			title: "Image 2",
			height: 100,
			width: 100,
		},
	},
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
