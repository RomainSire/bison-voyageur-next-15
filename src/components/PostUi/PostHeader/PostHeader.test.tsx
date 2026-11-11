import { createMockPost } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import PostHeader from "./PostHeader";

const mockPost = createMockPost({
	title: "Sample Post",
	slug: "sample-post",
	date: "2013-06-01",
	mainPicture: {
		caption: "Main Picture",
		src: "/pictures/01-sample-post/main-picture.jpg",
	},
});

describe("PostHeader Component", () => {
	test("renders correctly with given post data", () => {
		render(<PostHeader post={mockPost} />);

		expect(screen.getByAltText("Main Picture")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Sample Post",
		);
	});
});
