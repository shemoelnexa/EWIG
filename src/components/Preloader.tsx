"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [showDarkOverlay, setShowDarkOverlay] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const overlayTimer = setTimeout(() => {
      setShowDarkOverlay(true);
    }, 1400);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 2200);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <>
      <div className={`preloader${isDone ? " is-done" : ""}`}>
        <div className="flex flex-col items-center gap-[2rem]">
          <div className="cube-wrapper">
            <div className="cube">
              <div className="cube-face" />
              <div className="cube-face" />
              <div className="cube-face" />
              <div className="cube-face" />
              <div className="cube-face" />
              <div className="cube-face" />
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-black)",
              opacity: 0.4,
            }}
          >
            East &amp; West
          </span>
        </div>
      </div>
      <div className={`dark-overlay${showDarkOverlay ? " is-active" : ""}`} />
    </>
  );
}
