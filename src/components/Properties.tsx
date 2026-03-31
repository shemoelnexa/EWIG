"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionNumber, CircleOutline } from "@/components/Graphics";
import PropertySearch from "@/components/PropertySearch";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    name: "Dusit Thani Complex",
    location: "Abu Dhabi",
    image: "/images/gallery-1.jpg",
    type: "Mixed Use",
  },
  {
    name: "Al Qurm Compound",
    location: "Abu Dhabi",
    image: "/images/gallery-3.jpg",
    type: "Residential",
  },
  {
    name: "The Square Plaza",
    location: "Abu Dhabi",
    image: "/images/gallery-4.jpg",
    type: "Commercial",
  },
  {
    name: "Westburry Residence",
    location: "Dubai Business Bay",
    image: "/images/gallery-5.jpg",
    type: "Residential",
  },
];

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
  const ref = useRef<HTMLElement>(null);

  return (
    <Tag
      ref={ref}
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

export default function Properties() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal for the heading
      const headingWords = headerRef.current?.querySelectorAll(
        "[data-word-reveal] .word-inner"
      );
      if (headingWords?.length) {
        gsap.to(headingWords, {
          y: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Label + "View all" link fade
      const label = headerRef.current?.querySelector(".label");
      const link = headerRef.current?.querySelector(".link-underline");
      if (label && link) {
        gsap.fromTo(
          [label, link],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Search bar reveal
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: searchRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Card animations
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const imgWrapper = card.querySelector(".card-img-wrapper") as HTMLElement;
        const textEls = card.querySelectorAll(".card-text");

        if (imgWrapper) {
          // clipPath reveal on the image wrapper
          gsap.fromTo(
            imgWrapper,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
              delay: i * 0.15,
            }
          );
        }

        // Text fades in after image reveal
        if (textEls.length) {
          gsap.fromTo(
            textEls,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power4.out",
              stagger: 0.06,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
              delay: i * 0.15 + 0.8,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-border"
      style={{ position: "relative", background: "var(--color-cream)" }}
    >
      {/* ── Decorative graphics ── */}
      <SectionNumber number="02" color="rgba(0,0,0,0.025)" style={{ top: "40px", left: "60px" }} />
      <CircleOutline size={200} color="rgba(0,0,0,0.04)" style={{ bottom: "-60px", right: "100px" }} />

      <div style={{ padding: "120px 60px 80px" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "60px",
              flexWrap: "wrap",
            }}
          >
            <span className="label text-muted">Collection</span>
            <WordReveal
              text="Our Properties"
              className="heading-lg"
              as="h2"
            />
          </div>
          <a href="#properties" className="link-underline label">
            View all
          </a>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} style={{ marginBottom: "48px", opacity: 0 }}>
          <PropertySearch variant="light" />
        </div>

        {/* Property Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          {properties.map((property, i) => (
            <div
              key={property.name}
              ref={(el) => setCardRef(el, i)}
            >
              <a
                href="#"
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  className="card-img-wrapper"
                  style={{
                    aspectRatio: "500 / 617",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "3px",
                    clipPath: "inset(100% 0 0 0)",
                  }}
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    loading="lazy"
                    className="property-card-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition:
                        "transform 1s cubic-bezier(.165,.84,.44,1)",
                      willChange: "transform",
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="property-hover-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                      opacity: 0,
                      transition:
                        "opacity 0.6s cubic-bezier(.165,.84,.44,1)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Permanent gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "24px",
                      zIndex: 1,
                    }}
                  >
                    <h3
                      className="heading-sm card-text"
                      style={{ color: "white", opacity: 0 }}
                    >
                      {property.name}
                    </h3>
                    <span
                      className="label-sm card-text"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        display: "block",
                        marginTop: "4px",
                        opacity: 0,
                      }}
                    >
                      {property.location}
                    </span>
                  </div>
                </div>
              </a>
              <div style={{ marginTop: "10px" }}>
                <span
                  className="label-sm text-muted card-text"
                  style={{ opacity: 0 }}
                >
                  {property.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .property-card-img {
          transform: scale(1);
        }
        .card-img-wrapper:hover .property-card-img {
          transform: scale(1.05);
        }
        .card-img-wrapper:hover .property-hover-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          section > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
