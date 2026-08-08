import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { emotes, gojoEmotes } from "@/lib/emotes";

const projects = [
  {
    name: "Nova.gg",
    type: "Site oficial + links",
    desc: "Hub completo com links das redes, agenda de lives e área de patrocínio.",
    emote: emotes.dinheiro,
    span: "lg:col-span-7",
    h: "h-[320px] lg:h-[420px]",
  },
  {
    name: "Kaito Live",
    type: "Link in bio premium",
    desc: "Página de links animada, com destaque para doações e Discord.",
    emote: gojoEmotes[19], // Gojo Comemorando
    span: "lg:col-span-5",
    h: "h-[320px] lg:h-[420px]",
  },
  {
    name: "Clutch Squad",
    type: "Página de time",
    desc: "Roster, agenda de torneios e área de patrocínio para organizações.",
    emote: emotes.jogando,
    span: "lg:col-span-5",
    h: "h-[300px] lg:h-[360px]",
  },
  {
    name: "Mari VTuber",
    type: "Página de patrocínio",
    desc: "Agenda de lives, marcas parceiras, cupons e formulário de contato.",
    emote: emotes.estrelas,
    span: "lg:col-span-7",
    h: "h-[300px] lg:h-[360px]",
  },
];

export function WebShowcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-proj]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="showcase" className="border-t border-white/10 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Projetos</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.04] text-balance-tight text-foreground">
          Cada canal com uma identidade própria na web
        </h2>

        <div className="grid gap-5 lg:grid-cols-12">
          {projects.map((p) => (
            <motion.article
              key={p.name}
              data-proj
              whileHover="hover"
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0e]/80 transition-colors duration-300 hover:border-purple-500/40 ${p.span}`}
            >
              <div className={`relative ${p.h} overflow-hidden`}>
                <div className="absolute inset-0 grid-lines opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-transparent" />
                <motion.img
                  src={p.emote.src}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  variants={{ hover: { scale: 1.12, rotate: -6 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="absolute bottom-6 right-6 w-32 opacity-85 lg:w-44"
                />
                <div className="absolute left-6 top-6 space-y-2.5">
                  <div className="h-3 w-40 rounded-full bg-white/25" />
                  <div className="h-2.5 w-28 rounded-full bg-white/12" />
                  <div className="h-2.5 w-32 rounded-full bg-white/12" />
                  <div className="mt-5 h-8 w-28 rounded-full bg-purple-600/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
                </div>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                  <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-purple-400 font-semibold">
                  {p.type}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
