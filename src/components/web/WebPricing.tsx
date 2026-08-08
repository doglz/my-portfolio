import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";

const plans = [
  {
    name: "Link Hub",
    price: "R$ 490",
    tag: "1 página",
    items: ["Página de links animada", "Design com sua identidade", "Botões de doação e Discord", "Entrega em 5 dias"],
  },
  {
    name: "Canal Pro",
    price: "R$ 1.290",
    tag: "Mais escolhido",
    highlight: true,
    items: [
      "Site completo (até 4 seções)",
      "Agenda de lives e destaques",
      "Galeria de redes e projetos",
      "Animações GSAP + scroll suave",
      "SEO e preview social",
      "2 rodadas de ajustes",
    ],
  },
  {
    name: "Brand Studio",
    price: "sob consulta",
    tag: "Time / org",
    items: ["Multi-página e equipe", "Área de patrocínios e marcas", "Cupons e parceiros", "Suporte mensal"],
  },
];

export function WebPricing() {
  return (
    <section id="planos-web" className="border-t border-white/10 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Planos</SectionLabel>
        <h2 className="mb-16 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.04] text-balance-tight text-foreground">
          Escolha o tamanho da sua presença online
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                p.highlight
                  ? "border-purple-400/60 bg-[#0e0e12] shadow-[0_0_35px_rgba(168,85,247,0.2)] lg:-mt-6 lg:pb-12"
                  : "border-white/10 bg-[#0c0c0e]/60"
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-purple-400 font-bold">
                {p.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">{p.name}</h3>
              <p className="mt-4 font-display text-4xl font-bold text-white">{p.price}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#contato-web"
                className={`mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "border border-purple-500/30 text-foreground hover:border-purple-400 hover:text-purple-400"
                }`}
              >
                Começar projeto →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
