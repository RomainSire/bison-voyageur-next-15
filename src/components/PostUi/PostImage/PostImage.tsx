import Image from "next/image";
import style from "./PostImage.module.css";

type PostImageProps = {
	src: string;
	alt: string;
};

export default function PostImage({ src, alt }: PostImageProps) {
	return (
		<Image
			className={style.image}
			src={src}
			alt={alt}
			width={500}
			height={500}
		/>
	);
}
