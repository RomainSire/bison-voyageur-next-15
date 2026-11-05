import { render, screen } from "@testing-library/react";
import MainHero from "./MainHero";

test("should render the image", () => {
	render(<MainHero />);
	const image = screen.getByAltText(
		"Logo de Bison Voyageur: un portrait de bison stylisé",
	);
	expect(image).toBeInTheDocument();
});

test("should render the text as a heading", () => {
	render(<MainHero />);
	const heading = screen.getByRole("heading", { name: /Bison Voyageur/i });
	expect(heading).toBeInTheDocument();
});
