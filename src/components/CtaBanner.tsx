"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleOutline, CrossMark } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;

      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section-border" style={{ position: "relative", background: "var(--color-cream)" }}>
      {/* ── Decorative graphics ── */}
      <CircleOutline size={400} color="rgba(0,0,0,0.03)" pulse style={{ top: "-150px", left: "50%", transform: "translateX(-50%)" }} />
      <CrossMark size={24} color="rgba(0,0,0,0.06)" style={{ top: "60px", right: "80px" }} />
      <CrossMark size={18} color="rgba(0,0,0,0.06)" style={{ bottom: "60px", left: "80px" }} />

      <div style={{ padding: "160px 60px" }}>
        <div
          ref={contentRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <h2 className="heading-xl">
            Let&apos;s find your perfect property
          </h2>

          <p className="body-md text-soft" style={{ marginTop: "24px" }}>
            Get in touch with our team to explore our portfolio of residential
            and commercial properties across the UAE.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "36px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/contact" className="btn btn-dark">Get in Touch</a>
            <a href="tel:+97122072200" className="btn btn-outline">Call +971 2 207 2200</a>
          </div>
        </div>
      </div>
    </section>
  );
}
