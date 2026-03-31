"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotatingSquare, GradientOrb, CornerBrackets } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const amenities = ["EV Charging", "Ample Parking", "F&B", "Retail"];

function WordReveal({
  text,
  className,
  style,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={className}
      style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
      data-word-reveal
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ overflow: "hidden", display: "inline-block" }}
        >
          <span
            className="word-inner"
            style={{
              display: "inline-block",
              transform: "translateY(110%)",
              willChange: "transform",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Deep parallax on background image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Word-by-word heading reveal
      const headingWords = contentRef.current?.querySelectorAll(
        "[data-word-reveal] .word-inner"
      );
      if (headingWords?.length) {
        gsap.to(headingWords, {
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none none",
          },
        });
      }

      // Content elements stagger from bottom
      const contentEls = contentRef.current?.querySelectorAll(".showcase-content-item");
      if (contentEls?.length) {
        gsap.fromTo(
          contentEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
            },
            delay: 0.4,
          }
        );
      }

      // Amenity labels stagger from right
      const amenityEls = amenitiesRef.current?.querySelectorAll(".amenity-label");
      if (amenityEls?.length) {
        gsap.fromTo(
          amenityEls,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              toggleActions: "play none none none",
            },
            delay: 0.6,
          }
        );
      }

      // Horizontal line draws across on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--color-black)",
      }}
    >
      {/* ── Decorative graphics ── */}
      <RotatingSquare size={200} color="rgba(255,255,255,0.04)" speed={40} style={{ top: "15%", right: "8%" }} />
      <GradientOrb size={500} color="rgba(206,224,2,0.04)" style={{ top: "-100px", left: "-200px" }} />
      <CornerBrackets size={60} color="rgba(255,255,255,0.08)" />

      {/* Background image with parallax */}
      <div style={{ position: "absolute", inset: "-10% 0", overflow: "hidden" }}>
        <img
          ref={imageRef}
          src="/images/flagship.jpg"
          alt="The Square Plaza"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.35,
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(11,16,18,0.9) 100%)",
          }}
        />
      </div>

      {/* Horizontal line that draws on scroll */}
      <div
        style={{
          position: "absolute",
          bottom: "35%",
          left: 0,
          right: 0,
          height: "1px",
          zIndex: 1,
        }}
      >
        <div
          ref={lineRef}
          style={{
            height: "1px",
            width: "0%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>

      {/* Content at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "80px 60px",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Left content */}
        <div
          ref={contentRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "600px",
          }}
        >
          <span
            className="label showcase-content-item"
            style={{ color: "rgba(255,255,255,0.5)", opacity: 0 }}
          >
            Flagship Property
          </span>
          <WordReveal
            text="The Square Plaza"
            className="heading-xl"
            style={{ color: "white" }}
            as="h2"
          />
          <p
            className="body-lg showcase-content-item"
            style={{ color: "rgba(255,255,255,0.55)", opacity: 0 }}
          >
            Baniyas, Abu Dhabi
          </p>
          <p
            className="body-md showcase-content-item"
            style={{
              color: "rgba(255,255,255,0.65)",
              maxWidth: "480px",
              opacity: 0,
            }}
          >
            A premier shopping destination offering restaurants, retail, and
            more under one roof.
          </p>
          <div className="showcase-content-item" style={{ marginTop: "8px", opacity: 0 }}>
            <a href="#" className="btn btn-light">
              Explore property
            </a>
          </div>
        </div>

        {/* Right amenities */}
        <div
          ref={amenitiesRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          {amenities.map((item) => (
            <span
              key={item}
              className="label-sm amenity-label"
              style={{ color: "rgba(255,255,255,0.45)", opacity: 0 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
