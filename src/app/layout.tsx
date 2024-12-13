import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

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
			<body className={`${sriracha.variable}`}>{children}</body>
		</html>
	);
}
