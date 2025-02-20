import { PostType, PostTypeLight } from "@/Types/PostType";
import { createMockPost, createMockPostLight } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import PostFooter from "./PostFooter";

const mockAllPosts: Entry<PostTypeLight, undefined, string>[] = [
	createMockPostLight({
		id: "1",
		title: "Post 1",
		slug: "post-1",
		date: "2024-12-01T00:00:00Z",
		thumbnail: {
			title: "Image 1",
			url: "//path/to/image.jpg",
			fileName: "image.jpg",
		},
	}),
	createMockPostLight({
		id: "2",
		title: "Post 2",
		slug: "post-2",
		date: "2024-12-02T00:00:00Z",
		thumbnail: {
			title: "Image 2",
			url: "//path/to/image.jpg",
			fileName: "image.jpg",
		},
	}),
	createMockPostLight({
		id: "3",
		title: "Post 3",
		slug: "post-3",
		date: "2024-12-03T00:00:00Z",
		thumbnail: {
			title: "Image 3",
			url: "//path/to/image.jpg",
			fileName: "image.jpg",
		},
	}),
];

describe("PostFooter", () => {
	it("should render correctly with previous and next posts", () => {
		// Post 2 is the current post
		const mockCurrentPost: Entry<PostType, undefined, string> = createMockPost({
			id: "2",
		});
		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.getByText("Post 1")).toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
		expect(screen.getByText("Post 3")).toBeInTheDocument();
	});

	it("should render correctly with only previous post", () => {
		// Post 3 is the current post
		const mockCurrentPost: Entry<PostType, undefined, string> = createMockPost({
			id: "3",
		});

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.getByText("Précédemment...")).toBeInTheDocument();
		expect(screen.queryByText("À suivre...")).not.toBeInTheDocument();
	});

	it("should render correctly with only next post", () => {
		// Post 1 is the current post
		const mockCurrentPost: Entry<PostType, undefined, string> = createMockPost({
			id: "1",
		});

		render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(screen.queryByText("Précédemment...")).not.toBeInTheDocument();
		expect(screen.getByText("À suivre...")).toBeInTheDocument();
	});

	it("should render null if current post is not found in all posts", () => {
		// Current post is not in the list of all posts
		const mockCurrentPost: Entry<PostType, undefined, string> = createMockPost({
			id: "4",
		});

		const { container } = render(
			<PostFooter currentPost={mockCurrentPost} allPosts={mockAllPosts} />,
		);

		expect(container.firstChild).toBeNull();
	});
});
