import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";

type ParseContentType = {
	markdown: string;
};

export default function ParseMarkdown({ markdown }: ParseContentType) {
	const components: Partial<Components> = {
		img: ({ src, alt }) => {
			return <Image src={src ?? ""} alt={alt ?? ""} width={400} height={400} />;
		},
		p: ({ children, ...props }) => {
			return <p {...props}>{children}</p>;
		},
	};

	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
}
