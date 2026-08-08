import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Menu, X } from "lucide-react";
import { waLinkForEmotes } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { href: "#galeria", labelPt: "Galeria", labelEn: "Gallery" },
  { href: "#como-funciona", labelPt: "Processo", labelEn: "Process" },
  { href: "#planos", labelPt: "Planos", labelEn: "Pricing" },
  { href: "#faq", labelPt: "FAQ", labelEn: "FAQ" },
];

export function SiteHeaderEmotes() {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-purple-900/30 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            to="/portfolio"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-purple-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Portfólio</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-purple-400"
              >
                {language === "pt" ? l.labelPt : l.labelEn}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="flex items-center gap-1.5 rounded-full border border-purple-900/40 bg-purple-950/20 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-purple-500 hover:text-foreground"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-purple-400" />
            <span className="uppercase">{language}</span>
          </button>

          <a
            href={waLinkForEmotes(
              language === "pt"
                ? "Olá, Douglas! Gostaria de fazer um orçamento de emotes."
                : "Hi Douglas! I'd like to get a quote for emotes."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-500 hover:scale-105"
          >
            {language === "pt" ? "Orçamento WhatsApp" : "Get Quote"}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="flex items-center gap-1 rounded-full border border-purple-900/40 bg-purple-950/20 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            <Globe className="h-3 w-3 text-purple-400" />
            <span className="uppercase">{language}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-purple-900/30 bg-background px-6 py-6 md:hidden flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-purple-400 py-1"
            >
              {language === "pt" ? l.labelPt : l.labelEn}
            </a>
          ))}
          <a
            href={waLinkForEmotes("Olá, Douglas! Gostaria de fazer um orçamento de emotes.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 rounded-full bg-purple-600 px-5 py-2.5 text-center text-xs font-semibold text-white shadow-md shadow-purple-600/30"
          >
            {language === "pt" ? "Falar no WhatsApp" : "Talk on WhatsApp"}
          </a>
        </div>
      )}
    </header>
  );
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
