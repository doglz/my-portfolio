import { Github, Instagram, Mail, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Code2, Layout, Palette, Terminal, GitBranch, FileCode2, Figma, Menu, X, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import projectRobuxStation from "@/assets/project-robux-station.png";
import projectShardServices from "@/assets/project-shard-services.png";
import projectPortfolio from "@/assets/project-portfolio.png";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const techs = [
  { name: "HTML5", icon: <FileCode2 className="w-5 h-5" /> },
  { name: "CSS3", icon: <Palette className="w-5 h-5" /> },
  { name: "JavaScript", icon: <Terminal className="w-5 h-5" /> },
  { name: "React", icon: <Code2 className="w-5 h-5" /> },
  { name: "TypeScript", icon: <FileCode2 className="w-5 h-5" /> },
  { name: "Figma", icon: <Figma className="w-5 h-5" /> },
  { name: "Git", icon: <GitBranch className="w-5 h-5" /> },
  { name: "GitHub", icon: <Github className="w-5 h-5" /> },
];

// Generate deterministic particle positions
const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 100),
  y: ((i * 53 + 7) % 100),
  size: (i % 3) + 1,
  duration: 3 + (i % 5) * 1.5,
  delay: (i % 7) * 0.4,
}));

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  const projects = [
    {
      title: "Robux Station",
      description: t.projectRobuxDesc,
      tags: ["React", "Tailwind", "Vite"],
      image: projectRobuxStation,
      github: null,
      live: "https://robuxstationdc.com/",
    },
    {
      title: "Shard Services",
      description: t.projectShardDesc,
      tags: ["React", "Tailwind", "Vite"],
      image: projectShardServices,
      github: null,
      live: "https://services.shardweb.app/",
    },
    {
      title: "Portfólio Pessoal",
      description: t.projectPortfolioDesc,
      tags: ["React", "Tailwind", "Framer Motion"],
      image: projectPortfolio,
      github: null,
      live: "https://douglz.dev",
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-lg font-bold tracking-tight cursor-pointer">
            <span className="text-primary">&lt;</span>Douglas<span className="text-primary">/&gt;</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#sobre" className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{t.navAbout}</a>
            <a href="#skills" className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{t.navSkills}</a>
            <a href="#projetos" className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{t.navProjects}</a>
            <a href="#contato" className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{t.navContact}</a>
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/40 hover:text-primary transition-all duration-300 text-xs font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "pt" ? "EN" : "PT"}
            </button>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/40 hover:text-primary transition-all duration-300 text-xs font-medium text-muted-foreground"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "pt" ? "EN" : "PT"}
            </button>
            <button className="text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4 px-6 py-4 text-sm text-muted-foreground">
                <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">{t.navAbout}</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">{t.navSkills}</a>
                <a href="#projetos" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">{t.navProjects}</a>
                <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground transition-colors">{t.navContact}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
        {/* Particles */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: particlesY }}>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [0, -30, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <motion.div className="max-w-3xl text-center relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.available}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {t.heroTitle1}
            <span className="block text-primary">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t.heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full font-semibold px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]">
              <a href="#projetos">{t.viewProjects}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full font-semibold px-8 transition-all duration-300 hover:scale-[1.02] hover:border-primary/60">
              <a href="#contato">{t.talkToMe}</a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.a
          href="#sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce z-10"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">{t.aboutTag}</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t.aboutName.split(",")[0]}<span className="text-primary">,</span>{t.aboutName.split(",")[1]}
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t.aboutP1[0]}<span className="text-foreground font-medium">{t.aboutP1[1]}</span>{t.aboutP1[2]}
              </p>
              <p>
                {t.aboutP2[0]}<span className="text-foreground font-medium">{t.aboutP2[1]}</span>{t.aboutP2[2]}
              </p>
              <p>
                {t.aboutP3[0]}<span className="text-foreground font-medium">{t.aboutP3[1]}</span>{t.aboutP3[2]}
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {[
              { val: "1+", label: t.statYear },
              { val: "PO", label: t.statPO },
              { val: "UI", label: t.statUI },
              { val: "∞", label: t.statGrow },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Card className="bg-card border-border/50 p-6 hover:border-primary/30 transition-colors duration-300">
                  <div className="text-3xl font-bold text-primary mb-1">{item.val}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">{t.skillsTag}</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              {t.skillsTitle1}<span className="text-primary">&amp;</span>{t.skillsTitle2}
            </motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className="bg-card border-border/50 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300 group cursor-default overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
                  <CardContent className="flex items-center gap-4 p-6 relative z-10">
                    <div className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all duration-300">
                      {tech.icon}
                    </div>
                    <span className="font-medium text-sm">{tech.name}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">{t.projectsTag}</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              {t.projectsTitle1}<span className="text-primary">{t.projectsTitle2}</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="overflow-visible" ref={emblaRef}>
              <div className="flex items-stretch gap-6 py-4 -my-4">
                {projects.map((project, i) => (
                  <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_48%] lg:flex-[0_0_33.333%] min-w-0 h-auto">
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      image={project.image}
                      github={project.github}
                      live={project.live}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 sm:py-32 px-4 sm:px-6 bg-secondary/30">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">{t.contactTag}</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t.contactTitle1}<span className="text-primary">{t.contactTitle2}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-10 leading-relaxed">
            {t.contactDescription}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-full font-semibold gap-2 px-8 transition-all duration-300 hover:scale-[1.02] hover:border-primary/60">
              <a href="mailto:dev.douglzzz@gmail.com">
                <Mail className="w-4 h-4" /> E-mail
              </a>
            </Button>
            <Button asChild size="lg" className="rounded-full font-semibold gap-2 px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]">
              <a href="https://github.com/doglz" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full font-semibold gap-2 px-8 transition-all duration-300 hover:scale-[1.02] hover:border-primary/60">
              <a href="https://www.instagram.com/douglz.dev/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <span>{t.footer}</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
