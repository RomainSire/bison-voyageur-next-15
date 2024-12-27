import { render, screen } from "@testing-library/react";
import PostImage from "./PostImage";

describe("PostImage", () => {
	test("should render the image", () => {
		const src = "https://example.com/image.jpg";
		const alt = "Example Image";

		render(<PostImage src={src} alt={alt} />);

		expect(screen.getByAltText(alt)).toBeInTheDocument();
	});
});
