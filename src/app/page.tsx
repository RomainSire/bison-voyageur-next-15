import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import MainHero from "@/components/MainHero/MainHero";
import PostPreviewList from "@/components/PostPreviewUi/PostPreviewList/PostPreviewList";
import { REVALIDATE_TIME } from "@/publicConfig";
import { getLastPosts } from "@/services/postService";
import style from "./page.module.css";

/**
 * Revalidate time in seconds
 */
export const revalidate = REVALIDATE_TIME;
/**
 * Home Page component
 */
export default async function Home() {
	const lastPosts = await getLastPosts(4);

	return (
		<div className={style.wrapper}>
			<MainHero className={style.hero} />
			<AnimatedTitle
				className={style.subtitle}
				type="h2"
				motionInitialDelay={0.2}
			>
				Derniers posts
			</AnimatedTitle>
			<PostPreviewList posts={lastPosts} motionInitialDelay={0.3} />
		</div>
	);
}
