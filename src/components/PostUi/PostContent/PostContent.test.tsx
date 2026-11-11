import { createMockPost } from "@/lib/testUtils/testUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostContent from "./PostContent";

describe("PostContent Component", () => {
	test("renders the date and the Markdown text of the post", () => {
		const post = createMockPost({
			date: "2013-06-01",
			content: "Sample Content",
		});
		render(<PostContent post={post} />);

		expect(screen.getByText("samedi 1 juin 2013")).toBeInTheDocument();
		expect(screen.getByText("Sample Content")).toBeInTheDocument();
	});

	test("renders a single line break as a line break", () => {
		const post = createMockPost({ content: "Première ligne\nDeuxième ligne" });
		const { container } = render(<PostContent post={post} />);

		const paragraph = container.querySelector("#post-content p");
		expect(paragraph?.innerHTML).toBe("Première ligne<br>\nDeuxième ligne");
	});

	test("renders bold and italic text", () => {
		const post = createMockPost({ content: "Du **gras** et de l'_italique_" });
		render(<PostContent post={post} />);

		expect(screen.getByText("gras").tagName).toBe("STRONG");
		expect(screen.getByText("italique").tagName).toBe("EM");
	});

	test("renders bulleted lists with disc bullets", () => {
		const post = createMockPost({
			content: "Et oui... alors 2 choses :\n- une\n- deux",
		});
		render(<PostContent post={post} />);

		const list = screen.getByRole("list");
		expect(list).toHaveStyle({ listStyle: "disc" });
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	describe("photos", () => {
		const post = createMockPost({
			content: [
				"Un texte.",
				"![alt du Markdown](01-post/une.jpg)",
				"Un autre texte.",
				"![Deuxième](01-post/deux.jpg)\n![Troisième](01-post/trois.jpg)",
			].join("\n\n"),
			pictures: [
				{
					src: "/pictures/01-post/une.jpg",
					caption: "Une",
					width: 640,
					height: 480,
				},
				{ src: "/pictures/01-post/deux.jpg", caption: "Deuxième" },
				{ src: "/pictures/01-post/trois.jpg", caption: "Troisième" },
			],
		});

		test("take their caption and size from the post pictures", () => {
			render(<PostContent post={post} />);

			const image = screen.getByAltText("Une");
			expect(image).toHaveAttribute("width", "640");
			expect(image).toHaveAttribute("height", "480");
			expect(screen.queryByAltText("alt du Markdown")).not.toBeInTheDocument();
		});

		test("are not wrapped in a paragraph, even when on consecutive lines", () => {
			const { container } = render(<PostContent post={post} />);

			expect(container.querySelectorAll("#post-content img")).toHaveLength(3);
			expect(container.querySelector("#post-content p img")).toBeNull();
			expect(container.querySelector("#post-content br")).toBeNull();
		});

		test("open the gallery at the clicked photo", async () => {
			// JSDOM does not support the dialog element
			HTMLDialogElement.prototype.showModal = jest.fn(function mock(
				this: HTMLDialogElement,
			) {
				this.open = true;
			});
			const user = userEvent.setup();
			render(<PostContent post={post} />);

			await user.click(screen.getByAltText("Deuxième"));

			expect(
				screen.getByRole("img", { name: "Image 2 sur 3" }),
			).toBeInTheDocument();
		});
	});
});
