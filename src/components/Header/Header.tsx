"use client";
import { motion } from "motion/react";
import Link from "next/link";
import style from "./Header.module.css";

type HeaderProps = Readonly<{
	className?: string;
}>;

/**
 * Animated link component (with Motion)
 */
const MotionLink = motion(Link);

/**
 * Header component
 */
export default function Header({ className }: HeaderProps) {
	return (
		<nav className={`${className} ${style.nav}`}>
			<ul className={style.navList}>
				<li>
					<MotionLink
						href="/"
						className={style.links}
						whileHover={{ scale: 1.1, y: -5 }}
						whileTap={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 500 }}
					>
						Bison Voyageur
					</MotionLink>
				</li>
				<li>
					<MotionLink
						href="/menu"
						className={style.links}
						whileHover={{ scale: 1.1, y: -5 }}
						whileTap={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 500 }}
					>
						Menu
					</MotionLink>
				</li>
			</ul>
		</nav>
	);
}
