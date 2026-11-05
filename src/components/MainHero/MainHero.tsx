"use client";

import { motion } from "motion/react";
import Image from "next/image";
import style from "./MainHero.module.css";

type MainHeroProps = Readonly<{
	className?: string;
}>;

/**
 * Animated Image component (with Motion)
 */
const MotionImage = motion.create(Image);

/**
 * Main hero title on the landing page
 */
export default function MainHero({ className }: MainHeroProps) {
	return (
		<section className={`${style.wrapper} ${className ?? ""}`}>
			<MotionImage
				src={"/logo.svg"}
				alt="Logo de Bison Voyageur: un portrait de bison stylisé"
				width={200}
				height={200}
				className={style.image}
				initial={{ x: -100, opacity: 0, rotate: -45 }}
				animate={{ x: 0, opacity: 1, rotate: 0 }}
			/>
			<motion.h1
				className={style.title}
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
			>
				Bison
				<br />
				Voyageur
			</motion.h1>
		</section>
	);
}
