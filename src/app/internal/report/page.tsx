"use client";

import { useState } from "react";

export default function ReportGate() {
  const [code, setCode] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState(false);

  const ACCESS_CODE = "ewig2026";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setGranted(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (granted) {
    return (
      <iframe
        src="/internal-report.html"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
        }}
        title="Project Report"
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1012",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "48px",
          maxWidth: "380px",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#cee002",
          }}
        >
          Restricted Access
        </span>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Project Report
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Enter the access code to view the project report.
        </p>

        <input
          type="password"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          placeholder="Access code"
          autoFocus
          style={{
            width: "100%",
            padding: "14px 18px",
            background: "rgba(255,255,255,0.06)",
            border: error
              ? "1px solid rgba(255,80,80,0.5)"
              : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
            color: "white",
            fontSize: "14px",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.1em",
            outline: "none",
            textAlign: "center",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = "rgba(206,224,2,0.4)";
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        />

        {error && (
          <span style={{ fontSize: "12px", color: "rgba(255,80,80,0.8)" }}>
            Invalid access code
          </span>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#cee002",
            color: "#0b1012",
            border: "none",
            borderRadius: "4px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View Report
        </button>
      </form>
    </div>
  );
}
