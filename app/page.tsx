"use client"

import { useState } from "react"
import Navigation from "./components/Navigation"
import HeroSection from "./components/HeroSection"
import HowItWorksSection from "./components/HowItWorksSection";
import GameLauncher from "@/app/components/GameLauncher";
import ServicesSection from "./components/ServicesSection"
import ProductsForPets from "./components/ProductsForPets";
import TestimonialsSection from "./components/TestimonialsSection"
import BeforeAfter from "@/app/components/BeforeAfter";
import InstaPlayingCardsLite from "@/app/components/InstaPlayingCards";
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
        // poster="/howitworks/poster.jpg"
        badges={[
          { src: "/howitworks/badge1.webp", alt: "Grooming products", pos: "top-right" },
          
        ]}
      />

      <ServicesSection/>
      {/* <a
  href="https://tap-game-for-wouff.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className={`transition-colors px-3 py-2 text-sm font-medium lowercase`}
>
  play
</a> */}
<ProductsForPets
        products={[
          { id: 1, name: "Kyroi – Shampoo", price: 20, currency: "USD", type: "Physical", image: "/ProductsForPets/p1.jpg", href: "/product/kyroi-1" },
          { id: 2, name: "Moly Moly – Shampoo", price: 20, currency: "USD", type: "Physical", image: "/ProductsForPets/p2.jpg", href: "/product/moly-1" },
        ]}
        viewAllHref="/shop"
        onAddToCart={(p) => console.log("Add to cart:", p)}
      />
      
      <InstaPlayingCardsLite
      
  heading="Our Social Media"
  subtitle="Real results from our community."
  profileUrl="https://www.instagram.com/thewouff/"
  items={[
    { id: "ig1", title: "Yorkie Bath Routine", poster: "/insta/1.jpg", shortcode: "DNlEjNUvF-b", angle: -14, badge: "New" },
    { id: "ig2", title: "Nail Grinding 101",  poster: "/insta/2.jpg", shortcode: "DNr_aJz3jh9", angle: 10,  badge: "Guide" },
    { id: "ig3", title: "Salon-level De-shedding", poster: "/insta/3.jpg", shortcode: "DMxbqlXvErq", angle: -6,  badge: "Tip" },
   
  ]}
/>

      <TestimonialsSection />
      {/* <BeforeAfter />

// or custom images
<BeforeAfter
  beforeSrc="/beforeafter/dog-before.jpg"
  afterSrc="/beforeafter/dog-after.jpg"
  labelBefore="Before"
  labelAfter="After"
/> */}

      <FAQSection />

      <ContactSection
        heroImage="/contact/hero.jpg"
        badgeImage="/contact/badge.jpg"
        // Optional overrides:
        // eyebrow="Vertic pet solutions"
        // highlight="wellness"
        // panelBg="#cfe8f6"
        // primaryHref="mailto:hello@wouff.com"
        // secondaryHref="#services"
      />

      <Footer />
    </div>
  )
}
