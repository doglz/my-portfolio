const items = [
  "Alta Conversão",
  "Design Estratégico",
  "Entrega em até 7 dias",
  "Copywriting Persuasivo",
  "Mobile First",
  "SEO Otimizado",
];

const loop = [...items, ...items];

const fadeMask =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

const Marquee = () => {
  return (
    <section
      aria-label="Diferenciais"
      className="relative overflow-hidden border-y border-border/50 bg-secondary/30 py-5 sm:py-6"
    >
      <div
        className="flex w-max animate-marquee will-change-transform [backface-visibility:hidden]"
        style={{
          WebkitMaskImage: fadeMask,
          maskImage: fadeMask,
        }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 sm:mx-10 inline-flex items-center gap-4 sm:gap-6 whitespace-nowrap font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-muted-foreground"
            aria-hidden={i >= items.length ? true : undefined}
          >
            <span className="text-primary text-base sm:text-lg leading-none">★</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
