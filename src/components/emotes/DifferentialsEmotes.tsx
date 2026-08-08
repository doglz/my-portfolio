import { motion } from "framer-motion";
import { emotes } from "@/lib/emotes";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";

export function DifferentialsEmotes() {
  const { language } = useLanguage();

  const items = [
    {
      titlePt: "Arquivos PNG transparentes",
      titleEn: "Transparent PNG files",
      textPt: "Sem fundo, totalmente limpos e prontos para upload imediato.",
      textEn: "Clean background-free files ready for direct channel upload.",
      emote: emotes.joia,
    },
    {
      titlePt: "Tamanhos para Stream & Discord",
      titleEn: "Stream & Discord sizes",
      textPt: "Exportados nos tamanhos ideais para encaixe perfeito nas plataformas.",
      textEn: "Exported in ideal dimensions for crisp display across platforms.",
      emote: emotes.salute,
    },
    {
      titlePt: "Estilos personalizados",
      titleEn: "Custom art styles",
      textPt: "Do estilo Chibi fofo ao traço marcante ou caricatura.",
      textEn: "From cute Chibi graphics to stylized caricatures.",
      emote: emotes.estrelas,
    },
    {
      titlePt: "Expressões exclusivas",
      titleEn: "Unique expressions",
      textPt: "Desenhadas do zero para o seu canal. Zero modelos genéricos.",
      textEn: "Drawn 100% from scratch. No recycled template assets.",
      emote: emotes.troll,
    },
    {
      titlePt: "Pronto para sua comunidade",
      titleEn: "Community ready",
      textPt: "Pacote organizado por pasta para facilitar seu gerenciamento.",
      textEn: "Neatly organized zip folder ready to share or configure.",
      emote: emotes.comemora,
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-purple-900/30 py-20 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionLabel>{language === "pt" ? "diferenciais" : "features"}</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {language === "pt" ? "O que vem incluído em cada encomenda" : "Included in every order"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.titlePt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group flex items-start gap-5 rounded-2xl border border-purple-900/30 bg-purple-950/10 backdrop-blur p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-950/20"
            >
              <img
                src={item.emote.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-14 w-14 shrink-0 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 drop-shadow-md"
              />
              <div>
                <h3 className="font-sans text-base font-bold text-foreground group-hover:text-purple-300 transition-colors">
                  {language === "pt" ? item.titlePt : item.titleEn}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {language === "pt" ? item.textPt : item.textEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
