import { Header } from "@/components/Header";

export function SiteHeaderEmotes() {
  return <Header />;
}


export function SiteFooterEmotes() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-purple-900/30 bg-purple-950/10 pt-16 pb-28 sm:pb-16 select-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-purple-900/30">
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-2 font-sans text-base font-bold tracking-tight text-foreground">
              <span>Douglas</span>
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase text-purple-300">
                Emotes Studio
              </span>
            </a>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              {language === "pt"
                ? "Ilustrações e emotes personalizados sob medida para Stream & Discord. Transformando seu chat e fortalecendo sua comunidade com artes exclusivas."
                : "Tailor-made custom illustrations and emotes for Stream & Discord. Elevating your chat and community with unique art."}
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-300">
              Navegação
            </h4>
            <ul className="space-y-2 font-mono text-xs text-muted-foreground">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-purple-400 transition-colors">
                    {language === "pt" ? l.labelPt : l.labelEn}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/portfolio" className="hover:text-purple-400 transition-colors">
                  ← {language === "pt" ? "Portfólio Principal" : "Main Portfolio"}
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-300">
              {language === "pt" ? "Encomendas" : "Orders"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {language === "pt"
                ? "Atendimento direto no WhatsApp para tirar dúvidas, orçamentos e prazos."
                : "Direct support via WhatsApp for quotes, questions and timeframe."}
            </p>
            <a
              href={waLinkForEmotes(
                language === "pt"
                  ? "Olá, Douglas! Vim pelo rodapé e quero encomendar emotes."
                  : "Hi Douglas! I came from the footer and want to order emotes."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600/90 hover:bg-purple-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-all hover:scale-105"
            >
              <span>{language === "pt" ? "Falar no WhatsApp" : "Chat on WhatsApp"}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Douglas Emotes Studio. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
          <p className="font-mono text-[11px] text-purple-400/80">
            {language === "pt" ? "Feito para streamers & criadores ✨" : "Built for streamers & creators ✨"}
          </p>
        </div>
      </div>
    </footer>
  );
}
