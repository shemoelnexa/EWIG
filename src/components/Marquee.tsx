"use client";

const items = [
  "PROPERTY MANAGEMENT",
  "LEASING & SALES",
  "24/7 MAINTENANCE",
  "RESIDENTIAL",
  "COMMERCIAL",
  "ABU DHABI",
  "DUBAI",
  "AL AIN",
  "SHARJAH",
];

function MarqueeSet() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span>{item}</span>
          <span
            style={{
              margin: "0 24px",
              fontSize: 14,
              lineHeight: 1,
              color: "#cee002",
            }}
          >
            ·
          </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      style={{
        background: "var(--color-black, #000)",
        padding: "20px 0",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: "marquee-scroll 40s linear infinite",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  );
}
