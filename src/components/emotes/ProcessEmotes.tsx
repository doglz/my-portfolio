import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    titlePt: "Briefing",
    titleEn: "Briefing",
    textPt: "Conversa rápida: você envia referências, estilo do canal e expressões desejadas.",
    textEn: "Quick chat: send references, channel theme, and expression ideas.",
  },
  {
    titlePt: "Esboço & Rascunho",
    titleEn: "Sketch & Outline",
    textPt: "Criação dos traços e posições para você validar antes de aplicar cor.",
    textEn: "Line art and pose creation for validation prior to coloring.",
  },
  {
    titlePt: "Vetorização & Ajustes",
    titleEn: "Coloring & Tweaks",
    textPt: "Aplicação de cores vivas e ajustes finos nas expressões dos personagens.",
    textEn: "Vibrant colors applied and expression fine-tuning.",
  },
  {
    titlePt: "Entrega Final",
    titleEn: "Final Hand-off",
    textPt: "Arquivos PNG testados e compactados nos tamanhos oficiais para upload.",
    textEn: "PNG package tested and organized into Stream & Discord ready folders.",
  },
];

export function ProcessEmotes() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineProgressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="border-t border-purple-900/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>{language === "pt" ? "processo criativo" : "creative process"}</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {language === "pt" ? "Briefing → Rascunho → Ajustes → Entrega" : "Briefing → Sketch → Adjustments → Delivery"}
        </h2>

        <div ref={containerRef} className="relative">
          {/* Base vertical line */}
          <div className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-0.5 -translate-x-1/2 bg-purple-900/30" />
          
          {/* Animated vertical fill line in purple */}
          <div
            ref={lineProgressRef}
            className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-0.5 -translate-x-1/2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)] origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {stages.map((stage, i) => (
            <motion.div
              key={stage.titlePt}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 sm:pl-14 grid gap-2 pb-12 last:pb-0 sm:grid-cols-[220px_1fr] sm:gap-8 group"
            >
              {/* Dot centered EXACTLY at left-3.5 (14px) / sm:left-5 (20px) on top of the vertical line */}
              <span className="absolute left-3.5 sm:left-5 top-2.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-purple-400 border-2 border-background shadow-[0_0_10px_rgba(168,85,247,0.8)] transition-transform duration-300 group-hover:scale-125 z-10" />
              
              <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-purple-300 transition-colors">
                {language === "pt" ? stage.titlePt : stage.titleEn}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:pt-0.5">
                {language === "pt" ? stage.textPt : stage.textEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
