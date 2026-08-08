import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import previewEmotes from "@/assets/previwe-emotes.png";
import { SiteHeaderWeb, SiteFooterWeb } from "@/components/web/SiteChromeWeb";
import { WebHero } from "@/components/web/WebHero";
import { WebShowcase } from "@/components/web/WebShowcase";
import { WebFeatures } from "@/components/web/WebFeatures";
import { WebProcess } from "@/components/web/WebProcess";
import { WebPricing } from "@/components/web/WebPricing";
import { WebCta } from "@/components/web/WebCta";
import { CustomWebCursor } from "@/components/web/CustomWebCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

gsap.registerPlugin(ScrollTrigger);

export default function Website() {
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

    const title = "Douglas | Criação de sites para Streamers";
    const description =
      "Sites e landing pages animadas para streamers e times de esports: hub de links, agenda de lives, loja de emotes e media kit para patrocínio.";
    const previewUrl = new URL(previewEmotes, window.location.origin).toString();

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", previewUrl);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:url", `${window.location.origin}/website`);
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
    canonicalLink.setAttribute("href", `${window.location.origin}/website`);

    // Initialize Lenis Smooth Scroll (optimized for fluid performance)
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

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
    <div className="min-h-screen bg-[#080808] text-foreground selection:bg-purple-600 selection:text-white relative md:cursor-none md:[&_*]:cursor-none">
      <CustomWebCursor />
      <SiteHeaderWeb />
      <main id="top">
        <WebHero />
        <WebShowcase />
        <WebFeatures />
        <WebProcess />
        <WebPricing />
        <WebCta />
      </main>
      <SiteFooterWeb />
      <WhatsAppFloat
        variant="purple"
        number="5522997477083"
        message="Olá, Douglas! Vim pela página /website e gostaria de fazer um orçamento para um site de streamer."
      />
    </div>
  );
}
