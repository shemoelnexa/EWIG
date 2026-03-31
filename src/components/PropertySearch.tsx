"use client";

import { useEffect, useRef, useState } from "react";

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
  variant = "light",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  variant?: "light" | "dark";
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

  const isDark = variant === "dark";

  return (
    <div ref={ref} className="search-dropdown" style={{ position: "relative" }}>
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
            color: isDark ? "rgba(255,255,255,0.7)" : "var(--color-black)",
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
            color: value
              ? isDark ? "var(--color-white)" : "var(--color-black)"
              : isDark ? "rgba(255,255,255,0.35)" : "rgba(11,16,18,0.4)",
          }}
        >
          {value || placeholder}
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            style={{
              flexShrink: 0,
              transition: "transform 0.3s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
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
            background: isDark ? "rgba(33,35,37,0.98)" : "var(--color-white)",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(11,16,18,0.1)",
            borderTop: "none",
            borderRadius: "0 0 3px 3px",
            zIndex: 50,
            maxHeight: "220px",
            overflowY: "auto",
            boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 32px rgba(11,16,18,0.08)",
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
                background: value === opt ? "rgba(206,224,2,0.12)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: value === opt ? 500 : 400,
                color: isDark
                  ? value === opt ? "var(--color-accent)" : "rgba(255,255,255,0.65)"
                  : value === opt ? "var(--color-black)" : "rgba(11,16,18,0.7)",
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

const dividerColor = (isDark: boolean) =>
  isDark ? "rgba(255,255,255,0.08)" : "rgba(11,16,18,0.06)";

export default function PropertySearch({
  variant = "light",
  className,
  style,
}: {
  variant?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}) {
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
    // search logic
  };

  const isDark = variant === "dark";
  const dc = dividerColor(isDark);

  return (
    <div
      className={className}
      style={{
        background: isDark ? "rgba(11,16,18,0.55)" : "var(--color-white)",
        backdropFilter: isDark ? "blur(20px)" : undefined,
        WebkitBackdropFilter: isDark ? "blur(20px)" : undefined,
        borderRadius: "3px",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(11,16,18,0.08)",
        ...style,
      }}
    >
      <div style={{ borderBottom: `1px solid ${dc}` }}>
        <div
          className="search-filters-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          <div style={{ padding: "0 20px", borderRight: `1px solid ${dc}` }}>
            <SearchDropdown icon={<LocationIcon />} label="Location" placeholder="Where do you want to?" options={locations} value={location} onChange={setLocation} variant={variant} />
          </div>
          <div style={{ padding: "0 20px", borderRight: `1px solid ${dc}` }}>
            <SearchDropdown icon={<CategoryIcon />} label="Category" placeholder="Choose Category" options={categories} value={category} onChange={setCategory} variant={variant} />
          </div>
          <div style={{ padding: "0 20px", borderRight: `1px solid ${dc}` }}>
            <SearchDropdown icon={<PropertyIcon />} label="Property Type" placeholder="Choose Property Type?" options={propertyTypes} value={propertyType} onChange={setPropertyType} variant={variant} />
          </div>
          <div style={{ padding: "0 20px", borderRight: `1px solid ${dc}` }}>
            <SearchDropdown icon={<BedroomIcon />} label="Bedroom" placeholder="Choose Room Type" options={bedrooms} value={bedroom} onChange={setBedroom} variant={variant} />
          </div>
          <div style={{ padding: "0 20px" }}>
            <SearchDropdown icon={<PriceIcon />} label="Price Range (AED)" placeholder="Choose price range" options={priceRanges} value={priceRange} onChange={setPriceRange} variant={variant} />
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
            color: isDark ? "var(--color-white)" : "var(--color-black)",
            border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(11,16,18,0.15)",
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
  );
}
