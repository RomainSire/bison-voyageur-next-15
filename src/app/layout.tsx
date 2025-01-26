import Header from "@/components/Header/Header";
import { LayoutTransition } from "@/components/LayoutTransition/LayoutTransition";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import style from "./layout.module.css";

const sriracha = localFont({
	src: "../styles/fonts/Sriracha-Regular.ttf",
	variable: "--font-sriracha",
	weight: "400",
});

export const metadata: Metadata = {
	title: "Bison Voyageur",
	description: "Blog de mon voyage autour du monde",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={`${sriracha.variable} ${style.body}`}>
				<LayoutTransition
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Header className={style.header} />
					<main className={style.main}>{children}</main>
				</LayoutTransition>
			</body>
		</html>
	);
}
