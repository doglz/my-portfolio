import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionLabel } from "@/components/SectionLabel";

const steps = [
  { t: "Call de descoberta", d: "Entendo seu canal, público e o que você quer vender ou divulgar." },
  { t: "Direção visual", d: "Paleta, tipografia e referências alinhadas com sua identidade de streamer." },
  { t: "Design + animação", d: "Layout desenhado e animado com GSAP e Framer Motion, seção por seção." },
  { t: "Publicação", d: "Site no ar com domínio próprio, otimizado e pronto para receber tráfego." },
];

export function WebProcess() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-wline]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: "[data-wsteps]",
            start: "top 85%",
            end: "+=900",
            scrub: 1.4,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-wstep]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="processo-web" className="border-t border-white/10 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Como funciona</SectionLabel>
        <h2 className="mb-20 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.04] text-balance-tight text-foreground">
          Do briefing ao site no ar em até 3 semanas
        </h2>

        <div data-wsteps className="relative pt-10">
          <div className="absolute left-0 top-0 h-px w-full bg-white/10" />
          <div data-wline className="absolute left-0 top-0 h-px w-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <div key={s.t} data-wstep className="relative">
                <span className="absolute -top-[2.6rem] left-0 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)]" />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-purple-400">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.t}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
