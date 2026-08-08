import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  customLinks?: { href: string; label: string }[];
}

export function Header({ customLinks }: HeaderProps = {}) {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isPt = language === "pt";

  // Context-aware default links matching the portfolio design pattern
  const getDefaultLinks = () => {
    if (location.pathname === "/emotes") {
      return [
        { href: "/", label: isPt ? "Portfólio" : "Portfolio" },
        { href: "#galeria", label: isPt ? "Galeria" : "Gallery" },
        { href: "#como-funciona", label: isPt ? "Diferenciais" : "Features" },
        { href: "#processo-emotes", label: isPt ? "Processo" : "Process" },
        { href: "#planos", label: isPt ? "Planos" : "Pricing" },
        { href: "#faq", label: "FAQ" },
        { href: "/website", label: isPt ? "Websites" : "Websites" },
      ];
    }
    if (location.pathname === "/website") {
      return [
        { href: "/", label: isPt ? "Portfólio" : "Portfolio" },
        { href: "#showcase", label: isPt ? "Projetos" : "Showcase" },
        { href: "#servicos", label: isPt ? "Diferenciais" : "Features" },
        { href: "#processo-web", label: isPt ? "Processo" : "Process" },
        { href: "#planos-web", label: isPt ? "Planos" : "Pricing" },
        { href: "/emotes", label: "Emotes" },
        { href: "#contato-web", label: isPt ? "Contato" : "Contact" },
      ];
    }
    // Main portfolio page
    return [
      { href: "#sobre", label: isPt ? "Sobre" : "About" },
      { href: "#projetos", label: isPt ? "Projetos" : "Projects" },
      { href: "#processo", label: isPt ? "Processo" : "Process" },
      { href: "#planos", label: isPt ? "Planos" : "Pricing" },
      { href: "/emotes", label: "Emotes" },
      { href: "/website", label: isPt ? "Websites" : "Websites" },
      { href: "#contato", label: isPt ? "Contato" : "Contact" },
    ];
  };

  const navLinks = customLinks || getDefaultLinks();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/" || location.pathname === "/portfolio") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-lg font-bold tracking-tight cursor-pointer"
          aria-label="Ir para o início"
        >
          <span className="text-primary">&lt;</span>Douglas<span className="text-primary">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.label}
              </a>
            )
          )}
          <button
            onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground hover:bg-secondary/50 px-2 py-1 rounded-md"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium text-xs uppercase">{language}</span>
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground hover:bg-secondary/50 px-2 py-1 rounded-md"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium text-xs uppercase">{language}</span>
          </button>
          <button
            className="text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 px-6 py-4 text-sm text-muted-foreground">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-foreground transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-foreground transition-colors py-1"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
