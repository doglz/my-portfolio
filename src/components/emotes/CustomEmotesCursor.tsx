import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomEmotesCursorProps {
  variant?: "default" | "purple";
}

export function CustomEmotesCursor({ variant = "purple" }: CustomEmotesCursorProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // High performance spring physics for smooth trailing cursor
  const cursorX = useSpring(-100, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 28 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      // Target interactive elements cleanly without flickering on card child boundaries
      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='hover']")
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const isDefault = variant === "default";

  const ringStyles = isDefault
    ? "border-white/50 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.35)] backdrop-blur-[1px]"
    : "border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)] backdrop-blur-[1px]";

  const dotStyles = isDefault
    ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
    : "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center w-8 h-8"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Trailing Outer Ring */}
      <motion.div
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.6 : 1,
          opacity: isVisible ? (isHovered ? 0.95 : 0.7) : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className={`absolute inset-0 rounded-full border-2 ${ringStyles}`}
      />
      {/* Center Pointer Dot */}
      <motion.div
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className={`h-2 w-2 rounded-full ${dotStyles}`}
      />
    </motion.div>
  );
}


