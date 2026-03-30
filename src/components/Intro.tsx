"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headingText =
  "We bring real estate to life through trust and innovation. Chosen by clients who demand excellence, integrity, and care.";

function SplitWords({ text, wordClass }: { text: string; wordClass: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ overflow: "hidden", display: "inline-block", verticalAlign: "top" }}
        >
          <span
            className={wordClass}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {word}
          </span>
          {i < text.split(" ").length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: 16, opacity: 0 });
        gsap.to(labelRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        });
      }

      // Word-by-word heading reveal
      const words = sectionRef.current?.querySelectorAll(".intro-word");
      if (words?.length) {
        gsap.set(words, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(words, {
              yPercent: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.03,
            });
          },
        });
      }

      // Button fade in
      if (btnRef.current) {
        gsap.set(btnRef.current, { y: 20, opacity: 0 });
        gsap.to(btnRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: btnRef.current, start: "top 90%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-border"
      style={{
        position: "relative",
        background: "var(--color-cream)",
        padding: "140px 60px 160px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Label */}
        <span
          ref={labelRef}
          className="label"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "48px",
            color: "var(--color-black)",
            opacity: 0.7,
          }}
        >
          <span style={{ color: "var(--color-accent)", fontSize: "10px" }}>◆</span>
          About East &amp; West
        </span>

        {/* Large heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 5vw, 62px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--color-black)",
            maxWidth: "960px",
          }}
        >
          <SplitWords text={headingText} wordClass="intro-word" />
        </h2>

        {/* CTA Button */}
        <div ref={btnRef} style={{ marginTop: "48px" }}>
          <a
            href="#about"
            className="btn btn-dark"
            style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Who We Are
          </a>
        </div>
      </div>
    </section>
  );
}
