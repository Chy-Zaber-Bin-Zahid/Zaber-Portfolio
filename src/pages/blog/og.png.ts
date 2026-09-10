import type { APIRoute } from "astro";
import { pngResponse, renderOgImage } from "@/lib/og";

export const GET: APIRoute = async () =>
  pngResponse(
    await renderOgImage({
      title: "Blog",
      description: "Thoughts on software development, life, and more.",
    })
  );
