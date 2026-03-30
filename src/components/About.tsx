"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotGrid, SectionNumber } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

/* ── Stats data ── */
const stats = [
  { number: 30, suffix: "+", label: "Years" },
  { number: 20, suffix: "+", label: "Properties" },
  { number: 4, suffix: "", label: "Emirates" },
];

/* ── helper: split text into word spans with overflow-hidden masks ── */
function SplitWords({
  text,
  className,
  wordClass,
  style,
}: {
  text: string;
  className?: string;
  wordClass: string;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            overflow: "hidden",
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <span
            className={wordClass}
            style={{
              display: "inline-block",
              willChange: "transform",
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ─────────────────────────────────────
         1. "ABOUT" label – slide up + fade
         ───────────────────────────────────── */
      if (labelRef.current) {
        gsap.set(labelRef.current, { y: 20, opacity: 0 });
        gsap.to(labelRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 75%",
          },
        });
      }

      /* ─────────────────────────────────────
         2. Heading – word-by-word reveal
         ───────────────────────────────────── */
      const headingWords =
        sectionRef.current?.querySelectorAll(".about-heading-word");
      if (headingWords?.length) {
        gsap.set(headingWords, { yPercent: 105 });
        ScrollTrigger.create({
          trigger: headingWords[0]?.closest("h2"),
          start: "top 75%",
          onEnter: () => {
            gsap.to(headingWords, {
              yPercent: 0,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.04,
            });
          },
        });
      }

      /* ─────────────────────────────────────
         3. Body text – fade + slide up
         ───────────────────────────────────── */
      if (bodyRef.current) {
        gsap.set(bodyRef.current, { y: 40, opacity: 0 });
        gsap.to(bodyRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 75%",
          },
        });
      }

      /* ─────────────────────────────────────
         4. Image – clipPath reveal + parallax
         ───────────────────────────────────── */
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, {
          clipPath: "inset(100% 0 0 0)",
        });

        gsap.to(imageWrapRef.current, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 75%",
          },
        });
      }

      /* Image parallax – image moves slower than scroll */
      if (imageRef.current && imageWrapRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      /* ─────────────────────────────────────
         5. Button – fade in
         ───────────────────────────────────── */
      if (btnRef.current) {
        gsap.set(btnRef.current, { y: 20, opacity: 0 });
        gsap.to(btnRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 85%",
          },
        });
      }

      /* ─────────────────────────────────────
         6. Stats – staggered entrance + counter
         ───────────────────────────────────── */
      if (statsRef.current) {
        const statItems =
          statsRef.current.querySelectorAll(".about-stat");
        const numberEls =
          statsRef.current.querySelectorAll<HTMLSpanElement>(
            ".about-stat-number"
          );

        gsap.set(statItems, { y: 30, opacity: 0 });

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 75%",
          onEnter: () => {
            /* Fade in each stat */
            gsap.to(statItems, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.15,
            });

            /* Counter animation for numbers */
            numberEls.forEach((el) => {
              const target = parseInt(el.dataset.target || "0", 10);
              const suffix = el.dataset.suffix || "";
              const obj = { val: 0 };

              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power3.out",
                delay: 0.2,
                onUpdate: () => {
                  el.textContent = Math.round(obj.val) + suffix;
                },
              });
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-border"
      style={{
        position: "relative",
        background: "#f3f0ec",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* ── Decorative graphics ── */}
      <DotGrid cols={6} rows={10} gap={20} color="rgba(0,0,0,0.04)" style={{ top: "80px", right: "40px" }} />
      <SectionNumber number="01" style={{ top: "60px", right: "60px" }} />

      <div
        style={{
          padding: "140px 60px",
        }}
      >
        {/* ── Desktop layout ── */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* ── Left: Label ── */}
          <div style={{ width: 140, flexShrink: 0 }}>
            <span
              ref={labelRef}
              className="label text-muted"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "0.7rem",
                color: "rgba(0,0,0,0.4)",
              }}
            >
              About
            </span>
          </div>

          {/* ── Center: Content ── */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {/* Heading with word-split reveal */}
            <h2
              className="heading-lg"
              style={{ lineHeight: 1.15, color: "#212325" }}
            >
              <SplitWords
                text="A legacy of excellence in real estate since 1993"
                wordClass="about-heading-word"
              />
            </h2>

            {/* Body text */}
            <p
              ref={bodyRef}
              className="body-lg text-soft"
              style={{
                marginTop: 32,
                maxWidth: 640,
                lineHeight: 1.7,
                color: "rgba(33,35,37,0.65)",
              }}
            >
              East &amp; West International Group is a leading integrated Real
              Estate Group in the UAE. We constantly challenge tradition to
              better integrate versatile market conditions, delivering
              comprehensive, reliable, and cost-effective property management
              services that enhance the value of our clients&apos; real estate
              assets.
            </p>

            {/* ── Image with clipPath reveal ── */}
            <div
              ref={imageWrapRef}
              style={{
                marginTop: 48,
                overflow: "hidden",
                borderRadius: 3,
                aspectRatio: "16 / 9",
                willChange: "clip-path",
              }}
            >
              <img
                ref={imageRef}
                src="/images/dusit-thani.jpg"
                alt="Dusit Thani property"
                style={{
                  width: "100%",
                  height: "120%",
                  objectFit: "cover",
                  objectPosition: "center",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Button */}
            <div ref={btnRef} style={{ marginTop: 40 }}>
              <a href="#" className="btn btn-dark">
                Discover our story
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Stats ── */}
          <div
            ref={statsRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 36,
              minWidth: 100,
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span
                  className="heading-md about-stat-number"
                  data-target={stat.number}
                  data-suffix={stat.suffix}
                  style={{ color: "#212325" }}
                >
                  0{stat.suffix}
                </span>
                <span
                  className="label-sm text-muted"
                  style={{
                    display: "block",
                    marginTop: 6,
                    color: "rgba(0,0,0,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: "0.65rem",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
