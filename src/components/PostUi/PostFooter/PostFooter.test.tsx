import { render, screen } from "@testing-library/react";
import PostFooter from "./PostFooter";

const mockAllPosts = [
	{
		sys: {
			id: "1",
		},
		fields: {
			title: "Post 1",
			slug: "post-1",
			date: "2024-12-01",
			thumbnail: {
				sys: {
					id: "1",
				},
				fields: {
					title: "Image 1",
					file: {
						url: "//path/to/image.jpg",
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
			title: "Post 2",
			slug: "post-2",
			date: "2024-12-02",
			thumbnail: {
				sys: {
					id: "2",
				},
				fields: {
					title: "Image 2",
					file: {
						url: "//path/to/image.jpg",
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
			id: "3",
		},
		fields: {
			title: "Post 3",
			slug: "post-3",
			date: "2024-12-03",
			thumbnail: {
				sys: {
					id: "3",
				},
				fields: {
					title: "Image 3",
					file: {
						url: "//path/to/image.jpg",
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

describe("PostFooter", () => {
	it("should render correctly with previous and next posts", () => {
		const mockCurrentPost = mockAllPosts[1] as any;
		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.getByText("Post 1")).toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
		expect(screen.getByText("Post 3")).toBeInTheDocument();
	});

	it("should render correctly with only previous post", () => {
		const mockCurrentPost = mockAllPosts[2] as any;

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.queryByText("À suivre...")).not.toBeInTheDocument();
	});

	it("should render correctly with only next post", () => {
		const mockCurrentPost = mockAllPosts[0] as any;

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.queryByText("Précédemment...")).not.toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
	});

	it("should render null if current post is not found in all posts", () => {
		const mockCurrentPost = {
			sys: {
				id: "4",
			},
			fields: {
				title: "Post 4",
				slug: "post-4",
				date: "2024-12-04",
				thumbnail: {
					sys: {
						id: "4",
					},
					fields: {
						title: "Image 4",
						file: {
							url: "//path/to/image.jpg",
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

		const { container } = render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(container.firstChild).toBeNull();
	});
});
