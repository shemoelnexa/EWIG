"use client";

import { useState, useEffect, useRef } from "react";

const menuLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

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
        <div className="flex flex-col items-center justify-center">
          <nav className="menu-links">
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="menu-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <div
            className="flex flex-col items-center gap-[0.6rem] mt-[4rem]"
            style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}
          >
            <a
              href="tel:+97122072200"
              className="label-sm text-white"
              style={{ opacity: 0.5, textDecoration: "none" }}
            >
              +971 2 207 2200
            </a>
            <a
              href="mailto:ewig@ccsupport.ae"
              className="label-sm text-white"
              style={{ opacity: 0.5, textDecoration: "none" }}
            >
              ewig@ccsupport.ae
            </a>
          </div>

          {/* Social Icons */}
          <div
            className="flex items-center gap-[2rem] mt-[2.5rem]"
            style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}
          >
            {["Instagram", "LinkedIn", "Facebook", "YouTube"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="label-sm text-white"
                style={{ opacity: 0.4, textDecoration: "none", transition: "opacity 0.3s ease" }}
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
        <div
          className={`nav-burger${isOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
        >
          <div className="burger-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </>
  );
}
