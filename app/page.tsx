import { getPosts } from "@/lib/posts";
import { MESSAGES } from "@/constants/messages";
import { PostBrowser } from "@/components/posts/post-browser";

export default async function Home() {
  const posts = await getPosts();

  const listItems = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    thumbnail: p.thumbnail,
    description: p.description,
    tags: p.tags,
  }));

  return (
    <>
      <div className="mx-auto w-full min-w-0 max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
        <section
          aria-labelledby="intro-heading"
          className="mb-10 sm:mb-16 lg:ml-56"
        >
          <h1
            id="intro-heading"
            className="max-w-2xl break-keep text-balance text-2xl font-medium leading-snug tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl"
          >
            {MESSAGES.HOME_INTRO_TITLE}
          </h1>
          <p className="mt-3 break-words text-base leading-relaxed text-neutral-500 dark:text-neutral-400 sm:break-keep">
            {MESSAGES.HOME_INTRO_DESCRIPTION}
          </p>
        </section>
        <PostBrowser posts={listItems} />
      </div>
    </>
  );
}
