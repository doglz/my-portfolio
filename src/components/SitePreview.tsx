import { useState } from "react";
import { Globe } from "lucide-react";

interface SitePreviewProps {
  slug: string;
  url: string;
  title: string;
  eager?: boolean;
}

// Shows the first screen of the project's real site.
// Screenshots live in public/previews/<slug>.jpg and are refreshed
// automatically by .github/workflows/project-previews.yml.
const SitePreview = ({ slug, url, title, eager = false }: SitePreviewProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const host = new URL(url).hostname.replace(/^www\./, "");

  return (
    <div className="relative h-full w-full bg-secondary/50">
      {/* Browser-style top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-border/50 bg-card/90 px-3 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{host}</span>
      </div>

      {!loaded && !failed && (
        <div className="absolute inset-0 top-7 animate-pulse bg-gradient-to-br from-secondary/60 via-secondary/30 to-secondary/60" />
      )}

      {failed ? (
        <div className="absolute inset-0 top-7 flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
          <Globe className="h-10 w-10" />
          <span className="font-mono text-xs">{host}</span>
        </div>
      ) : (
        <img
          src={`/previews/${slug}.jpg`}
          alt={`Prévia do site ${title}`}
          width={1440}
          height={900}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-x-0 top-7 bottom-0 block h-[calc(100%-1.75rem)] w-full object-cover object-top pointer-events-none select-none transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default SitePreview;
