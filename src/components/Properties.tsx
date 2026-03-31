"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionNumber, CircleOutline } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const locations = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Ras Al Khaimah"];
const categories = ["Buy", "Rent", "Off-Plan"];
const propertyTypes = ["Apartment", "Villa", "Townhouse", "Penthouse", "Commercial", "Mixed Use"];
const bedrooms = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5+ Bedrooms"];
const priceRanges = [
  "Under 500K AED",
  "500K – 1M AED",
  "1M – 2M AED",
  "2M – 5M AED",
  "5M – 10M AED",
  "10M+ AED",
];

function SearchDropdown({
  icon,
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="search-dropdown" style={{ position: "relative", flex: 1 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-black)",
          }}
        >
          {icon}
          {label}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 400,
            color: value ? "var(--color-black)" : "rgba(11,16,18,0.4)",
          }}
        >
          {value || placeholder}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "-1px",
            right: "-1px",
            background: "var(--color-white)",
            border: "1px solid rgba(11,16,18,0.1)",
            borderTop: "none",
            borderRadius: "0 0 3px 3px",
            zIndex: 50,
            maxHeight: "220px",
            overflowY: "auto",
            boxShadow: "0 12px 32px rgba(11,16,18,0.08)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="search-option"
              style={{
                width: "100%",
                padding: "10px 16px",
                border: "none",
                background: value === opt ? "rgba(206,224,2,0.1)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: value === opt ? 500 : 400,
                color: value === opt ? "var(--color-black)" : "rgba(11,16,18,0.7)",
                transition: "all 0.2s ease",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="5.5" />
    <path d="M11 11L14.5 14.5" />
  </svg>
);
const LocationIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 12S10 7.5 10 4.8C10 2.15 7.99.5 5.5.5S1 2.15 1 4.8C1 7.5 5.5 12 5.5 12z" />
    <circle cx="5.5" cy="4.8" r="1.5" />
  </svg>
);
const CategoryIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M1 3h10M1 6h7M1 9h10" />
  </svg>
);
const PropertyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="12" height="10" rx="1" />
    <path d="M4 3V1.5h6V3" />
    <path d="M5 7h4M5 10h4" />
  </svg>
);
const BedroomIcon = () => (
  <svg width="13" height="11" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 11V7h12v4M1 7V3a2 2 0 012-2h8a2 2 0 012 2v4" />
    <path d="M3 7V5h3v2M8 7V5h3v2" />
  </svg>
);
const PriceIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="6" />
    <path d="M7 3v8M5 5.2c0-.8.9-1.2 2-1.2s2 .4 2 1.2-.9 1.3-2 1.5-2 .6-2 1.4.9 1.2 2 1.2 2-.4 2-1.2" />
  </svg>
);

const properties = [
  {
    name: "Dusit Thani Complex",
    location: "Abu Dhabi",
    image: "/images/dusit-thani.jpg",
    type: "Mixed Use",
  },
  {
    name: "Al Qurm Compound",
    location: "Abu Dhabi",
    image: "/images/villa.jpg",
    type: "Residential",
  },
  {
    name: "The Square Plaza",
    location: "Abu Dhabi",
    image: "/images/commercial-building.jpg",
    type: "Commercial",
  },
  {
    name: "Westburry Residence",
    location: "Dubai Business Bay",
    image: "/images/residential-building.jpg",
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

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleClear = () => {
    setLocation("");
    setCategory("");
    setPropertyType("");
    setBedroom("");
    setPriceRange("");
  };

  const handleSearch = () => {
    // search logic here
  };

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
        <div
          ref={searchRef}
          style={{
            background: "var(--color-white)",
            borderRadius: "3px",
            border: "1px solid rgba(11,16,18,0.08)",
            marginBottom: "48px",
            opacity: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderBottom: "1px solid rgba(11,16,18,0.06)",
            }}
          >
            <div className="search-filters-row" style={{ flex: 1, display: "flex" }}>
              <div style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(11,16,18,0.06)" }}>
                <SearchDropdown
                  icon={<LocationIcon />}
                  label="Location"
                  placeholder="Where do you want to?"
                  options={locations}
                  value={location}
                  onChange={setLocation}
                />
              </div>
              <div style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(11,16,18,0.06)" }}>
                <SearchDropdown
                  icon={<CategoryIcon />}
                  label="Category"
                  placeholder="Choose Category"
                  options={categories}
                  value={category}
                  onChange={setCategory}
                />
              </div>
              <div style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(11,16,18,0.06)" }}>
                <SearchDropdown
                  icon={<PropertyIcon />}
                  label="Property Type"
                  placeholder="Choose Property Type?"
                  options={propertyTypes}
                  value={propertyType}
                  onChange={setPropertyType}
                />
              </div>
              <div style={{ flex: 1, padding: "0 20px", borderRight: "1px solid rgba(11,16,18,0.06)" }}>
                <SearchDropdown
                  icon={<BedroomIcon />}
                  label="Bedroom"
                  placeholder="Choose Room Type"
                  options={bedrooms}
                  value={bedroom}
                  onChange={setBedroom}
                />
              </div>
              <div style={{ flex: 1, padding: "0 20px" }}>
                <SearchDropdown
                  icon={<PriceIcon />}
                  label="Price Range (AED)"
                  placeholder="Choose price range"
                  options={priceRanges}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
              padding: "14px 20px",
            }}
          >
            <button
              type="button"
              onClick={handleClear}
              className="search-clear-btn"
              style={{
                padding: "12px 28px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "transparent",
                color: "var(--color-black)",
                border: "1px solid rgba(11,16,18,0.15)",
                borderRadius: "3px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="search-submit-btn"
              style={{
                padding: "12px 28px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--color-accent)",
                color: "var(--color-black)",
                border: "1px solid var(--color-accent)",
                borderRadius: "3px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
            >
              Search
              <SearchIcon />
            </button>
          </div>
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
        .search-option:hover {
          background: rgba(206, 224, 2, 0.08) !important;
          color: var(--color-black) !important;
        }
        .search-clear-btn:hover {
          border-color: var(--color-black) !important;
        }
        .search-submit-btn:hover {
          background: var(--color-accent-dark) !important;
          border-color: var(--color-accent-dark) !important;
        }
        .search-dropdown + .search-dropdown {
          border-left: 1px solid rgba(11,16,18,0.06);
        }
        @media (max-width: 1024px) {
          .search-dropdown button {
            padding: 14px 0 !important;
          }
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
