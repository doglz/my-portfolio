import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { emotes, gojoEmotes } from "@/lib/emotes";

export function WebCta() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-wcta]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.to("[data-wcta-emote]", {
        y: -28,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Olá, Douglas! Gostaria de fazer um orçamento para um site de streamer."
  );
  const whatsappUrl = `https://wa.me/5522997477083?text=${whatsappMessage}`;

  return (
    <section ref={root} id="contato-web" className="relative overflow-hidden border-t border-white/10 py-28 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[140px]" />
      <img
        data-wcta-emote
        src={emotes.estrelas.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute left-6 lg:left-12 xl:left-20 bottom-8 hidden w-32 opacity-80 xl:w-40 lg:block"
      />
      <img
        data-wcta-emote
        src={gojoEmotes[19].src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute right-6 lg:right-12 xl:right-20 top-16 hidden w-32 opacity-80 xl:w-36 lg:block"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2
          data-wcta
          className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.02] text-balance-tight text-white"
        >
          Seu canal merece um site à altura
        </h2>
        <p data-wcta className="mx-auto mt-6 max-w-md text-muted-foreground">
          Me conte sobre o seu projeto e receba uma proposta com escopo e prazo em 24h.
        </p>
        <div data-wcta className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-9 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          >
            Solicitar proposta no WhatsApp
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
