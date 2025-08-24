"use client"

import { useState } from "react"
import Navigation from "./components/Navigation"
import HeroSection from "./components/HeroSection"
import HowItWorksSection from "./components/HowItWorksSection";
import GameLauncher from "@/app/components/GameLauncher";
import ServicesSection from "./components/ServicesSection"
import TestimonialsSection from "./components/TestimonialsSection"
import FAQSection from "./components/FAQSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"


export default function Home() {
  const [bgColor, setBgColor] = useState("#e0ce8a")

  return (
    <div className="min-h-screen">
      <Navigation currentBgColor={bgColor} />

      <HeroSection onBgColorChange={setBgColor} />
      
      <HowItWorksSection
        videoSrc="/howitworks/grooming.mp4"
        poster="/howitworks/poster.jpg"
        badges={[
          { src: "/howitworks/badge1.webp", alt: "Grooming products", pos: "top-right" },
          
        ]}
      />

      <ServicesSection />
      <a
  href="https://tap-game-for-wouff.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className={`transition-colors px-3 py-2 text-sm font-medium lowercase`}
>
  play
</a>


      <TestimonialsSection />

      <FAQSection />

      <ContactSection />

      <Footer />
    </div>
  )
}
