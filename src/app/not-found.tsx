"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import style from "./not-found.module.css";

const MotionLink = motion.create(Link);

export default function NotFound() {
	return (
		<section className={style.wrapper}>
			<motion.div
				className={style.content}
				initial={{ x: -200, opacity: 0, rotate: -20 }}
				animate={{
					x: 0,
					opacity: 1,
					rotate: 0,
				}}
			>
				<Image
					src={"/404.webp"}
					alt="Une illustration de bison perdu dans la steppe, avec un vieux panneau en bois indiquant '404'"
					width={500}
					height={500}
					className={style.image}
					priority={true}
				/>
				<div>
					<h1>La page que vous cherchez n&apos;existe pas !</h1>
					<MotionLink
						href="/menu"
						className={style.link}
						whileHover={{ scale: 1.1, x: 25 }}
						whileTap={{ scale: 0.95, x: 0 }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path d="M196,88a27.86,27.86,0,0,0-13.35,3.39A28,28,0,0,0,144,74.7V44a28,28,0,0,0-56,0v80l-3.82-6.13A28,28,0,0,0,35.73,146l4.67,8.23C74.81,214.89,89.05,240,136,240a88.1,88.1,0,0,0,88-88V116A28,28,0,0,0,196,88Zm12,64a72.08,72.08,0,0,1-72,72c-37.63,0-47.84-18-81.68-77.68l-4.69-8.27,0-.05A12,12,0,0,1,54,121.61a11.88,11.88,0,0,1,6-1.6,12,12,0,0,1,10.41,6,1.76,1.76,0,0,0,.14.23l18.67,30A8,8,0,0,0,104,152V44a12,12,0,0,1,24,0v68a8,8,0,0,0,16,0V100a12,12,0,0,1,24,0v20a8,8,0,0,0,16,0v-4a12,12,0,0,1,24,0Z"></path>
						</svg>
						Aller au menu général
					</MotionLink>
				</div>
			</motion.div>
		</section>
	);
}
