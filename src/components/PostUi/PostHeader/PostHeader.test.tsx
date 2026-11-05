import { PostType } from "@/Types/PostType";
import { createMockPost } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import PostHeader from "./PostHeader";

const mockPost: Entry<PostType, undefined, string> = createMockPost({
	title: "Sample Post",
	slug: "sample-post",
	date: "2013-06-01T00:00:00Z",
	thumbnail: {
		title: "Sample Image",
		url: "//path/to/sample-image.jpg",
		fileName: "sample-image.jpg",
	},
	featuredImage: {
		title: "Featured Image",
		url: "//path/to/featured-image.jpg",
		fileName: "featured-image.jpg",
	},
});

describe("PostHeader Component", () => {
	test("renders correctly with given post data", () => {
		render(<PostHeader post={mockPost} />);

		expect(screen.getByAltText("Featured Image")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Sample Post",
		);
	});
});
