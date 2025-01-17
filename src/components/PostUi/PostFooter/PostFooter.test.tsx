import { PostSchema, PostSchemaLight } from "@/Schemas/PostSchema";
import { render, screen } from "@testing-library/react";
import PostFooter from "./PostFooter";

const mockAllPosts: PostSchemaLight[] = [
	{
		id: "1",
		title: "Post 1",
		slug: "current-post",
		date: "2024-01-01",
		tag: ["tag1"],
		mainPicture: {
			filename_disk: "current.jpg",
			title: "Current Image",
			height: 100,
			width: 100,
		},
		mainPictureAlt: "Current Image Alt",
		summary: "Summary of the current post",
	},
	{
		id: "2",
		slug: "previous-post",
		title: "Post 2",
		date: "2024-01-02",
		tag: ["tag1"],
		summary: "Summary of the previous post",
		mainPictureAlt: "Previous Image Alt",
		mainPicture: {
			filename_disk: "previous.jpg",
			title: "Previous Image",
			height: 100,
			width: 100,
		},
	},
	{
		id: "3",
		slug: "next-post",
		title: "Post 3",
		date: "2024-01-03",
		tag: ["tag1"],
		summary: "Summary of the next post",
		mainPictureAlt: "Next Image Alt",
		mainPicture: {
			filename_disk: "next.jpg",
			title: "Next Image",
			height: 100,
			width: 100,
		},
	},
];

describe("PostFooter", () => {
	it("should render correctly with previous and next posts", () => {
		const mockCurrentPost = mockAllPosts[1] as PostSchema;
		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.getByText("Post 1")).toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
		expect(screen.getByText("Post 3")).toBeInTheDocument();
	});

	it("should render correctly with only previous post", () => {
		const mockCurrentPost = mockAllPosts[2] as PostSchema;

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.queryByText("À suivre...")).not.toBeInTheDocument();
	});

	it("should render correctly with only next post", () => {
		const mockCurrentPost = mockAllPosts[0] as PostSchema;

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.queryByText("Précédemment...")).not.toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
	});

	it("should render null if current post is not found in all posts", () => {
		const mockCurrentPost = {
			id: "14",
			title: "Post inexistant",
			slug: "current-post",
			date: "2024-01-01",
			tag: ["tag1"],
			mainPicture: {
				filename_disk: "current.jpg",
				title: "Current Image",
				height: 100,
				width: 100,
			},
			mainPictureAlt: "Current Image Alt",
			summary: "Summary of the current post",
		} as PostSchema;

		const { container } = render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it("should order posts correctly", () => {
		const unorderedPosts: PostSchemaLight[] = [
			mockAllPosts[2], // Next Post
			mockAllPosts[1], // Current Post
			mockAllPosts[0], // Previous Post
		];

		const mockCurrentPost = mockAllPosts[1] as PostSchema;

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={unorderedPosts} />,
		);

		const indicators = screen.getAllByText(/Post 1|Post 3/);
		expect(indicators[0]).toHaveTextContent("Post 1");
		expect(indicators[1]).toHaveTextContent("Post 3");
	});
});
