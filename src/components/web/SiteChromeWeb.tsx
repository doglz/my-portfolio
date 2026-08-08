import { Link } from "react-router-dom";

const navLinks = [
  { href: "#showcase", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo-web", label: "Processo" },
  { href: "#planos-web", label: "Planos" },
];

export function SiteHeaderWeb() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-sm font-bold uppercase tracking-[0.3em] text-foreground">
          Pixel<span className="text-purple-400">Chat</span>
        </Link>
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-purple-400"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contato-web"
          className="rounded-full border border-purple-500/30 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-purple-400 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          Orçamento
        </a>
      </nav>
    </header>
  );
}

export function SiteFooterWeb() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Link to="/" className="font-display text-sm font-bold uppercase tracking-[0.3em] text-foreground">
          Pixel<span className="text-purple-400">Chat</span>
        </Link>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Douglas — Sites &amp; Landing Pages para Streamers
        </p>
      </div>
    </footer>
  );
}
