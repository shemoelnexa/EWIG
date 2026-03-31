"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuLinks = [
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const secondaryLeft = [
  { label: "Blog", href: "/blog" },
  { label: "Quality Policy", href: "/quality-policy" },
];

const secondaryRight = [
  { label: "+971 2 207 2200", href: "tel:+97122072200" },
  { label: "ewig@ccsupport.ae", href: "mailto:ewig@ccsupport.ae" },
];

const socials = ["Instagram", "YouTube", "LinkedIn", "Facebook"];
const legal = ["Privacy policy", "Terms & conditions"];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Menu links stagger
      const links = cardRef.current?.querySelectorAll(".footer-menu-link");
      if (links?.length) {
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: 0.3,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Background image ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="/images/footer-bg.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* Subtle dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* ── Large watermark text ── */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(60px, 12vw, 180px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "rgba(255,255,255,0.08)",
          lineHeight: 1,
          zIndex: 1,
        }}
      >
        EAST &amp; WEST
      </div>

      {/* ── Main content area ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 120px",
        }}
      >
        {/* Logo above card */}
        <div style={{ marginBottom: "32px" }}>
          <img
            src="/images/logo.png"
            alt="EWIG"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* ── Dark card ── */}
        <div
          ref={cardRef}
          style={{
            background: "linear-gradient(180deg, rgba(11,16,18,0.92) 0%, rgba(11,16,18,0.98) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "4px",
            padding: "48px 56px 40px",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          {/* MENU label */}
          <span
            className="label"
            style={{
              color: "var(--color-accent)",
              fontSize: "11px",
              marginBottom: "24px",
              display: "block",
            }}
          >
            Menu
          </span>

          {/* Main nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "40px" }}>
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-menu-link"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(28px, 3.5vw, 38px)",
                  fontWeight: 500,
                  color: "white",
                  textDecoration: "none",
                  lineHeight: 1.25,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#cee002")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Secondary links row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "36px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {secondaryLeft.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="body-sm link-underline"
                  style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {secondaryRight.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="body-sm link-underline"
                  style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="/contact"
            className="btn btn-dark"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#cee002";
              e.currentTarget.style.color = "#0b1012";
              e.currentTarget.style.borderColor = "#cee002";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Get in Touch
          </a>
        </div>
      </div>

      {/* ── Scroll to top ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={scrollToTop}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "4px",
            background: "rgba(11,16,18,0.7)",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#cee002")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(11,16,18,0.7)")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Left: copyright + socials */}
        <div
          className="label-sm"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>&copy;2026, East &amp; West</span>
          {socials.map((s) => (
            <a
              key={s}
              href="#"
              className="link-underline"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Right: legal */}
        <div
          className="label-sm"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {legal.map((item) => (
            <a
              key={item}
              href="#"
              className="link-underline"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
