import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

export function SiteHeaderWeb() {
  return <Header />;
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
