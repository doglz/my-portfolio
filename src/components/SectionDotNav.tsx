import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface SectionItem {
  id: string;
  labelPt: string;
  labelEn: string;
}

export function SectionDotNav() {
  const { language } = useLanguage();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isPt = language === "pt";

  const getSectionsForRoute = (): SectionItem[] => {
    if (location.pathname === "/emotes") {
      return [
        { id: "galeria", labelPt: "Galeria", labelEn: "Gallery" },
        { id: "como-funciona", labelPt: "Diferenciais", labelEn: "Features" },
        { id: "processo-emotes", labelPt: "Processo", labelEn: "Process" },
        { id: "planos", labelPt: "Planos", labelEn: "Pricing" },
        { id: "faq", labelPt: "FAQ", labelEn: "FAQ" },
        { id: "contato", labelPt: "Contato", labelEn: "Contact" },
      ];
    }
    if (location.pathname === "/website") {
      return [
        { id: "showcase", labelPt: "Projetos", labelEn: "Showcase" },
        { id: "servicos", labelPt: "Diferenciais", labelEn: "Features" },
        { id: "processo-web", labelPt: "Processo", labelEn: "Process" },
        { id: "planos-web", labelPt: "Planos", labelEn: "Pricing" },
        { id: "contato-web", labelPt: "Contato", labelEn: "Contact" },
      ];
    }
    // Main portfolio route
    return [
      { id: "sobre", labelPt: "Sobre", labelEn: "About" },
      { id: "projetos", labelPt: "Projetos", labelEn: "Projects" },
      { id: "processo", labelPt: "Processo", labelEn: "Process" },
      { id: "planos", labelPt: "Planos", labelEn: "Pricing" },
      { id: "detalhes", labelPt: "Detalhes", labelEn: "Details" },
      { id: "contato", labelPt: "Contato", labelEn: "Contact" },
    ];
  };

  const sections = getSectionsForRoute();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const top = sec.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Navegação de seções"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 items-end pointer-events-none"
    >
      <div className="flex flex-col gap-2.5 items-end bg-background/40 backdrop-blur-md p-2 rounded-full border border-border/40 shadow-lg pointer-events-auto">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredId === sec.id;
          const label = isPt ? sec.labelPt : sec.labelEn;

          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              onMouseEnter={() => setHoveredId(sec.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-center justify-end focus:outline-none"
              aria-label={`Ir para a seção ${label}`}
            >
              {/* Floating tooltip badge on hover or active */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.span
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-7 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-mono font-medium shadow-md pointer-events-none ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-card/90 text-foreground border border-border/60 backdrop-blur-md"
                    }`}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Indicator Dot / Pill */}
              <span
                className={`relative rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-6 w-2 bg-primary shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                    : "h-2 w-2 bg-muted-foreground/40 hover:bg-primary/70 hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
