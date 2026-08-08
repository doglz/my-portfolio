import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import { waLinkForPlan } from "@/lib/whatsapp";

type Plan = {
  name: string;
  qtyPt: string;
  qtyEn: string;
  price: string;
  notePt: string;
  noteEn: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Emote Solo",
    qtyPt: "1 emote",
    qtyEn: "1 emote",
    price: "3,90",
    notePt: "Para testar o traço",
    noteEn: "Great for testing style",
  },
  {
    name: "Pack Starter",
    qtyPt: "6 emotes",
    qtyEn: "6 emotes",
    price: "20,40",
    notePt: "O básico do canal",
    noteEn: "Essential channel basics",
  },
  {
    name: "Pack Creator",
    qtyPt: "12 emotes",
    qtyEn: "12 emotes",
    price: "34,90",
    notePt: "Cobre todas as reações do chat",
    noteEn: "Covers all chat reactions",
    featured: true,
  },
  {
    name: "Pack Streamer",
    qtyPt: "18 emotes",
    qtyEn: "18 emotes",
    price: "43,20",
    notePt: "Canal em crescimento",
    noteEn: "For growing channels",
  },
  {
    name: "Pack Completo",
    qtyPt: "24 emotes",
    qtyEn: "24 emotes",
    price: "49,90",
    notePt: "Identidade completa",
    noteEn: "Complete channel identity",
  },
];

export function PricingEmotes() {
  const { language } = useLanguage();
  const featured = plans.find((p) => p.featured) || plans[0];
  const rest = plans.filter((p) => !p.featured);

  return (
    <section id="planos" className="border-t border-purple-900/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>{language === "pt" ? "tabela de valores" : "pricing tiers"}</SectionLabel>
            <h2 className="max-w-xl font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {language === "pt" ? "Escolha o tamanho do seu pack" : "Choose your pack size"}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground font-mono">
            {language === "pt"
              ? "Pagamento único, sem assinatura. Clique em qualquer plano para pedir no WhatsApp."
              : "One-time payment, no subscription. Click any plan to order on WhatsApp."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Featured Plan Card (entire card clickable) */}
          <motion.a
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={waLinkForPlan(`Emotes ${featured.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-purple-500/60 bg-gradient-to-b from-purple-950/30 to-card p-8 sm:p-10 shadow-2xl shadow-purple-600/15 transition-all duration-300 hover:border-purple-400 cursor-pointer block"
          >
            {/* Subtle continuous ambient pulse */}
            <motion.div
              animate={{
                opacity: [0.2, 0.35, 0.2],
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-600/25 blur-[100px]"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-purple-600/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                {language === "pt" ? "Mais Escolhido" : "Most Popular"}
              </span>
              <h3 className="mt-8 font-sans text-4xl font-bold text-foreground sm:text-5xl group-hover:text-purple-300 transition-colors">
                {featured.name}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-purple-400 font-medium">
                {language === "pt" ? featured.qtyPt : featured.qtyEn} · {language === "pt" ? featured.notePt : featured.noteEn}
              </p>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {language === "pt"
                  ? "Ideal para quem busca um conjunto completo de reações e engajamento no chat."
                  : "Ideal for streamers wanting a complete set of chat reactions."}
              </p>
            </div>

            <div className="relative mt-10 flex items-center justify-between gap-6 border-t border-purple-900/40 pt-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground block mb-1">
                  {language === "pt" ? "Investimento único" : "One-time price"}
                </span>
                <p className="font-sans text-4xl font-bold text-foreground">
                  <span className="align-super text-lg text-muted-foreground mr-1">R$</span>
                  {featured.price}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-300 group-hover:text-white transition-colors">
                <span>{language === "pt" ? "Pedir no WhatsApp" : "Order on WhatsApp"}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </motion.a>

          {/* Standard Plans List (entire row clickable, no circle arrow button) */}
          <ul className="flex flex-col gap-4">
            {rest.map((plan, i) => (
              <motion.li
                key={plan.name}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.a
                  whileHover={{ y: -2, scale: 1.005 }}
                  whileTap={{ scale: 0.99 }}
                  href={waLinkForPlan(`Emotes ${plan.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-between gap-4 rounded-2xl border border-purple-900/30 bg-purple-950/10 backdrop-blur px-6 py-5 transition-colors duration-300 hover:border-purple-500/50 hover:bg-purple-950/25 shadow-sm hover:shadow-md cursor-pointer block"
                >
                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {language === "pt" ? plan.qtyPt : plan.qtyEn} · {language === "pt" ? plan.notePt : plan.noteEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-sans text-xl font-bold text-foreground whitespace-nowrap">
                      R$ {plan.price}
                    </p>

                    {/* Clean inline arrow matching the reference image */}
                    <span className="font-sans text-lg text-muted-foreground transition-all duration-300 group-hover:text-purple-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
