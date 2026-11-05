import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FullScreenModal from "./FullScreenModal";

describe("FullScreenModal Component", () => {
	const onClose = jest.fn();

	beforeEach(() => {
		onClose.mockClear();
	});
	beforeAll(() => {
		/**
		 * JSDOM does not support the dialog element, so we need to mock it
		 */
		HTMLDialogElement.prototype.show = jest.fn(function mock(
			this: HTMLDialogElement,
		) {
			this.open = true;
		});

		HTMLDialogElement.prototype.showModal = jest.fn(function mock(
			this: HTMLDialogElement,
		) {
			this.open = true;
		});

		HTMLDialogElement.prototype.close = jest.fn(function mock(
			this: HTMLDialogElement,
		) {
			this.open = false;
		});
	});

	test("renders correctly when isOpen is true", () => {
		render(
			<FullScreenModal
				isOpen={true}
				onClose={onClose}
				accessibilityTitle="Modal"
			>
				<div>Modal Content</div>
			</FullScreenModal>,
		);
		expect(screen.queryByText("Modal Content")).toBeInTheDocument();
	});

	test("does not render when isOpen is false", () => {
		render(
			<FullScreenModal
				isOpen={false}
				onClose={onClose}
				accessibilityTitle="Modal"
			>
				<div>Modal Content</div>
			</FullScreenModal>,
		);

		expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
	});

	test("calls onClose when close button is clicked", async () => {
		const user = userEvent.setup();
		render(
			<FullScreenModal
				isOpen={true}
				onClose={onClose}
				accessibilityTitle="Modal"
			>
				<div>Modal Content</div>
			</FullScreenModal>,
		);

		await user.click(screen.getByRole("button"));

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
