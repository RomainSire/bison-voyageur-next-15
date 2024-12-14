import { getLastPosts } from "@/actions/postsActions";
import directus from "@/lib/directus";
import { REVALIDATE_TIME } from "@/publicConfig";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;
/**
 * Home Page component
 */
export default async function Home() {
	const lastPosts = await getLastPosts();

	return (
		<section className={style.section}>
			<h1 className={style.title}>
				Bison
				<br />
				Voyageur
			</h1>
			{lastPosts.map((post) => {
				const date = new Intl.DateTimeFormat("fr", {
					dateStyle: "full",
				}).format(new Date(post.date));

				return (
					<Link
						href={`/post/${post.slug}`}
						key={post.slug}
						className={style.link}
					>
						<article>
							<Image
								src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
								alt={post.mainPicture.title ?? ""}
								width={post.mainPicture.width ?? undefined}
								height={post.mainPicture.height ?? undefined}
								className={style.cardImage}
							/>
							<h2 className={style.cardTitle}>{post.title}</h2>
							<p className={style.cardSubTitle}>{date}</p>
						</article>
					</Link>
				);
			})}
		</section>
	);
}
