"use client";

import { useState, useEffect, useRef } from "react";

const primaryLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About Us", href: "#about" },
  { label: "Tenant Benefits", href: "#tenant-benefits" },
  { label: "ESG", href: "#esg" },
];

const secondaryLinks = [
  { label: "Quality Policy", href: "#quality-policy" },
  { label: "Blogs", href: "#blogs" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Hide nav when footer is in view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Fullscreen Menu Overlay */}
      <div className={`menu-overlay${isOpen ? " is-open" : ""}`}>
        {/* Close button */}
        <button
          className="menu-close"
          onClick={closeMenu}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "clamp(20px, 4vw, 40px)",
            right: "clamp(20px, 4vw, 40px)",
            zIndex: 10,
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            cursor: "pointer",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.3s, border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(206,224,2,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="menu-content">
          {/* Primary links — large */}
          <nav className="menu-links-primary">
            {primaryLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="menu-link-primary"
                onClick={closeMenu}
                style={{ transitionDelay: isOpen ? `${0.1 + i * 0.05}s` : "0s" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div
            className="menu-divider"
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(255,255,255,0.12)",
              margin: "clamp(20px, 3vw, 36px) auto",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.5s ease 0.4s",
            }}
          />

          {/* Secondary links — small, inline */}
          <div className="menu-links-secondary">
            {secondaryLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="menu-link-secondary"
                onClick={closeMenu}
                style={{ transitionDelay: isOpen ? `${0.35 + i * 0.05}s` : "0s" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div
            className="menu-contact"
            style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.6s ease 0.55s" }}
          >
            <a href="tel:+97122072200">+971 2 207 2200</a>
            <a href="mailto:ewig@ccsupport.ae">ewig@ccsupport.ae</a>
          </div>

          {/* Social Icons */}
          <div
            className="menu-socials"
            style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.6s ease 0.65s" }}
          >
            {["Instagram", "LinkedIn", "Facebook", "YouTube"].map((platform) => (
              <a
                key={platform}
                href="#"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div
        ref={navRef}
        className="bottom-nav"
        style={{
          transition: "transform 0.5s cubic-bezier(.77,0,.175,1), opacity 0.5s ease",
          transform: hidden && !isOpen ? "translateX(-50%) translateY(calc(100% + 40px))" : "translateX(-50%) translateY(0)",
          opacity: hidden && !isOpen ? 0 : 1,
        }}
      >
        {/* Logo */}
        <div className="nav-logo">
          <img
            src="/images/logo.png"
            alt="EWIG"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title */}
        <div className="nav-title">
          <span>East &amp; West Intl Group</span>
        </div>

        {/* Burger */}
        <button
          className={`nav-burger${isOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="burger-lines">
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
    </>
  );
}
