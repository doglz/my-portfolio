import { motion, useSpring, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { heroEmotes, getEmoteClipPath } from "@/lib/emotes";

interface EmotePosition {
  top: string;
  left: string;
  size: number;
  depth: number;
  initialRotate: number;
  blur: string;
  glowBg: string;
}

const desktopPositions: EmotePosition[] = [
  {
    top: "4%",
    left: "36%",
    size: 135,
    depth: 1.4,
    initialRotate: -6,
    blur: "blur-[3px]",
    glowBg: "bg-purple-600/35",
  },
  {
    top: "15%",
    left: "70%",
    size: 108,
    depth: 0.8,
    initialRotate: 8,
    blur: "blur-[4px]",
    glowBg: "bg-pink-500/35",
  },
  {
    top: "26%",
    left: "7%",
    size: 120,
    depth: 1.1,
    initialRotate: -4,
    blur: "blur-[3px]",
    glowBg: "bg-amber-500/35",
  },
  {
    top: "32%",
    left: "38%",
    size: 190,
    depth: 1.8,
    initialRotate: 3,
    blur: "blur-none", // Main central focal emote (sharp!)
    glowBg: "bg-purple-500/40",
  },
  {
    top: "54%",
    left: "73%",
    size: 124,
    depth: 0.9,
    initialRotate: -8,
    blur: "blur-[3px]",
    glowBg: "bg-rose-500/35",
  },
  {
    top: "64%",
    left: "15%",
    size: 108,
    depth: 1.5,
    initialRotate: 5,
    blur: "blur-[2px]",
    glowBg: "bg-emerald-500/35",
  },
  {
    top: "70%",
    left: "48%",
    size: 94,
    depth: 0.7,
    initialRotate: -3,
    blur: "blur-[4px]",
    glowBg: "bg-cyan-500/35",
  },
  {
    top: "8%",
    left: "8%",
    size: 88,
    depth: 0.6,
    initialRotate: 10,
    blur: "blur-[5px]",
    glowBg: "bg-indigo-500/35",
  },
];

// Mobile positions: 7 emotes carefully arranged in a vibrant orbital ring around the main center emote
const mobilePositions: Record<number, EmotePosition> = {
  3: {
    top: "30%",
    left: "28%",
    size: 130,
    depth: 1.5,
    initialRotate: 2,
    blur: "blur-none",
    glowBg: "bg-purple-500/45",
  },
  0: {
    top: "3%",
    left: "18%",
    size: 80,
    depth: 1.0,
    initialRotate: -6,
    blur: "blur-[1px]",
    glowBg: "bg-purple-600/35",
  },
  1: {
    top: "5%",
    left: "58%",
    size: 80,
    depth: 0.8,
    initialRotate: 8,
    blur: "blur-[2px]",
    glowBg: "bg-pink-500/35",
  },
  2: {
    top: "35%",
    left: "3%",
    size: 76,
    depth: 1.1,
    initialRotate: -4,
    blur: "blur-[2px]",
    glowBg: "bg-amber-500/35",
  },
  5: {
    top: "37%",
    left: "72%",
    size: 78,
    depth: 1.0,
    initialRotate: 5,
    blur: "blur-[2px]",
    glowBg: "bg-emerald-500/35",
  },
  6: {
    top: "68%",
    left: "12%",
    size: 82,
    depth: 1.2,
    initialRotate: 5,
    blur: "blur-[1px]",
    glowBg: "bg-cyan-500/35",
  },
  4: {
    top: "66%",
    left: "64%",
    size: 82,
    depth: 0.9,
    initialRotate: -8,
    blur: "blur-[2px]",
    glowBg: "bg-purple-500/35",
  },
};

const mobileIndices = [3, 0, 1, 2, 5, 6, 4];
const desktopIndices = [0, 1, 2, 3, 4, 5, 6, 7];

export function EmoteCloud() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Spring physics for mouse parallax inertia
  const springX = useSpring(0, { stiffness: 80, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleMediaChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
      springX.set(nx);
      springY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, springX, springY]);

  const activeIndices = isMobile ? mobileIndices : desktopIndices;

  return (
    <div className="relative h-[390px] sm:h-[480px] lg:h-[560px] w-full select-none">
      {/* Central Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[130px]" />
      
      {activeIndices.map((i) => {
        const emote = heroEmotes[i];
        if (!emote) return null;

        const p = isMobile
          ? mobilePositions[i] || mobilePositions[3]
          : desktopPositions[i] || desktopPositions[0];

        const offsetX = shouldReduceMotion ? 0 : mousePos.x * 22 * p.depth;
        const offsetY = shouldReduceMotion ? 0 : mousePos.y * 22 * p.depth;
        const clipPath = getEmoteClipPath(emote.name);

        return (
          <motion.div
            key={emote.name + i}
            initial={{ opacity: 0, scale: 0.4, y: 40, rotate: p.initialRotate * 2 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: shouldReduceMotion ? 0 : [0, 8 + (i % 3) * 4, 0],
              rotate: shouldReduceMotion ? p.initialRotate : [p.initialRotate, p.initialRotate + (i % 2 === 0 ? 3 : -3), p.initialRotate],
            }}
            transition={{
              opacity: { duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.8, delay: i * 0.09, type: "spring", stiffness: 180, damping: 18 },
              y: shouldReduceMotion ? {} : { duration: 4 + (i % 4) * 0.8, repeat: Infinity, ease: "easeInOut" },
              rotate: shouldReduceMotion ? {} : { duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute will-change-transform group cursor-pointer"
          >
            {/* Soft circular aura glow centered behind emote */}
            <div
              className={`pointer-events-none absolute inset-3 rounded-full ${p.glowBg} blur-2xl opacity-60 transition-all duration-300 group-hover:opacity-90 group-hover:scale-125`}
            />

            {/* Emote Image */}
            <motion.img
              whileHover={{ scale: 1.14, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              src={emote.src}
              alt={`Emote ${emote.label}`}
              width={p.size}
              height={p.size}
              style={{ clipPath }}
              className={`relative z-10 h-auto w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ${p.blur} group-hover:blur-none group-hover:drop-shadow-[0_20px_35px_rgba(168,85,247,0.5)]`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
