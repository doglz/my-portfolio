import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteHeaderEmotes, SiteFooterEmotes } from "@/components/emotes/SiteChromeEmotes";
import { HeroEmotes } from "@/components/emotes/HeroEmotes";
import { GalleryEmotes } from "@/components/emotes/GalleryEmotes";
import { DifferentialsEmotes } from "@/components/emotes/DifferentialsEmotes";
import { HowItWorksEmotes } from "@/components/emotes/HowItWorksEmotes";
import { ProcessEmotes } from "@/components/emotes/ProcessEmotes";
import { PricingEmotes } from "@/components/emotes/PricingEmotes";
import { FaqEmotes } from "@/components/emotes/FaqEmotes";
import { FinalCtaEmotes } from "@/components/emotes/FinalCtaEmotes";
import { CustomEmotesCursor } from "@/components/emotes/CustomEmotesCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

gsap.registerPlugin(ScrollTrigger);

export default function Emotes() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize Lenis Smooth Scroll specifically for /emotes
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-600 selection:text-white relative md:cursor-none md:[&_*]:cursor-none">
      <CustomEmotesCursor />
      <SiteHeaderEmotes />
      <main id="top">
        <HeroEmotes />
        <GalleryEmotes />
        <DifferentialsEmotes />
        <HowItWorksEmotes />
        <ProcessEmotes />
        <PricingEmotes />
        <FaqEmotes />
        <FinalCtaEmotes />
      </main>
      <SiteFooterEmotes />
      <WhatsAppFloat
        variant="purple"
        number="5522997477083"
        message="Olá, Douglas! Vim pela página de emotes e gostaria de fazer um orçamento."
      />
    </div>
  );
}
