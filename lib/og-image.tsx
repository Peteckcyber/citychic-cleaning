import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt =
  "CityChic Cleaning Services, post-construction and deep cleaning in Lagos";

/** Branded share card, generated at build time for Open Graph and Twitter. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#232D84",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, opacity: 0.8 }}>
          CITYCHIC CLEANING SERVICES
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
            Post-Construction and Deep Cleaning in Lagos
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, opacity: 0.85 }}>
            Cleaning you can count on.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            opacity: 0.8,
          }}
        >
          <div style={{ display: "flex" }}>{company.rcNumber}</div>
          <div style={{ display: "flex" }}>{company.phones[0].display}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
