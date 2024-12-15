import { getLastPosts } from "@/actions/postsActions";
import FormatedDate from "@/components/FormatedDate/FormatedDate";
import MainHero from "@/components/MainHero/MainHero";
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
		<div className={style.wrapper}>
			<MainHero className={style.hero} />
			<section>
				{lastPosts.map((post) => {
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
								<FormatedDate date={post.date} className={style.cardDate} />
							</article>
						</Link>
					);
				})}
			</section>
		</div>
	);
}
