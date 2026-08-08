import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { emotes } from "@/lib/emotes";

const lines = ["Sites que fazem", "seu canal parecer", "grande"];

export function WebHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-wh-line] > span", { yPercent: 115, duration: 1.05, stagger: 0.09 })
        .from("[data-wh-fade]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(
          "[data-wh-mock]",
          { opacity: 0, y: 60, rotateX: 18, duration: 1.1, stagger: 0.12 },
          "-=0.7",
        );

      gsap.to("[data-wh-mock]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-36">
      {/* Luminous Purple Glow Backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[160px] transform-gpu will-change-transform" />

      <div className="relative mx-auto max-w-7xl px-6">
        <p data-wh-fade className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-purple-400">
          Sites &amp; landing pages para streamers
        </p>

        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[1.04] text-balance-tight text-foreground pb-2">
          {lines.map((line, i) => (
            <span key={line} data-wh-line className="block overflow-hidden pb-2 pt-0.5">
              <span className="block">
                {i === 2 ? <em className="not-italic text-purple-400">{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <p data-wh-fade className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Horário de lives, links das redes sociais e área de patrocínio — tudo em um
            site rápido, animado e com a cara do seu canal.
          </p>
          <div data-wh-fade className="flex flex-wrap items-center gap-4 lg:justify-end">
            <a
              href="#planos-web"
              className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              Quero meu site
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-3 rounded-full border border-purple-500/30 px-8 py-4 text-sm font-semibold text-foreground/90 transition-colors duration-300 hover:border-purple-400/70 hover:text-purple-400"
            >
              Ver projetos
            </a>
          </div>
        </div>

        {/* 3 Core Pillars: Links Clicáveis, Horários de Live, Patrocínio */}
        <div className="mt-16 grid gap-6 [perspective:1400px] lg:grid-cols-3">
          
          {/* Card 1: Links Clicáveis (Redes Sociais & Hub UI) */}
          <motion.div
            data-wh-mock
            whileHover={{ y: -8, rotateX: -4, rotateY: 4 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0c0c0e]/90 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] [transform-style:preserve-3d]"
          >
            {/* Top Bar Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/90 font-semibold">
                links &amp; redes sociais
              </span>
            </div>

            {/* Link Hub Content */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 via-black/60 to-black p-5">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-purple-400 bg-purple-950/60 p-0.5 flex items-center justify-center overflow-hidden">
                    <img src={emotes.hype.src} alt="" className="h-10 w-10 object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    Seu Canal <span className="rounded bg-purple-400/20 px-1.5 py-0.5 font-mono text-[9px] text-purple-300">ONLINE</span>
                  </h4>
                  <p className="text-xs text-muted-foreground">hub.seu-canal.gg</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-purple-400/40 bg-purple-500/15 px-3.5 py-2.5 transition-colors group-hover:border-purple-400/70">
                  <span className="text-xs font-semibold text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
                    Canal da Twitch
                  </span>
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 font-medium text-gray-200">
                    <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/></svg>
                    Servidor no Discord
                  </span>
                  <span className="font-mono text-[10px] text-purple-300">CLIQUE</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 font-medium text-gray-200">
                    <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram &amp; TikTok
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">@SEUCANAL</span>
                </div>
              </div>
            </div>

            <p className="mt-4 px-1 font-display text-sm font-semibold text-white flex items-center justify-between">
              <span>Links Clicáveis das Redes</span>
              <span className="text-xs font-mono font-normal text-purple-400">01 / LINKS</span>
            </p>
          </motion.div>

          {/* Card 2: Horários de Live (Schedule UI) */}
          <motion.div
            data-wh-mock
            whileHover={{ y: -8, rotateX: -4, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0c0c0e]/90 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] [transform-style:preserve-3d]"
          >
            {/* Top Bar Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/90 font-semibold">
                horário de lives
              </span>
            </div>

            {/* Schedule UI Content */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 via-black/60 to-black p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Cronograma Semanal</span>
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 font-mono text-[10px] text-purple-300 font-bold">SEMANAL</span>
              </div>

              {/* Day Selector Bar */}
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {[
                  { day: "SEG", active: false },
                  { day: "TER", active: true },
                  { day: "QUI", active: false },
                  { day: "SÁB", active: false },
                ].map((item) => (
                  <div
                    key={item.day}
                    className={`rounded-lg py-1.5 text-center font-mono text-[11px] font-bold ${
                      item.active
                        ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                        : "bg-white/5 text-muted-foreground border border-white/5"
                    }`}
                  >
                    {item.day}
                  </div>
                ))}
              </div>

              {/* Active Day Session */}
              <div className="rounded-xl border border-purple-400/40 bg-purple-500/15 p-3 mb-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-purple-300 uppercase">TERÇA (HOJE) · 19:00 BRT</span>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> AO VIVO
                  </span>
                </div>
                <h5 className="mt-1 font-display text-xs font-bold text-white">Valorant Rank Up &amp; Sorteio</h5>
                <p className="text-[10px] text-muted-foreground">Interação com inscritos no Discord</p>
              </div>

              {/* Upcoming Session */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">QUINTA-FEIRA · 20:00 BRT</span>
                </div>
                <h5 className="mt-1 font-display text-xs font-semibold text-gray-200">Just Chatting &amp; Reações</h5>
              </div>
            </div>

            <p className="mt-4 px-1 font-display text-sm font-semibold text-white flex items-center justify-between">
              <span>Horário de Lives</span>
              <span className="text-xs font-mono font-normal text-purple-400">02 / AGENDA</span>
            </p>
          </motion.div>

          {/* Card 3: Patrocínios & Marcas (Sponsorships UI) */}
          <motion.div
            data-wh-mock
            whileHover={{ y: -8, rotateX: -4, rotateY: -4 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0c0c0e]/90 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] [transform-style:preserve-3d]"
          >
            {/* Top Bar Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/90 font-semibold">
                patrocínios &amp; marcas
              </span>
            </div>

            {/* Sponsorship UI Content */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 via-black/60 to-black p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Marcas Parceiras</span>
                <span className="rounded bg-purple-400/20 px-1.5 py-0.5 font-mono text-[9px] text-purple-300 font-bold">CUPONS &amp; PARCERIAS</span>
              </div>

              {/* Sponsor Slots Grid */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between rounded-xl border border-purple-400/40 bg-purple-500/15 p-3">
                  <div>
                    <h5 className="font-display text-xs font-bold text-white flex items-center gap-1.5">
                      Logitech G <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] text-emerald-400 font-mono">15% OFF</span>
                    </h5>
                    <p className="text-[10px] text-muted-foreground">Cupom: <span className="font-mono text-purple-300">STREAMER15</span></p>
                  </div>
                  <span className="rounded-full bg-purple-500/20 p-1.5 text-purple-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                  <div>
                    <h5 className="font-display text-xs font-bold text-gray-200">Monster Energy</h5>
                    <p className="text-[10px] text-muted-foreground">Parceiro Oficial de Bebida</p>
                  </div>
                  <span className="font-mono text-[10px] text-purple-400">PARCEIRO</span>
                </div>
              </div>

              {/* Sponsor CTA Slot */}
              <div className="rounded-xl border border-dashed border-purple-400/50 bg-purple-500/5 p-2.5 text-center">
                <p className="font-mono text-[10px] text-purple-300 font-semibold">Anuncie no canal / Contato comercial</p>
              </div>
            </div>

            <p className="mt-4 px-1 font-display text-sm font-semibold text-white flex items-center justify-between">
              <span>Área de Patrocínio</span>
              <span className="text-xs font-mono font-normal text-purple-400">03 / PATROCÍNIO</span>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
