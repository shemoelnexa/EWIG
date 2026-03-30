"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotatingSquare, GradientOrb } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote:
      "East & West has consistently delivered exceptional property management services. Their commitment to quality and tenant satisfaction is unmatched in the region.",
    name: "Property Owner",
    role: "Abu Dhabi",
  },
  {
    quote:
      "The team's professionalism and attention to detail have made our experience seamless. From maintenance to leasing, every aspect is handled with excellence.",
    name: "Commercial Tenant",
    role: "Dubai",
  },
  {
    quote:
      "A truly world-class real estate group. Their innovative approach and dedication to sustainability set them apart in the UAE market.",
    name: "Investment Partner",
    role: "UAE",
  },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  // Build word spans for a quote
  const renderWords = useCallback((text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        style={{ overflow: "hidden", display: "inline-block" }}
      >
        <span
          className="review-word"
          style={{
            display: "inline-block",
            transform: "translateY(110%)",
            willChange: "transform",
          }}
        >
          {word}
        </span>
      </span>
    ));
  }, []);

  // Initial scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Static gradient background
      if (gradientRef.current) {
        gradientRef.current.style.background = "#212325";
      }

      // Entrance animation for the first quote
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (hasEnteredRef.current) return;
          hasEnteredRef.current = true;

          // Label fade in
          const label = sectionRef.current?.querySelector(".reviews-label");
          if (label) {
            gsap.fromTo(
              label,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
            );
          }

          // Word-by-word reveal of the first quote
          const words =
            quoteContainerRef.current?.querySelectorAll(".review-word");
          if (words?.length) {
            gsap.to(words, {
              y: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.025,
              delay: 0.2,
            });
          }

          // Author info
          const authorEls =
            quoteContainerRef.current?.querySelectorAll(".author-info");
          if (authorEls?.length) {
            gsap.fromTo(
              authorEls,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.08,
                delay: 0.8,
              }
            );
          }

          // Nav buttons
          if (prevBtnRef.current && nextBtnRef.current) {
            gsap.fromTo(
              [prevBtnRef.current, nextBtnRef.current],
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power4.out",
                stagger: 0.08,
                delay: 1,
              }
            );
          }

          // Certs
          if (certsRef.current) {
            const certEls = certsRef.current.querySelectorAll(".cert-badge");
            gsap.fromTo(
              certEls,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power4.out",
                stagger: 0.1,
                delay: 1.2,
              }
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Review transition animation
  const animateToReview = useCallback(
    (newIndex: number) => {
      if (isAnimating || newIndex === activeIndex) return;
      setIsAnimating(true);

      const container = quoteContainerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveIndex(newIndex);
          setIsAnimating(false);
        },
      });

      // Outgoing: fade out + move up
      const currentWords = container.querySelectorAll(".review-word");
      const currentAuthor = container.querySelectorAll(".author-info");

      tl.to(currentWords, {
        y: "-110%",
        duration: 0.5,
        ease: "power4.in",
        stagger: 0.01,
      });

      tl.to(
        currentAuthor,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power4.in",
        },
        "<0.1"
      );

      // Set new content then animate in
      tl.call(() => {
        setActiveIndex(newIndex);
      });

      // Small delay for React to re-render, then animate in
      tl.add(() => {
          const newWords = container.querySelectorAll(".review-word");
          const newAuthor = container.querySelectorAll(".author-info");

          gsap.set(newWords, { y: "110%" });
          gsap.set(newAuthor, { opacity: 0, y: 20 });

          gsap.to(newWords, {
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.02,
          });

          gsap.to(newAuthor, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power4.out",
            stagger: 0.06,
            delay: 0.3,
          });
        }, "+=0.05");
    },
    [activeIndex, isAnimating]
  );

  const prev = () => {
    const newIndex = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1;
    animateToReview(newIndex);
  };

  const next = () => {
    const newIndex = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1;
    animateToReview(newIndex);
  };

  const review = reviews[activeIndex];

  return (
    <section ref={sectionRef} className="section-dark" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── Decorative graphics ── */}
      <RotatingSquare size={100} color="rgba(255,255,255,0.03)" speed={50} style={{ top: "60px", right: "80px" }} />
      <GradientOrb size={400} color="rgba(206,224,2,0.03)" style={{ bottom: "-150px", right: "-100px" }} />

      {/* Gradient background that shifts on scroll */}
      <div
        ref={gradientRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#212325",
          zIndex: 0,
        }}
      />

      <div style={{ padding: "120px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          {/* Label */}
          <div style={{ width: "140px", flexShrink: 0 }}>
            <span
              className="label reviews-label"
              style={{ color: "rgba(255,255,255,0.45)", opacity: 0 }}
            >
              Client Stories
            </span>
          </div>

          {/* Carousel */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            {/* Active review */}
            <div
              ref={quoteContainerRef}
              style={{ position: "relative", minHeight: "200px" }}
            >
              <div>
                <p
                  className="heading-md"
                  style={{
                    color: "white",
                    lineHeight: 1.3,
                    maxWidth: "700px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0 0.3em",
                  }}
                >
                  {renderWords(`\u201C${review.quote}\u201D`)}
                </p>
                <div style={{ marginTop: "32px" }}>
                  <span
                    className="label author-info"
                    style={{ color: "white" }}
                  >
                    {review.name}
                  </span>
                  <span
                    className="label-sm author-info"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    {review.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "40px",
              }}
            >
              <button
                ref={prevBtnRef}
                onClick={prev}
                disabled={isAnimating}
                className="review-nav-btn"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "border-color 0.3s, transform 0.3s cubic-bezier(.165,.84,.44,1)",
                  opacity: 0,
                }}
                aria-label="Previous"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
              </button>
              <button
                ref={nextBtnRef}
                onClick={next}
                disabled={isAnimating}
                className="review-nav-btn"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition:
                    "border-color 0.3s, transform 0.3s cubic-bezier(.165,.84,.44,1)",
                  opacity: 0,
                }}
                aria-label="Next"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>

            {/* Certifications */}
            <div
              ref={certsRef}
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "60px",
                flexWrap: "wrap",
              }}
            >
              <span
                className="label-sm cert-badge"
                style={{ color: "rgba(255,255,255,0.35)", opacity: 0 }}
              >
                ISO 9001:2015 Certified
              </span>
              <span
                className="label-sm cert-badge"
                style={{ color: "rgba(255,255,255,0.35)", opacity: 0 }}
              >
                World Realty Congress Silver Award 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .review-nav-btn:hover {
          border-color: rgba(255,255,255,0.5) !important;
          transform: scale(1.1);
        }
        .review-nav-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </section>
  );
}
