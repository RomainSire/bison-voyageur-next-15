import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImagesGallery from "./ImagesGallery";

const mockImages: any = [
	{
		sys: { id: "1" },
		fields: {
			title: "Image 1",
			file: {
				url: "//path/to/image-1.jpg",
				details: { image: { width: 100, height: 100 } },
			},
		},
	},
	{
		sys: { id: "2" },
		fields: {
			title: "Image 2",
			file: {
				url: "//path/to/image-2.jpg",
				details: { image: { width: 100, height: 100 } },
			},
		},
	},
	{
		sys: { id: "3" },
		fields: {
			title: "Image 3",
			file: {
				url: "//path/to/image-3.jpg",
				details: { image: { width: 100, height: 100 } },
			},
		},
	},
];

describe("ImagesGallery", () => {
	it("should render the initial image", () => {
		render(<ImagesGallery allImages={mockImages} startIndex={0} />);
		expect(
			screen.getByRole("img", { name: /image 1 sur 3/i }),
		).toBeInTheDocument();
	});

	it("should paginate to the next image on next button click", async () => {
		const user = userEvent.setup();
		render(<ImagesGallery allImages={mockImages} startIndex={0} />);
		const nextButton = screen.getByRole("button", { name: /image suivante/i });
		await user.click(nextButton);
		expect(
			screen.getByRole("img", { name: /image 2 sur 3/i }),
		).toBeInTheDocument();
	});

	it("should paginate to the previous image on previous button click", async () => {
		const user = userEvent.setup();
		render(<ImagesGallery allImages={mockImages} startIndex={1} />);
		const prevButton = screen.getByRole("button", {
			name: /image précédente/i,
		});
		await user.click(prevButton);
		expect(
			screen.getByRole("img", { name: /image 1 sur 3/i }),
		).toBeInTheDocument();
	});

	it("should paginate to the correct image on pagination dot click", async () => {
		const user = userEvent.setup();
		render(<ImagesGallery allImages={mockImages} startIndex={0} />);
		const paginationDot = screen.getByRole("button", {
			name: /aller à l'image 3/i,
		});
		await user.click(paginationDot);
		expect(
			screen.getByRole("img", { name: /image 3 sur 3/i }),
		).toBeInTheDocument();
	});
});
