import { motion } from "framer-motion";
import { MessageSquareText, PenTool, Download } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorksEmotes() {
  const { language } = useLanguage();

  const steps = [
    {
      icon: MessageSquareText,
      stepNum: "01",
      titlePt: "1. Envie sua ideia",
      titleEn: "1. Send your idea",
      textPt: "Você nos conta seu personagem, estilo ou traz referências de expressões.",
      textEn: "Explain your mascot, character or send expression references.",
    },
    {
      icon: PenTool,
      stepNum: "02",
      titlePt: "2. Criamos os rascunhos",
      titleEn: "2. We create sketches",
      textPt: "Desenhamos as artes e enviamos para sua aprovação antes de finalizar.",
      textEn: "We sketch line art and submit for your review before final coloring.",
    },
    {
      icon: Download,
      stepNum: "03",
      titlePt: "3. Receba no formato certo",
      titleEn: "3. Delivery ready to upload",
      textPt: "Arquivos PNG transparentes cortados exatamente nos tamanhos da Twitch.",
      textEn: "Transparent PNG files pre-resized for Twitch (112px, 56px, 28px).",
    },
  ];

  return (
    <section id="como-funciona" className="border-t border-purple-900/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>{language === "pt" ? "passo a passo" : "step-by-step"}</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {language === "pt"
            ? "Três passos simples entre sua ideia e a reação do chat"
            : "Three simple steps between your idea and chat reactions"}
        </h2>

        <ol className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.titlePt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-purple-900/30 bg-purple-950/10 backdrop-blur p-8 transition-colors duration-300 hover:border-purple-500/50 hover:bg-purple-950/20 shadow-sm hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="flex items-center justify-between mb-8 border-b border-purple-900/30 pb-5">
                <span className="font-mono text-xs font-bold tracking-widest text-purple-400">
                  // {step.stepNum}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-900/40 bg-purple-950/30 group-hover:border-purple-500/50 transition-colors"
                >
                  <step.icon className="h-5 w-5 text-purple-400" strokeWidth={1.8} />
                </motion.div>
              </div>

              <div>
                <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-purple-300 transition-colors">
                  {language === "pt" ? step.titlePt : step.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {language === "pt" ? step.textPt : step.textEn}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
