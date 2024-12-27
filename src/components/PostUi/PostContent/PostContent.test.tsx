import { MainPictureSchema } from "@/Schemas/MainPictureSchema";
import { PostSchema } from "@/Schemas/PostSchema";
import { render, screen } from "@testing-library/react";
import PostContent from "./PostContent";

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
	date: "2013-06-01",
	tag: ["test"],
	mainPicture: mainPicture,
	mainPictureAlt: "Test Image",
	summary: "This is a test post",
	content: "This is the test post content",
};

jest.mock("../MarkdownParser/MarkdownParser", () => () => (
	<div>Mocked Markdown Content</div>
));

describe("PostContent Component", () => {
	test("renders correctly with given post", () => {
		render(<PostContent post={mockPost} />);

		expect(screen.getByText("samedi 1 juin 2013")).toBeInTheDocument();
		expect(screen.getByText("Mocked Markdown Content")).toBeInTheDocument();
	});
});
