import { getAllTags, getLastPosts } from "@/actions/postsActions";
import directus from "@/lib/directus";
import Image from "next/image";
import Link from "next/link";
import style from "./page.module.css";

export default async function Home() {
	const lastPosts = await getLastPosts();
	const allTags = await getAllTags();

	return (
		<div className={style.page}>
			<nav>
				<h1>Tags</h1>
				<ul>
					{allTags.map((tag) => (
						<li key={tag}>
							<Link href={`/tag/${encodeURIComponent(tag)}`}>{tag}</Link>
						</li>
					))}
				</ul>
			</nav>
			<main className={style.main}>
				{lastPosts.map((post) => (
					<Link href={`/post/${post.slug}`} key={post.slug}>
						<article style={{ maxWidth: "400px", marginBottom: "5rem" }}>
							<h2>{post.title}</h2>
							<p>{post.date}</p>
							<Image
								src={`${directus.url}assets/${post.mainPicture.filename_disk}`}
								alt={post.mainPicture.title ?? ""}
								width={post.mainPicture.width ?? undefined}
								height={post.mainPicture.height ?? undefined}
							/>
						</article>
					</Link>
				))}
			</main>
		</div>
	);
}
