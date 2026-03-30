"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    document.body.style.cursor = "none";
    gsap.set([outer, inner], { xPercent: -50, yPercent: -50 });

    let mouseX = -100;
    let mouseY = -100;

    // Use quickTo for maximum performance — avoids creating new tweens every frame
    const outerX = gsap.quickTo(outer, "x", { duration: 0.45, ease: "power3.out" });
    const outerY = gsap.quickTo(outer, "y", { duration: 0.45, ease: "power3.out" });
    const innerX = gsap.quickTo(inner, "x", { duration: 0.12, ease: "power3.out" });
    const innerY = gsap.quickTo(inner, "y", { duration: 0.12, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      outerX(mouseX);
      outerY(mouseY);
      innerX(mouseX);
      innerY(mouseY);

      if (outer.style.opacity === "0") {
        gsap.to([outer, inner], { opacity: 1, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      gsap.to([outer, inner], { opacity: 0, duration: 0.3 });
    };

    const onMouseOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (target) {
        gsap.to(outer, { scale: 1.6, borderColor: "rgba(255,255,255,0.5)", duration: 0.3 });
      }
    };

    const onMouseOut = (e: Event) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (target) {
        gsap.to(outer, { scale: 1, borderColor: "rgba(255,255,255,0.2)", duration: 0.3 });
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          pointerEvents: "none",
          zIndex: 9990,
          opacity: 0,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#fff",
          pointerEvents: "none",
          zIndex: 9991,
          opacity: 0,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
