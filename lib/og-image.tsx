import { readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { ImageResponse } from "next/og";

import { company } from "@/data/company";

export const ogSize = { width: 1200, height: 630 };

const PHOTO_WIDTH = 480;
const root = process.cwd();

async function asDataUri(path: string, mime: string) {
  const data = await readFile(join(root, path), "base64");
  return `data:${mime};base64,${data}`;
}

type OgImageInput = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /**
   * A site photo path such as "/images/work/crew-team.webp". The share image uses the
   * JPEG crop of the same name in assets/og, because the renderer cannot read WebP.
   */
  photoSrc: string;
};

/**
 * Branded 1200x630 share card generated at build time: logo, page title and a real job photo.
 * Rendered by app/og/[image]/route.ts, which converts it to a small JPEG per page.
 */
export async function renderOgImage({ eyebrow, title, subtitle, photoSrc }: OgImageInput) {
  const photoName = basename(photoSrc, extname(photoSrc));
  const [photo, logo, regular, bold] = await Promise.all([
    asDataUri(`assets/og/${photoName}.jpg`, "image/jpeg"),
    asDataUri("public/brand/citychic-logo.png", "image/png"),
    readFile(join(root, "assets/fonts/plus-jakarta-sans-500.woff")),
    readFile(join(root, "assets/fonts/plus-jakarta-sans-800.woff")),
  ]);

  const titleSize = title.length > 40 ? 50 : title.length > 26 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#232D84",
          fontFamily: "Plus Jakarta Sans",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#FFFFFF",
              borderRadius: 16,
              padding: "12px 18px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={160} height={58} alt="" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1.35,
                opacity: 0.85,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", gap: 28, fontSize: 22, fontWeight: 500, opacity: 0.8 }}>
            <div style={{ display: "flex" }}>{company.siteUrl.replace("https://", "")}</div>
            <div style={{ display: "flex" }}>{company.phones[0].display}</div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          width={PHOTO_WIDTH}
          height={ogSize.height}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plus Jakarta Sans", data: regular, weight: 500, style: "normal" },
        { name: "Plus Jakarta Sans", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
