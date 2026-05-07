import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Gökhan Gündüz — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#060b0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "52px" }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginBottom: 28,
            color: "#555",
          }}
        >
          <span style={{ color: "#00e5ff" }}>gokhangunduz.dev</span>
          <span>&nbsp;~&nbsp;❯&nbsp;</span>
          <span style={{ color: "#ccc" }}>whoami</span>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 84,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Gökhan Gündüz
        </div>

        <div
          style={{
            color: "#00e5ff",
            fontSize: 40,
            marginBottom: 52,
          }}
        >
          Full Stack Developer
        </div>

        <div style={{ color: "#2a3a4a", fontSize: 22 }}>
          React · Next.js · TypeScript · Node.js · Istanbul, Turkey
        </div>
      </div>
    ),
    { ...size },
  );
}
