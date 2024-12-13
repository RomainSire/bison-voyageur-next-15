import Link from "next/link";
import style from "./Header.module.css";

type HeaderProps = Readonly<{
	className?: string;
}>;

export default function Header({ className }: HeaderProps) {
	return (
		<nav className={`${className} ${style.nav}`}>
			<ul className={style.navList}>
				<li>
					<Link href="/" className={style.links}>
						Bison Voyageur
					</Link>
				</li>
				<li>
					<Link href="/menu" className={style.links}>
						Menu
					</Link>
				</li>
			</ul>
		</nav>
	);
}
