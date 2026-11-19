import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

interface SitePreviewProps {
  url: string;
  title: string;
  eager?: boolean;
}

// Live screenshots of the first screen (above the fold) of each project's site.
// Sources are tried in order; if one fails, the next one is used.
const previewSources = (url: string) => {
  const encoded = encodeURIComponent(url);
  return [
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900&waitForTimeout=1500`,
    `https://s0.wp.com/mshots/v1/${encoded}?w=1440&h=900`,
  ];
};

const SitePreview = ({ url, title, eager = false }: SitePreviewProps) => {
  const sources = previewSources(url);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
  }, [url]);

  const failed = sourceIndex >= sources.length;
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
          key={sources[sourceIndex]}
          src={sources[sourceIndex]}
          alt={`Prévia do site ${title}`}
          width={1440}
          height={900}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setSourceIndex((i) => i + 1);
          }}
          className={`absolute inset-x-0 top-7 bottom-0 block h-[calc(100%-1.75rem)] w-full object-cover object-top pointer-events-none select-none transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default SitePreview;
