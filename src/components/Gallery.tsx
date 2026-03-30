"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/dusit-thani.jpg",
    alt: "Dusit Thani Complex",
    aspect: "3 / 4",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    alt: "Luxury Apartments",
    aspect: "16 / 9",
    span: 2,
  },
  {
    src: "/images/villa.jpg",
    alt: "Al Qurm Villa",
    aspect: "1 / 1",
    span: 1,
  },
  {
    src: "/images/commercial-building.jpg",
    alt: "The Square Plaza",
    aspect: "3 / 4",
    span: 1,
  },
  {
    src: "/images/residential-building.jpg",
    alt: "Westburry Residence",
    aspect: "1 / 1",
    span: 1,
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = useCallback((el: HTMLDivElement | null, i: number) => {
    itemsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const img = item.querySelector("img") as HTMLElement;

        // ClipPath reveal staggered
        gsap.fromTo(
          item,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );

        // Removed per-image parallax for performance
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-border"
      style={{ background: "var(--color-cream)" }}
    >
      <div style={{ padding: "80px 60px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => setItemRef(el, i)}
              className="gallery-item"
              style={{
                gridColumn: img.span === 2 ? "span 2" : undefined,
                aspectRatio: img.aspect,
                overflow: "hidden",
                borderRadius: "3px",
                position: "relative",
                clipPath: "inset(100% 0 0 0)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="gallery-img"
                style={{
                  width: "100%",
                  height: "110%",
                  objectFit: "cover",
                  transition:
                    "transform 1s cubic-bezier(.165,.84,.44,1)",
                  willChange: "transform",
                  position: "relative",
                  top: "-5%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-item:hover .gallery-img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > div > div > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
