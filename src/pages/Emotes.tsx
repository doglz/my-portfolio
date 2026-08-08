import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import previewEmotes from "@/assets/previwe-emotes.png";
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

    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const title = "Douglas | Emotes personalizados para Stream e Discord";
    const description = "Emotes profissionais para Stream, Discord e redes sociais com identidade forte e aparência premium.";
    const previewUrl = new URL(previewEmotes, window.location.origin).toString();

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", previewUrl);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:url", `${window.location.origin}/emotes`);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", previewUrl);
    setMetaTag("name", "twitter:image:alt", title);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", `${window.location.origin}/emotes`);

    // Initialize Lenis Smooth Scroll specifically for /emotes (optimized)
    const lenis = new Lenis({
      duration: 0.85,
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
    gsap.ticker.lagSmoothing(500, 33);

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
