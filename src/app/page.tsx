import { getLastPosts } from "@/actions/postsActions";
import MainHero from "@/components/MainHero/MainHero";
import PostPreview from "@/components/PostPreview/PostPreview";
import { REVALIDATE_TIME } from "@/publicConfig";
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
					return <PostPreview post={post} key={post.slug} />;
				})}
			</section>
		</div>
	);
}
