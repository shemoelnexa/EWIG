"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    name: "Dusit Thani Complex",
    location: "Abu Dhabi",
    detail: "654 Units",
    image: "/images/gallery-1.jpg",
  },
  {
    num: "02",
    name: "Al Qurm Compound",
    location: "Abu Dhabi",
    detail: "Luxury Villas",
    image: "/images/gallery-3.jpg",
  },
  {
    num: "03",
    name: "The Square Plaza",
    location: "Baniyas, Abu Dhabi",
    detail: "Retail & F&B",
    image: "/images/gallery-4.jpg",
  },
  {
    num: "04",
    name: "Westburry Residence",
    location: "Business Bay, Dubai",
    detail: "Premium Living",
    image: "/images/gallery-5.jpg",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const updateImagePosition = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(${mousePos.current.x + 20}px, ${mousePos.current.y - 200}px)`;
    }
    rafId.current = requestAnimationFrame(updateImagePosition);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Header animations
      const headerLabel = section.querySelector(".fp-label");
      const headerTitle = section.querySelector(".fp-title");

      if (headerLabel) {
        gsap.fromTo(
          headerLabel,
          { opacity: 0, y: 20 },
          {
            opacity: 0.45,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: headerLabel, start: "top 88%" },
          }
        );
      }

      if (headerTitle) {
        gsap.fromTo(
          headerTitle,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: headerTitle, start: "top 88%" },
          }
        );
      }

      // Row stagger animations
      const rows = section.querySelectorAll(".project-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Start / stop RAF loop for image tracking
  useEffect(() => {
    if (activeProject !== null) {
      rafId.current = requestAnimationFrame(updateImagePosition);
    }
    return () => cancelAnimationFrame(rafId.current);
  }, [activeProject, updateImagePosition]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (activeProject !== index) setActiveProject(index);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <section
      ref={sectionRef}
      className="section section-dark"
      style={{ position: "relative" }}
    >
      <div style={{ padding: "120px 60px" }}>
        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <span
            className="label fp-label"
            style={{ opacity: 0, color: "var(--color-white)" }}
          >
            Featured Projects
          </span>
          <h2
            className="heading-lg fp-title"
            style={{ marginTop: "16px", opacity: 0 }}
          >
            Across the Emirates
          </h2>
        </div>

        {/* Project list */}
        <div style={{ position: "relative" }}>
          {projects.map((project, i) => (
            <div
              key={project.num}
              className="project-row"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "32px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                gap: "40px",
                cursor: "pointer",
                opacity: 0,
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(206,224,2,0.04)";
                const nameEl = e.currentTarget.querySelector(".fp-name") as HTMLElement;
                if (nameEl) nameEl.style.color = "#cee002";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                const nameEl = e.currentTarget.querySelector(".fp-name") as HTMLElement;
                if (nameEl) nameEl.style.color = "";
              }}
            >
              <span
                className="label text-muted"
                style={{ width: "40px", flexShrink: 0 }}
              >
                {project.num}
              </span>
              <a
                href="#"
                className="heading-sm link-underline fp-name"
                style={{
                  flex: 1,
                  textDecoration: "none",
                  color: "var(--color-white)",
                }}
              >
                {project.name}
              </a>
              <span
                className="label-sm text-muted"
                style={{
                  width: "180px",
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {project.location}
              </span>
              <span
                className="label-sm text-muted"
                style={{
                  width: "120px",
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {project.detail}
              </span>
            </div>
          ))}

          {/* Hover preview image */}
          <div
            ref={imageRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 300,
              height: 400,
              borderRadius: "3px",
              overflow: "hidden",
              pointerEvents: "none",
              opacity: activeProject !== null ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 10,
              willChange: "transform",
            }}
          >
            {projects.map((project, i) => (
              <Image
                key={project.num}
                src={project.image}
                alt={project.name}
                fill
                sizes="300px"
                style={{
                  objectFit: "cover",
                  opacity: activeProject === i ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
