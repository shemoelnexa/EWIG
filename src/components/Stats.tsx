"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiamondRule } from "@/components/Graphics";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 30, suffix: "+", label: "Years of Excellence" },
  { value: 654, suffix: "", label: "Units Managed" },
  { value: 4, suffix: "", label: "Emirates Covered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersTriggered = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Counter animations triggered on scroll
      const numberEls = section.querySelectorAll<HTMLSpanElement>(".stat-number");
      const labelEls = section.querySelectorAll<HTMLSpanElement>(".stat-label");

      // Initial state
      gsap.set(numberEls, { opacity: 0, y: 30 });
      gsap.set(labelEls, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          if (countersTriggered.current) return;
          countersTriggered.current = true;

          // Reveal numbers
          gsap.to(numberEls, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1,
          });

          // Reveal labels
          gsap.to(labelEls, {
            opacity: 0.45,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1,
            delay: 0.15,
          });

          // Animate counters
          numberEls.forEach((el, i) => {
            const stat = stats[i];
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.val) + stat.suffix;
              },
            });
          });
        },
      });

      // Removed per-element parallax for performance
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-border"
      style={{ background: "var(--color-cream)" }}
    >
      <div style={{ padding: "120px 60px" }}>
        <DiamondRule color="rgba(0,0,0,0.08)" style={{ marginBottom: "60px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                minWidth: "160px",
                textAlign: "center",
                position: "relative",
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(11, 16, 18, 0.1)"
                    : "none",
                padding: "0 20px",
              }}
            >
              <span
                className="heading-xl stat-number"
                style={{ display: "block", willChange: "transform" }}
              >
                0{stat.suffix}
              </span>
              <span
                className="label-sm stat-label"
                style={{
                  display: "block",
                  marginTop: "12px",
                  willChange: "transform",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
