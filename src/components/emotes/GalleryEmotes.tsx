import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import { galleryEmotes, gojoEmotes, marinEmotes, type EmoteItem } from "@/lib/emotes";
import { SectionLabel } from "./SectionLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import { waLinkForEmotes } from "@/lib/whatsapp";

// Magnetic Emote Card Component with Direct 112px Download Option
function MagneticEmoteCard({ emote, index }: { emote: EmoteItem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  // Mouse offset relative to static container center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics
  const springConfig = { stiffness: 200, damping: 18 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt
  const rotateX = useTransform(magneticY, [-15, 15], [5, -5]);
  const rotateY = useTransform(magneticX, [-15, 15], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic displacement (-10px to 10px max)
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger browser download of 112px transparent PNG
    const link = document.createElement("a");
    link.href = emote.src;
    link.download = `emote_${emote.name}_112x112.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-500"
    >
      {/* STATIC OUTER WRAPPER: Handles mouse events, NEVER moves */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full"
      >
        {/* MOVING INNER CARD: Smooth spring transforms inside static container */}
        <motion.figure
          style={{
            x: magneticX,
            y: magneticY,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.04, zIndex: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative flex h-full flex-col items-center justify-between rounded-2xl border border-purple-900/30 bg-purple-950/10 backdrop-blur p-4 transition-colors duration-300 hover:border-purple-500/60 hover:bg-purple-950/25 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 select-none"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-x-4 bottom-2 h-1/2 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />
          </div>

          <div className="relative my-3 flex h-20 w-20 items-center justify-center pointer-events-none">
            <img
              src={emote.src}
              alt={`Emote ${emote.label}`}
              loading="lazy"
              width={112}
              height={112}
              className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md pointer-events-none"
            />
          </div>

          <figcaption className="w-full border-t border-purple-900/30 pt-3 text-center flex flex-col items-center gap-2">
            <div className="flex items-center justify-between w-full px-0.5">
              <span className="font-sans text-xs font-semibold text-foreground group-hover:text-purple-300 transition-colors">
                {emote.label}
              </span>
              <span className="font-mono text-[9px] text-purple-400/80 uppercase">
                112px
              </span>
            </div>

            {/* Direct Free 112px Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className={`w-full flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                downloaded
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                  : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-md hover:shadow-purple-600/20 active:scale-95"
              }`}
              title="Baixar Grátis em 112x112px"
            >
              <Download className="h-3 w-3" />
              <span>{downloaded ? "Baixado!" : "Baixar (Grátis)"}</span>
            </button>
          </figcaption>
        </motion.figure>
      </div>
    </motion.div>
  );
}

export function GalleryEmotes() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"compact" | "gojo" | "marin">("compact");

  const displayEmotes =
    activeFilter === "gojo"
      ? gojoEmotes
      : activeFilter === "marin"
      ? marinEmotes
      : galleryEmotes; // Compact alternating 12 emotes

  return (
    <section id="galeria" className="relative border-t border-purple-900/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>{language === "pt" ? "download grátis" : "free download"}</SectionLabel>
            <h2 className="max-w-xl font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {language === "pt"
                ? "Baixe Emotes Gratuitamente em 112px"
                : "Download Free Emotes in 112px"}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 rounded-full border border-purple-900/40 bg-purple-950/20 p-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter("compact")}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeFilter === "compact"
                  ? "bg-purple-600 font-semibold text-white shadow-md shadow-purple-600/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {language === "pt" ? "Alternados (12)" : "Alternating (12)"}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("gojo")}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeFilter === "gojo"
                  ? "bg-purple-600 font-semibold text-white shadow-md shadow-purple-600/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pack Gojo ({gojoEmotes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("marin")}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                activeFilter === "marin"
                  ? "bg-purple-600 font-semibold text-white shadow-md shadow-purple-600/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pack Marin ({marinEmotes.length})
            </button>
          </div>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {displayEmotes.map((emote, i) => (
            <MagneticEmoteCard key={emote.id || emote.name + i} emote={emote} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-dashed border-purple-800/40 p-8 sm:flex-row bg-purple-950/10 backdrop-blur">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {language === "pt"
              ? "Precisa de um mascote customizado com a sua cara ou com traços personalizados? Criamos qualquer expressão sob medida para a sua live."
              : "Need a custom mascot or personalized expressions tailored to your brand? We can draw any expression for your stream."}
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href={waLinkForEmotes(
              language === "pt"
                ? "Olá, Douglas! Vi a galeria de emotes e gostaria de pedir um orçamento."
                : "Hi Douglas! I saw your emote gallery and would like a custom quote."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-500"
          >
            {language === "pt" ? "Pedir Pacote Customizado" : "Request Custom Pack"} →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
