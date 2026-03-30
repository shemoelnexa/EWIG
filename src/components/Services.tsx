"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionNumber, DotGrid } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Property Management",
    desc: "Expert management of residential and commercial portfolios across the UAE",
  },
  {
    num: "02",
    title: "Leasing & Sales",
    desc: "Strategic marketing connecting quality properties with the right tenants",
  },
  {
    num: "03",
    title: "24/7 Maintenance",
    desc: "Round-the-clock support ensuring properties are always in perfect condition",
  },
  {
    num: "04",
    title: "Tenant Services",
    desc: "Comprehensive support including newsletters and exclusive partner offers",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
            },
          }
        );
      });

      const label = sectionRef.current?.querySelector(".services-label");
      if (label) {
        ScrollTrigger.create({
          trigger: label,
          start: "top 85%",
          onEnter: () => label.classList.add("is-visible"),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section-border" style={{ position: "relative", background: "var(--color-cream)" }}>
      {/* ── Decorative graphics ── */}
      <SectionNumber number="03" style={{ top: "40px", right: "60px" }} />
      <DotGrid cols={5} rows={5} gap={24} color="rgba(0,0,0,0.04)" style={{ bottom: "60px", left: "60px" }} />

      <div style={{ padding: "120px 60px" }}>
        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          {/* Label */}
          <div style={{ width: "140px", flexShrink: 0 }}>
            <span className="label text-muted services-label reveal">Services</span>
          </div>

          {/* Service rows */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            {services.map((service) => (
              <div
                key={service.num}
                className="service-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(33, 35, 37, 0.1)",
                  gap: "40px",
                  opacity: 0,
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(33,35,37,0.03)";
                  const arrow = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
                  if (arrow) arrow.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  const arrow = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
                  if (arrow) arrow.style.transform = "translateX(0)";
                }}
              >
                <span className="label text-muted" style={{ width: "40px", flexShrink: 0 }}>
                  {service.num}
                </span>
                <span className="heading-sm service-title" style={{ flex: 1, transition: "color 0.3s ease" }}>
                  {service.title}
                </span>
                <span className="body-sm text-soft" style={{ flex: 1, maxWidth: "360px" }}>
                  {service.desc}
                </span>
                <svg
                  className="arrow-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ flexShrink: 0, opacity: 0.3, transition: "transform 0.3s ease" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
