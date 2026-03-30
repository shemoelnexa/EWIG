"use client";

/* ─── Reusable graphic/decorative elements ─── */

/** Rotating square outline — slow infinite rotation */
export function RotatingSquare({
  size = 120,
  color = "rgba(255,255,255,0.06)",
  speed = 30,
  style,
}: {
  size?: number;
  color?: string;
  speed?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `1px solid ${color}`,
        position: "absolute",
        pointerEvents: "none",
        animation: `graphic-rotate ${speed}s linear infinite`,
        ...style,
      }}
    />
  );
}

/** Circle outline — pulsing or static */
export function CircleOutline({
  size = 200,
  color = "rgba(255,255,255,0.05)",
  pulse = false,
  style,
}: {
  size?: number;
  color?: string;
  pulse?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        position: "absolute",
        pointerEvents: "none",
        animation: pulse ? "graphic-pulse 4s ease-in-out infinite" : undefined,
        ...style,
      }}
    />
  );
}

/** Cross/plus mark */
export function CrossMark({
  size = 24,
  color = "rgba(0,0,0,0.1)",
  thickness = 1,
  style,
}: {
  size?: number;
  color?: string;
  thickness?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth={thickness} />
      <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth={thickness} />
    </svg>
  );
}

/** Dot grid pattern */
export function DotGrid({
  cols = 8,
  rows = 8,
  gap = 24,
  dotSize = 2,
  color = "rgba(0,0,0,0.08)",
  style,
}: {
  cols?: number;
  rows?: number;
  gap?: number;
  dotSize?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const width = (cols - 1) * gap + dotSize;
  const height = (rows - 1) * gap + dotSize;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * gap + dotSize / 2}
            cy={r * gap + dotSize / 2}
            r={dotSize / 2}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}

/** Diagonal lines pattern */
export function DiagonalLines({
  width = 200,
  height = 200,
  spacing = 16,
  color = "rgba(0,0,0,0.04)",
  style,
}: {
  width?: number;
  height?: number;
  spacing?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const lines = Math.ceil((width + height) / spacing);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      {Array.from({ length: lines }).map((_, i) => {
        const offset = i * spacing - height;
        return (
          <line
            key={i}
            x1={offset}
            y1={0}
            x2={offset + height}
            y2={height}
            stroke={color}
            strokeWidth={0.5}
          />
        );
      })}
    </svg>
  );
}

/** Corner brackets — decorative frame corners */
export function CornerBrackets({
  size = 40,
  color = "rgba(255,255,255,0.15)",
  thickness = 1,
  style,
}: {
  size?: number;
  color?: string;
  thickness?: number;
  style?: React.CSSProperties;
}) {
  const s = size;
  const arm = s * 0.4;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}>
      {/* Top-left */}
      <svg width={arm} height={arm} style={{ position: "absolute", top: 0, left: 0 }}>
        <polyline points={`0,${arm} 0,0 ${arm},0`} fill="none" stroke={color} strokeWidth={thickness} />
      </svg>
      {/* Top-right */}
      <svg width={arm} height={arm} style={{ position: "absolute", top: 0, right: 0 }}>
        <polyline points={`0,0 ${arm},0 ${arm},${arm}`} fill="none" stroke={color} strokeWidth={thickness} />
      </svg>
      {/* Bottom-left */}
      <svg width={arm} height={arm} style={{ position: "absolute", bottom: 0, left: 0 }}>
        <polyline points={`0,0 0,${arm} ${arm},${arm}`} fill="none" stroke={color} strokeWidth={thickness} />
      </svg>
      {/* Bottom-right */}
      <svg width={arm} height={arm} style={{ position: "absolute", bottom: 0, right: 0 }}>
        <polyline points={`${arm},0 ${arm},${arm} 0,${arm}`} fill="none" stroke={color} strokeWidth={thickness} />
      </svg>
    </div>
  );
}

/** Gradient orb — soft blurred circle */
export function GradientOrb({
  size = 400,
  color = "rgba(206,224,2,0.06)",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        position: "absolute",
        pointerEvents: "none",
        filter: "blur(60px)",
        ...style,
      }}
    />
  );
}

/** Horizontal rule with diamond center */
export function DiamondRule({
  width = "100%",
  color = "rgba(0,0,0,0.1)",
  style,
}: {
  width?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width,
        ...style,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: color }} />
      <div
        style={{
          width: 6,
          height: 6,
          background: color,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, height: "1px", background: color }} />
    </div>
  );
}

/** Floating number — large decorative section number */
export function SectionNumber({
  number,
  color = "rgba(0,0,0,0.03)",
  style,
}: {
  number: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(120px, 15vw, 220px)",
        fontWeight: 700,
        color,
        lineHeight: 1,
        position: "absolute",
        pointerEvents: "none",
        userSelect: "none",
        letterSpacing: "-0.05em",
        ...style,
      }}
    >
      {number}
    </span>
  );
}
