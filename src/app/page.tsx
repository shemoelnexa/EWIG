"use client";

import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Properties from "@/components/Properties";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <About />
        <Vision />
        <Properties />
        <Showcase />
        <Stats />
        <Services />
        <FeaturedProjects />
        <Reviews />
        <Gallery />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
