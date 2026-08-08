import { motion } from "framer-motion";
import { EmoteCloud } from "./EmoteCloud";
import { waLinkForEmotes } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroEmotes() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Background Purple Ambient Light */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
      
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-purple-300 bg-purple-950/20 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            {language === "pt" ? "Estúdio de Emotes · Twitch & Discord" : "Emotes Studio · Twitch & Discord"}
          </motion.div>

          {/* Heading Reveal */}
          <h1 className="font-sans text-4xl font-bold tracking-tight leading-[1.05] sm:text-6xl text-foreground text-balance overflow-hidden">
            {language === "pt" ? (
              <>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Transforme sua
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-purple-400 underline decoration-purple-500/40 underline-offset-4"
                >
                  live em uma marca
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  memorável.
                </motion.span>
              </>
            ) : (
              <>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Turn your
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-purple-400 underline decoration-purple-500/40 underline-offset-4"
                >
                  stream into an
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  unforgettable brand.
                </motion.span>
              </>
            )}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 h-px w-full max-w-md bg-purple-900/40 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {language === "pt"
              ? "Emotes personalizados sob medida para Twitch e Discord. Destaque sua personalidade e fortaleça sua comunidade com artes exclusivas."
              : "Tailor-made custom emotes for Twitch and Discord. Highlight your personality and boost your community with exclusive artwork."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href={waLinkForEmotes(
                language === "pt"
                  ? "Olá, Douglas! Quero encomendar meus emotes."
                  : "Hi Douglas! I'd like to order my emotes."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-600/30"
            >
              <span>{language === "pt" ? "Quero meus emotes" : "Get my emotes"}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#galeria"
              className="inline-flex items-center gap-3 rounded-full border border-purple-900/40 bg-purple-950/20 backdrop-blur px-8 py-4 text-sm font-semibold text-foreground/90 transition-colors duration-300 hover:border-purple-500/60 hover:text-foreground"
            >
              {language === "pt" ? "Ver galeria" : "View gallery"}
            </motion.a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-purple-900/30 pt-8"
          >
            {[
              ["+400", language === "pt" ? "emotes entregues" : "delivered emotes"],
              ["72h", language === "pt" ? "prazo médio" : "avg delivery time"],
              ["100%", language === "pt" ? "arte original" : "original art"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-sans text-2xl font-bold text-foreground">{value}</dt>
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <EmoteCloud />
      </div>
    </section>
  );
}
