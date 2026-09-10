import type { APIRoute, GetStaticPaths } from "astro";
import { getSortedPosts, type Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { pngResponse, renderOgImage } from "@/lib/og";

export const getStaticPaths = (async () => {
  const posts = await getSortedPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: Post }> = async ({ props }) =>
  pngResponse(
    await renderOgImage({
      title: props.post.data.title,
      description: props.post.data.summary,
      eyebrow: formatDate(props.post.data.publishedAt),
    })
  );
