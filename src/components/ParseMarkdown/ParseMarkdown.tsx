import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import style from "./ParseMarkdown.module.css";

type ParseContentType = {
	markdown: string;
};

export default function ParseMarkdown({ markdown }: ParseContentType) {
	const components: Partial<Components> = {
		img: ({ src, alt }) => {
			return (
				<Image
					className={style.images}
					src={src ?? ""}
					alt={alt ?? ""}
					width={400}
					height={400}
				/>
			);
		},
		p: ({ children, ...props }) => {
			return (
				<p className={style.paragraph} {...props}>
					{children}
				</p>
			);
		},
	};

	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
}
