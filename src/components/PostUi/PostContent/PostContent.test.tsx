import { createMockPost } from "@/lib/testUtils/testUtils";
import { PostType } from "@/Types/PostType";
import { render, screen } from "@testing-library/react";
import { Entry } from "contentful";
import PostContent from "./PostContent";

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

describe("PostContent Component", () => {
	test("renders correctly with given post", () => {
		render(<PostContent post={mockPost} />);

		expect(screen.getByText("samedi 1 juin 2013")).toBeInTheDocument();
		expect(screen.getByText("Sample Content")).toBeInTheDocument();
	});
});
