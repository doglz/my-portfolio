import { motion } from "framer-motion";
import { emotes } from "@/lib/emotes";
import { useLanguage } from "@/contexts/LanguageContext";
import { waLinkForEmotes } from "@/lib/whatsapp";

export function FinalCtaEmotes() {
  const { language } = useLanguage();

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-purple-900/30 py-24 lg:py-36 bg-purple-950/10 select-none"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[650px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[150px]" />
      
      {/* Decorative Floating Emotes */}
      <motion.img
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        animate={{ y: [0, 8, 0], rotate: [-2, 2, -2] }}
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        viewport={{ once: true, margin: "-80px" }}
        src={emotes.hype.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute left-8 bottom-12 hidden w-32 lg:block drop-shadow-xl"
      />

      <motion.img
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        animate={{ y: [0, -8, 0], rotate: [2, -2, 2] }}
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        viewport={{ once: true, margin: "-80px" }}
        src={emotes.dinheiro.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute right-8 top-16 hidden w-32 lg:block drop-shadow-xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {language === "pt"
            ? "Pronto para deixar seu chat muito mais divertido?"
            : "Ready to make your stream chat infinitely more fun?"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
        >
          {language === "pt"
            ? "Mande uma mensagem no WhatsApp com sua ideia e receba seu primeiro set de emotes essa semana."
            : "Drop us a message on WhatsApp with your ideas and get your first set of emotes this week."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={waLinkForEmotes(
              language === "pt"
                ? "Olá, Douglas! Quero encomendar meu pack de emotes."
                : "Hi Douglas! I'd like to order my emote pack."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-9 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-600/35 transition-all hover:bg-purple-500"
          >
            <span>{language === "pt" ? "Pedir meus emotes no WhatsApp" : "Order my emotes on WhatsApp"}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
