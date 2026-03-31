"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotatingSquare, CircleOutline, CrossMark } from "@/components/Graphics";
import PropertySearch from "@/components/PropertySearch";

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text, className, wordClass }: { text: string; className?: string; wordClass: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "top" }}>
          <span className={wordClass} style={{ display: "inline-block", willChange: "transform" }}>
            {word}
          </span>
          {i < words.length - 1 && <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image cinematic reveal
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, { clipPath: "inset(15% 15% 15% 15%)" });
        gsap.to(imageWrapRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "power4.out",
          delay: 1.5,
        });
      }

      // Background image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Top bar fade in
      if (topBarRef.current) {
        gsap.set(topBarRef.current, { opacity: 0, y: -20 });
        gsap.to(topBarRef.current, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 2.0,
        });
      }

      // Main heading word-by-word reveal
      const mainWords = sectionRef.current?.querySelectorAll(".hero-main-word");
      if (mainWords?.length) {
        gsap.set(mainWords, { yPercent: 110 });
        gsap.to(mainWords, {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.06,
          delay: 2.2,
        });
      }

      // Search bar fade in
      if (searchBarRef.current) {
        gsap.set(searchBarRef.current, { opacity: 0, y: 25 });
        gsap.to(searchBarRef.current, {
          opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 2.8,
        });
      }

      // Parallax departure on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -50, opacity: 0, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 0.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#212325" }}
    >
      {/* Decorative graphics */}
      <RotatingSquare size={160} color="rgba(255,255,255,0.04)" style={{ top: "15%", right: "10%", zIndex: 2 }} />
      <CircleOutline size={300} color="rgba(255,255,255,0.03)" style={{ bottom: "-100px", left: "-100px", zIndex: 2 }} />
      <CrossMark size={20} color="rgba(255,255,255,0.1)" style={{ top: "20%", left: "8%", zIndex: 2 }} />
      <CrossMark size={16} color="rgba(255,255,255,0.08)" style={{ bottom: "25%", right: "15%", zIndex: 2 }} />

      {/* Background image with clip-path reveal */}
      <div
        ref={imageWrapRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, willChange: "clip-path" }}
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "130%",
            objectFit: "cover", objectPosition: "center", opacity: 0.45, willChange: "transform",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(33,35,37,0.2) 0%, rgba(33,35,37,0.3) 50%, rgba(33,35,37,0.8) 100%)",
        }}
      />

      {/* ── Top header bar ── */}
      <div
        ref={topBarRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          zIndex: 10,
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left spacer */}
        <div style={{ width: "160px" }} />

        {/* Center: Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/logo.png"
            alt="East & West International Group"
            style={{
              height: "40px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </a>

        {/* Right: CTA */}
        <a
          href="#contact"
          className="link-underline"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "white",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Get in Touch
        </a>
      </div>

      {/* ── Content: heading + search bar ── */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          bottom: "136px",
          left: 0, right: 0,
          zIndex: 5,
          padding: "0 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "white",
            maxWidth: "900px",
            textAlign: "center",
            letterSpacing: "-0.01em",
            marginBottom: "40px",
          }}
        >
          <SplitWords
            text="Exceptional properties for those who live with vision."
            wordClass="hero-main-word"
          />
        </h1>

        <div ref={searchBarRef} style={{ width: "100%", maxWidth: "1100px", opacity: 0 }}>
          <PropertySearch variant="dark" />
        </div>
      </div>
    </section>
  );
}
