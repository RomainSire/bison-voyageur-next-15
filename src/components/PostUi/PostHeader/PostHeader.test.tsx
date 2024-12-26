import { MainPictureSchema } from "@/Schemas/MainPictureSchema";
import { PostSchema } from "@/Schemas/PostSchema";
import { render, screen } from "@testing-library/react";
import PostHeader from "./PostHeader";

const mainPicture = {
	filename_disk: "test-image.jpg",
	width: 800,
	height: 600,
	title: "Test Image",
} as MainPictureSchema;

const mockPost: PostSchema = {
	id: "1",
	status: "published",
	sort: 1,
	date_created: "2024-12-01",
	date_updated: "2024-12-01",
	title: "Test Post",
	slug: "test-post",
	date: "2024-12-01",
	tag: ["test"],
	mainPicture: mainPicture,
	mainPictureAlt: "Test Image",
	summary: "This is a test post",
	content: "This is the test post content",
};

describe("PostHeader Component", () => {
	test("renders correctly with given post data", () => {
		render(<PostHeader post={mockPost} />);

		expect(screen.getByAltText("Test Image")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Test Post",
		);
	});
});
