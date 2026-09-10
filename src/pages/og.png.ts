import type { APIRoute } from "astro";
import { DATA } from "@/data/resume";
import { pngResponse, renderOgImage } from "@/lib/og";

export const GET: APIRoute = async () =>
  pngResponse(
    await renderOgImage({ title: DATA.name, description: DATA.description })
  );
