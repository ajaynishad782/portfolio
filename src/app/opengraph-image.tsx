import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.personal.name.replace(/\[|\]/g, "")} — ${portfolio.personal.title.replace(/\[|\]/g, "")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const name = portfolio.personal.name.replace(/\[|\]/g, "");
  const title = portfolio.personal.title.replace(/\[|\]/g, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0a0b",
        color: "#ededed",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: 28,
          color: "#818cf8",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
        {portfolio.personal.availability}
      </div>
      <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24 }}>{name}</div>
      <div style={{ fontSize: 44, color: "#818cf8", marginTop: 8 }}>
        {title}
      </div>
    </div>,
    size,
  );
}
