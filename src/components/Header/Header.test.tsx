import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
	it("renders the navigation links", () => {
		render(<Header />);

		const homeLink = screen.getByRole("link", { name: /Bison Voyageur/i });
		const menuLink = screen.getByRole("link", { name: /Menu/i });

		expect(homeLink).toBeInTheDocument();
		expect(menuLink).toBeInTheDocument();
	});
});
