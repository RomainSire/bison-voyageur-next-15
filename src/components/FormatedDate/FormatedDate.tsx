import style from "./FormatedDate.module.css";

type FormatedDateProps = Readonly<{
	date: string;
	className?: string;
}>;

/**
 * Base component to format and display a date
 */
export default function FormatedDate({ date, className }: FormatedDateProps) {
	const formatedDate = new Intl.DateTimeFormat("fr", {
		dateStyle: "full",
	}).format(new Date(date));

	return (
		<time className={`${style.time} ${className ?? ""}`}>{formatedDate}</time>
	);
}
