import { render, screen } from "@testing-library/react";
import FormatedDate from "./FormatedDate";

describe("FormatedDate", () => {
	it("should renders the correctly formatted date", () => {
		const date = "2013-06-03";
		render(<FormatedDate date={date} />);
		const expectedDate = "lundi 3 juin 2013";
		expect(screen.getByText(expectedDate)).toBeInTheDocument();
	});
	it("should renders the correctly formatted date with a full TZ date as input", () => {
		const date = "2013-06-03T00:00:00Z";
		render(<FormatedDate date={date} />);
		const expectedDate = "lundi 3 juin 2013";
		expect(screen.getByText(expectedDate)).toBeInTheDocument();
	});
});
