import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionLabel } from "@/components/SectionLabel";

const features = [
  { n: "01", t: "Design exclusivo", d: "Nada de template. Direção de arte feita em cima da sua identidade visual." },
  { n: "02", t: "Animações reais", d: "Scroll suave, parallax e microinterações que dão sensação de produto caro." },
  { n: "03", t: "Horários de live", d: "Agenda semanal clara com destaques para dias e horários de transmissão." },
  { n: "04", t: "Área de patrocínio", d: "Espaço exclusivo para marcas parceiras, banners e cupons de desconto." },
  { n: "05", t: "Hub de redes", d: "Links diretos para Twitch, Discord, Instagram, TikTok e loja de produtos." },
  { n: "06", t: "SEO e social", d: "Preview bonito em Discord, X e Instagram, com metadados e compartilhamento fácil." },
];

export function WebFeatures() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-feat]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-feat-grid]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="servicos" className="border-t border-white/10 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>O que entra no site</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.04] text-balance-tight text-foreground">
          Tudo que um canal profissional precisa fora da live
        </h2>

        <div data-feat-grid className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.n}
              data-feat
              className="group relative bg-[#0a0a0c] p-8 transition-colors duration-300 hover:bg-purple-600/10"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-purple-400 font-bold">{f.n}</span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{f.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-purple-400 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
