import sharp from "sharp";

import { renderOgImage } from "@/lib/og-image";
import { ogPages } from "@/lib/og-pages";

// Built once at export time into out/og/<key>.jpg. A real .jpg keeps previews small
// (WhatsApp drops images over about 300 KB) and correctly typed on static hosting.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogPages.map((page) => ({ image: `${page.key}.jpg` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[image]">) {
  const { image } = await params;
  const page = ogPages.find((candidate) => `${candidate.key}.jpg` === image);
  if (!page) return new Response("Not found", { status: 404 });

  const png = Buffer.from(await (await renderOgImage(page)).arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
