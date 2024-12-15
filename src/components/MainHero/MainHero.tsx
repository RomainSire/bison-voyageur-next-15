import Image from "next/image";
import style from "./MainHero.module.css";

type MainHeroProps = Readonly<{
	className?: string;
}>;

export default function MainHero({ className }: MainHeroProps) {
	return (
		<section className={`${style.wrapper} ${className}`}>
			<Image
				src={"/logo.svg"}
				alt="Logo de Bison Voyageur: un portrait de bison stylisé"
				width={200}
				height={200}
				className={style.image}
			/>
			<h1 className={style.title}>
				Bison
				<br />
				Voyageur
			</h1>
		</section>
	);
}
