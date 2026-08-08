import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    qPt: "Os emotes funcionam em plataformas de Stream e Discord?",
    qEn: "Do emotes work seamlessly on Stream platforms and Discord?",
    aPt: "Sim! Entregamos os arquivos em formato PNG com fundo transparente nos tamanhos padrão (como 112x112, 56x56 e 28x28 pixels), testados e otimizados para nitidez em qualquer plataforma e modo (dark ou light).",
    aEn: "Yes! Delivered in PNG format with transparent backgrounds in standard sizes (112x112, 56x56 and 28x28 pixels), tested for crisp display across streaming platforms and modes.",
  },
  {
    qPt: "Posso utilizar o meu próprio personagem / mascote / VTuber?",
    qEn: "Can I use my own character / mascot / VTuber?",
    aPt: "Com certeza. Você nos envia imagens de referência e recriamos as expressões mantendo a identidade visual do seu avatar.",
    aEn: "Absolutely. Send reference images or design docs and we'll translate your avatar into various expressive emotes.",
  },
  {
    qPt: "Posso pedir alterações se não gostar do rascunho?",
    qEn: "Can I request changes if I want to refine the sketch?",
    aPt: "Sim! Na fase de rascunho de linhas fazemos todos os ajustes necessários até que você fique 100% satisfeito com o resultado.",
    aEn: "Yes! During the line art sketch phase, we make all needed adjustments until you are 100% satisfied.",
  },
  {
    qPt: "Qual é o prazo médio de entrega?",
    qEn: "What is the average delivery timeframe?",
    aPt: "Emotes individuais e pacotes menores (até 6) são entregues em até 24h. Pacotes completos de 12 a 24 emotes levam de 2 a 4 dias.",
    aEn: "Single emotes and small packs (up to 6) are delivered within 24h. Packs of 12-24 emotes take 2-4 business days.",
  },
];

export function FaqEmotes() {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-purple-900/30 py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>{language === "pt" ? "perguntas frequentes" : "faq"}</SectionLabel>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {language === "pt" ? "Dúvidas frequentes sobre as encomendas" : "Frequently asked questions"}
          </h2>
        </div>

        <ul className="divide-y divide-purple-900/30">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.qPt} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-purple-400 group"
                >
                  <span
                    className={`font-sans text-lg font-semibold transition-colors duration-300 ${
                      isOpen ? "text-purple-400" : "text-foreground group-hover:text-purple-400"
                    }`}
                  >
                    {language === "pt" ? faq.qPt : faq.qEn}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-900/40 font-mono text-xl text-muted-foreground group-hover:border-purple-500/50 group-hover:text-purple-400"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted-foreground">
                        {language === "pt" ? faq.aPt : faq.aEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
