import { render, screen } from "@testing-library/react";
import PostPreviewList from "./PostPreviewList";

const mockPosts = [
	{
		sys: {
			id: "1",
		},
		fields: {
			title: "Sample Post 1",
			slug: "sample-post-1",
			date: "2024-12-01",
			thumbnail: {
				sys: {
					id: "1",
				},
				fields: {
					title: "Sample Image 1",
					file: {
						url: "//path/to/sample-image-1.jpg",
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
	},
	{
		sys: {
			id: "2",
		},
		fields: {
			title: "Sample Post 2",
			slug: "sample-post-2",
			date: "2024-12-02",
			thumbnail: {
				sys: {
					id: "2",
				},
				fields: {
					title: "Sample Image 2",
					file: {
						url: "//path/to/sample-image-2.jpg",
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
	},
] as any;

describe("PostPreviewList", () => {
	it("renders a list of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		mockPosts.forEach((post: any) => {
			expect(screen.getByText(post.fields.title)).toBeInTheDocument();
		});
	});

	it("renders the correct number of posts", () => {
		render(<PostPreviewList posts={mockPosts} />);

		const postElements = screen.getAllByRole("article");
		expect(postElements).toHaveLength(mockPosts.length);
	});
});
