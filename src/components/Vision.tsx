"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiagonalLines, CrossMark } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const visionText =
  "To be a world class property management & real estate company in the UAE and the region, recognized for our commitment to exceptional service, innovative solutions, and sustainable practices.";

const missionText =
  "To provide comprehensive, reliable, and cost-effective property management services that enhance the value and performance of our clients' real estate assets.";

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Label reveal
      const label = section.querySelector(".vision-label");
      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 20 },
          {
            opacity: 0.45,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: label, start: "top 88%" },
          }
        );
      }

      // Vision text — word by word reveal
      const visionWords = section.querySelectorAll(".vision-word");
      if (visionWords.length) {
        gsap.fromTo(
          visionWords,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: section.querySelector(".vision-text"),
              start: "top 80%",
            },
          }
        );
      }

      // Horizontal line
      const line = section.querySelector(".vision-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 88%" },
          }
        );
      }

      // Mission text — word by word reveal (faster)
      const missionWords = section.querySelectorAll(".mission-word");
      if (missionWords.length) {
        gsap.fromTo(
          missionWords,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.02,
            scrollTrigger: {
              trigger: section.querySelector(".mission-text"),
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = (text: string, className: string) =>
    text.split(" ").map((word, i) => (
      <span
        key={`${className}-${i}`}
        style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
      >
        <span
          className={className}
          style={{
            display: "inline-block",
            willChange: "transform, opacity",
          }}
        >
          {word}
        </span>
        {/* Preserve space between words */}
        <span style={{ display: "inline", width: "0.3em" }}>&nbsp;</span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="section section-border"
      style={{ position: "relative", background: "var(--color-cream)" }}
    >
      {/* ── Decorative graphics ── */}
      <DiagonalLines width={300} height={300} color="rgba(0,0,0,0.03)" style={{ top: 0, right: 0 }} />
      <CrossMark size={20} color="rgba(0,0,0,0.08)" style={{ top: "50%", left: "30px" }} />

      <div style={{ padding: "160px 60px" }}>
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          {/* Label */}
          <div style={{ width: "140px", flexShrink: 0 }}>
            <span
              className="label vision-label"
              style={{ opacity: 0 }}
            >
              Our Vision
            </span>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            {/* Vision quote */}
            <div className="vision-text">
              <p
                className="heading-md"
                style={{
                  lineHeight: 1.3,
                  maxWidth: "900px",
                  fontWeight: 600,
                }}
              >
                {renderWords(visionText, "vision-word")}
              </p>
            </div>

            {/* Divider line */}
            <div
              className="vision-line"
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(11, 16, 18, 0.15)",
                marginTop: "56px",
                marginBottom: "48px",
                transformOrigin: "left center",
              }}
            />

            {/* Mission text */}
            <div className="mission-text">
              <p
                className="body-lg text-soft"
                style={{ maxWidth: "720px", lineHeight: 1.6 }}
              >
                {renderWords(missionText, "mission-word")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
