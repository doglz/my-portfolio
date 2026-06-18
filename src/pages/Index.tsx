import { Instagram, ChevronDown, ChevronLeft, ChevronRight, Code2, Palette, Menu, X, Sparkles, Check, MessageSquare, Pencil, Rocket, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect, type FormEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import projectRobuxStation from "@/assets/project-robux-station.png";
import projectNowas from "@/assets/project-nowas.png";
import projectBella from "@/assets/project-bella.png";
import projectVision from "@/assets/project-vision.png";
import projectBazeAcademy from "@/assets/project-baze-academy.png";
import ProjectCard from "@/components/ProjectCard";
import Marquee from "@/components/Marquee";
import WhatsAppFloat, { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { waLink, waLinkForPlan } from "@/lib/whatsapp";
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

const processSteps = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Briefing",
    description: "Conversamos para entender o seu negócio, público, oferta e os objetivos da página.",
  },
  {
    icon: <Pencil className="w-5 h-5" />,
    title: "Estrutura & Copy",
    description: "Estruturo a página com foco em conversão e escrevo os textos que comunicam o valor da sua oferta.",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Design",
    description: "Visual alinhado à identidade da marca, totalmente responsivo para celular, tablet e desktop.",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Desenvolvimento & SEO",
    description: "Programo com performance, aplico SEO básico e integro WhatsApp, mapa e métricas conforme o plano.",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Entrega & Ajustes",
    description: "Entrega em até 7 dias úteis, com revisões e suporte de acordo com o plano contratado.",
  },
];

type Plan = {
  name: string;
  price: string;
  highlight?: string;
  description: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Portfólio",
    price: "R$ 119,90",
    description: "Focado no nicho de estética (manicures, lash designers), oferecendo uma vitrine rápida com galeria de serviços e botão pro WhatsApp.",
    features: [
      "Portfólio de serviços",
      "Galeria com trabalhos",
      "Botão para WhatsApp",
      "Link para Instagram",
      "Design responsivo",
      "Suporte por 3 dias",
      "Lista de procedimentos",
    ],
  },
  {
    name: "Profissional",
    price: "R$ 699,90",
    highlight: "mais escolhido",
    featured: true,
    description: "Focado em negócios locais que querem aparecer no Google, oferecendo domínio próprio, SEO básico e Google Maps.",
    features: [
      "Tudo do Portfólio",
      "Domínio próprio",
      "SEO básico",
      "Copy personalizada",
      "Design personalizado",
      "Google Maps integrado",
      "Hospedagem inclusa",
      "Seção de diferenciais",
      "Chamada estratégica",
      "Suporte por 14 dias",
    ],
  },
  {
    name: "Premium",
    price: "R$ 1.499,90",
    description: "Focado em captação pesada de leads, oferecendo formulários, rastreamento de cliques e posicionamento especialista no Google Search Console.",
    features: [
      "Tudo do Profissional",
      "Google Search Console",
      "Formulário de captação",
      "Hospedagem inclusa",
      "Rastreamento de cliques",
      "Animações leves",
      "Suporte por 30 dias",
      "Domínio por 3 anos",
    ],
  },
];

const featureGroups = [
  {
    title: "Portfólio",
    items: [
      { name: "Portfólio de serviços", description: "Página simples para apresentar procedimentos, especialidades e formas de contato." },
      { name: "Galeria com trabalhos", description: "Mostra fotos de unhas, sobrancelhas, cílios, maquiagem ou outros resultados do seu atendimento." },
      { name: "Botão para WhatsApp", description: "Leva o visitante direto para uma conversa de orçamento ou agendamento." },
      { name: "Link para Instagram", description: "Conecta a página ao perfil onde o cliente pode ver mais trabalhos e acompanhar novidades." },
      { name: "Design responsivo", description: "Visual adaptado para celular, que é onde a maioria dos clientes acessa." },
      { name: "Suporte 3 dias", description: "Ajustes simples de texto, imagens e informações durante 3 dias após a entrega." },
      { name: "Lista de procedimentos", description: "Organiza os serviços oferecidos para o cliente entender rapidamente o que pode contratar." },
    ],
  },
  {
    title: "Profissional",
    items: [
      { name: "Domínio próprio", description: "Endereço como empresa.com.br, transmitindo profissionalismo e credibilidade." },
      { name: "SEO básico", description: "Configurações para que o Google consiga encontrar e indexar a página." },
      { name: "Copy personalizada", description: "Textos criados para comunicar a oferta com clareza e convencer o visitante." },
      { name: "Design personalizado", description: "Visual alinhado às cores, fonte e identidade da marca." },
      { name: "Google Maps", description: "Mapa incorporado na página para facilitar a chegada de novos clientes." },
      { name: "Hospedagem inclusa", description: "Site publicado e hospedado sem custo extra durante o período combinado." },
      { name: "Seção de diferenciais", description: "Destaca os motivos pelos quais o cliente deve escolher a empresa." },
      { name: "Chamada estratégica", description: "Frases e botões posicionados para incentivar o contato ou agendamento." },
      { name: "Suporte 14 dias", description: "Ajustes de texto, imagens e informações durante 14 dias após a entrega." },
    ],
  },
  {
    title: "Premium",
    items: [
      { name: "Search Console", description: "Monitora se o site está aparecendo no Google e quais buscas geram cliques." },
      { name: "Formulário de captação", description: "Coleta nome e contato de visitantes interessados para abordagem posterior." },
      { name: "Hospedagem inclusa", description: "Site publicado e hospedado sem custo extra durante o período combinado." },
      { name: "Rastreamento de cliques", description: "Registra cliques nos botões de WhatsApp e CTA para medir resultados." },
      { name: "Animações leves", description: "Efeitos visuais sutis que enriquecem a experiência sem prejudicar velocidade." },
      { name: "Suporte 30 dias", description: "Ajustes de texto, imagens e informações durante 30 dias após a entrega." },
      { name: "Domínio por 3 anos", description: "Registro do domínio incluído por 3 anos, sem custo extra nesse período." },
    ],
  },
];



const renderGoogleText = (text: string) => {
  const parts = text.split("Google");
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      <span className="inline-block font-bold">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
      {parts[1]}
    </>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [pricingEmblaRef, pricingEmblaApi] = useEmblaCarousel({ loop: true, align: "center", startIndex: 1 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPricingPrev, setCanScrollPricingPrev] = useState(false);
  const [canScrollPricingNext, setCanScrollPricingNext] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(1);
  const [openFeatureGroup, setOpenFeatureGroup] = useState<string | null>("Portfólio");
  const [contactForm, setContactForm] = useState({
    name: "",
    businessType: "",
    plan: "",
    message: "",
  });
  const { t } = useLanguage();
  const navLinks = [
    { href: "#sobre", label: t.navAbout },
    { href: "#projetos", label: t.navProjects },
    { href: "#processo", label: t.navProcess },
    { href: "#planos", label: t.navPricing },
    { href: "#contato", label: t.navContact },
  ];

  const projects = [
    {
      title: "Nowas",
      description: t.projectNowasDesc,
      tags: ["Marcenaria", "São Paulo"],
      image: projectNowas,
      github: null,
      live: "https://nowas-lp.vercel.app/",
    },
    {
      title: "Baze Academy",
      description: t.projectBazeAcademyDesc,
      tags: ["Jiu-jitsu", "Barra de São João"],
      image: projectBazeAcademy,
      github: null,
      live: "https://bazeacademy.com.br/barrasj/",
    },
    {
      title: "Bella Glam Design",
      description: t.projectBellaDesc,
      tags: ["Beleza", "Agendamento"],
      image: projectBella,
      github: null,
      live: "https://bellaglamdesign.vercel.app",
    },
    {
      title: "Studio Vision",
      description: t.projectVisionDesc,
      tags: ["Institucional", "Audiovisual"],
      image: projectVision,
      github: null,
      live: "https://studiovision.site",
    },
    {
      title: "Robux Station",
      description: t.projectRobuxDesc,
      tags: ["E-commerce", "Discord"],
      image: projectRobuxStation,
      github: null,
      live: "https://robuxstationdc.com/",
    },
  ];
  const mainPlans = plans;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedProjectIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const onPricingSelect = useCallback(() => {
    if (!pricingEmblaApi) return;
    setCanScrollPricingPrev(pricingEmblaApi.canScrollPrev());
    setCanScrollPricingNext(pricingEmblaApi.canScrollNext());
    setSelectedPricingIndex(pricingEmblaApi.selectedScrollSnap());
  }, [pricingEmblaApi]);

  useEffect(() => {
    if (!pricingEmblaApi) return;
    onPricingSelect();
    pricingEmblaApi.on("select", onPricingSelect);
    pricingEmblaApi.on("reInit", onPricingSelect);
    return () => {
      pricingEmblaApi.off("select", onPricingSelect);
      pricingEmblaApi.off("reInit", onPricingSelect);
    };
  }, [pricingEmblaApi, onPricingSelect]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const activeProcessStep = processSteps[selectedProcessIndex];
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = [
      "Olá, equipe da Vitrina! Vim pelo site e quero conversar sobre uma landing page.",
      "",
      `Nome: ${contactForm.name || "Não informado"}`,
      `Tipo de negócio: ${contactForm.businessType}`,
      `Plano de interesse: ${contactForm.plan}`,
      contactForm.message ? `Sobre o projeto: ${contactForm.message}` : null,
    ].filter(Boolean).join("\n");

    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  const renderPlanCard = (plan: Plan) => (
    <Card
      className={`relative h-full p-6 lg:p-8 flex flex-col transition-all duration-300 ${
        plan.featured
          ? "bg-card border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.05)]"
      }`}
    >
      {plan.highlight && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-mono text-[10px] tracking-wide uppercase px-3 py-1">
          <Sparkles className="w-3 h-3 mr-1" />
          {plan.highlight}
        </Badge>
      )}

      <div className="mb-5 lg:mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed lg:min-h-[3rem]">{plan.description}</p>
      </div>

      <div className="mb-6 lg:mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl lg:text-4xl font-bold tracking-tight">{plan.price}</span>
        </div>
        <span className="text-xs text-muted-foreground mt-1 block">50% antes e 50% após a conclusão</span>
      </div>

      <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? "text-primary" : "text-primary/70"}`} />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        size="lg"
        variant={plan.featured ? "default" : "outline"}
        className="rounded-full font-semibold w-full transition-all duration-300 hover:scale-[1.02]"
      >
        <a href={waLinkForPlan(plan.name)} target="_blank" rel="noopener noreferrer">
          Quero esse plano
          <ArrowRight className="w-4 h-4" />
        </a>
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#" aria-label="Voltar para o topo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-lg font-bold tracking-tight cursor-pointer">
            <span className="text-primary">&lt;</span>Vitrina<span className="text-primary">/&gt;</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:hidden">
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
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">


        <motion.div className="w-full max-w-7xl text-center relative z-10" style={{ opacity: heroOpacity }}>
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
            className="text-5xl md:text-7xl xl:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-4"
          >
            {renderGoogleText(t.heroTitle1)}
            <span className="block text-foreground mt-2">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed"
          >
            {t.heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
          >
            <Button asChild size="lg" className="rounded-full font-semibold px-8 transition-transform hover:scale-[1.02]">
              <a href="#planos">{t.viewProjects}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full font-semibold px-8 transition-transform hover:scale-[1.02]">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">{t.talkToMe}</a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.a
          href="#sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-16 sm:bottom-14 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce z-10"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </section>

      <div className="pt-24 pb-8 text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        Empresas que confiam na Vitrina
      </div>
      <Marquee />

      {/* Sobre */}
      <section id="sobre" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
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
              <p>
                {t.aboutP4[0]}<span className="text-foreground font-medium">{t.aboutP4[1]}</span>{t.aboutP4[2]}
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
              { val: "7d", label: t.statYear },
              { val: "SEO", label: t.statSEO },
              { val: "50/50", label: t.statCopy },
              { val: "Direto", label: t.statBranding },
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

      {/* Projetos */}
      <section id="projetos" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
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
            <div className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing select-none" ref={emblaRef}>
              <div className="flex items-stretch -ml-4 sm:-ml-6">
                {projects.map((project, i) => (
                  <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_58%] lg:flex-[0_0_38%] min-w-0 h-auto pl-4 sm:pl-6">
                    <div className="mx-auto h-full w-[90%] max-w-[340px] sm:w-full sm:max-w-none transition-opacity duration-300" style={{ opacity: selectedProjectIndex === i ? 1 : 0.7 }}>
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        image={project.image}
                        github={project.github}
                        live={project.live}
                        isActive={selectedProjectIndex === i}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Projeto anterior"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Próximo projeto"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="py-20 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">// processo</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              Como <span className="text-primary">trabalhamos</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Um fluxo simples e transparente, do primeiro contato à página no ar.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-center px-2">
                {processSteps.map((step, i) => (
                  <div key={step.title} className="flex flex-1 items-center last:flex-none">
                    <button
                      type="button"
                      onMouseEnter={() => setSelectedProcessIndex(i)}
                      onFocus={() => setSelectedProcessIndex(i)}
                      onClick={() => setSelectedProcessIndex(i)}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[11px] transition-colors ${
                        selectedProcessIndex === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/45 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                      aria-label={`Ver etapa ${i + 1}: ${step.title}`}
                    >
                      0{i + 1}
                    </button>
                    {i < processSteps.length - 1 && (
                      <div className={`mx-2 h-px flex-1 transition-colors ${selectedProcessIndex > i ? "bg-primary/70" : "bg-border/60"}`} />
                    )}
                  </div>
                ))}
              </div>

              <Card className="overflow-hidden border-border/50 bg-card">
                <div className="h-1 bg-border/50">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((selectedProcessIndex + 1) / processSteps.length) * 100}%` }}
                  />
                </div>

                <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
                  <div className="p-5 sm:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProcessStep.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="mb-5 flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-primary/35 bg-primary/10 text-primary sm:h-14 sm:w-14">
                            {activeProcessStep.icon}
                          </div>
                          <div>
                            <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                              Etapa 0{selectedProcessIndex + 1}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                              {activeProcessStep.title}
                            </h3>
                          </div>
                        </div>

                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
                          {activeProcessStep.description}
                        </p>

                        <div className="mt-6 rounded-md border border-border/50 bg-secondary/20 p-4 sm:mt-8">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                            O que você recebe nessa fase
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/85">
                            Alinhamento claro do próximo passo, sem reunião desnecessária e sem você precisar entender a parte técnica.
                          </p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full gap-2"
                            onClick={() => setSelectedProcessIndex((selectedProcessIndex - 1 + processSteps.length) % processSteps.length)}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                          </Button>
                          <Button
                            type="button"
                            className="rounded-full gap-2"
                            onClick={() => setSelectedProcessIndex((selectedProcessIndex + 1) % processSteps.length)}
                          >
                            Avançar
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="hidden border-t border-border/50 bg-secondary/20 p-6 lg:block lg:border-l lg:border-t-0">
                    <div className="mb-5">
                      <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Progresso</div>
                      <div className="mt-2 text-3xl font-bold text-primary">{selectedProcessIndex + 1}/{processSteps.length}</div>
                    </div>

                    <div className="space-y-3">
                      {processSteps.map((step, i) => (
                        <button
                          key={step.title}
                          onClick={() => setSelectedProcessIndex(i)}
                          className={`flex w-full items-center gap-3 text-left text-sm transition-colors ${
                            selectedProcessIndex === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${selectedProcessIndex >= i ? "bg-primary" : "bg-border"}`} />
                          {step.title}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProcessIndex((selectedProcessIndex - 1 + processSteps.length) % processSteps.length)}
                        className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        aria-label="Etapa anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedProcessIndex((selectedProcessIndex + 1) % processSteps.length)}
                        className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        aria-label="Próxima etapa"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">// planos</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              Escolha o plano <span className="text-primary">ideal</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Entrega em até 7 dias úteis para todos os planos. Pagamento em duas partes: metade antes e metade após a conclusão.
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={pricingEmblaRef}>
              <div className="flex -ml-4">
                {mainPlans.map((plan) => (
                  <div key={plan.name} className="flex-[0_0_88%] sm:flex-[0_0_58%] md:flex-[0_0_48%] min-w-0 pl-4">
                    <div className="h-full py-3">{renderPlanCard(plan)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => pricingEmblaApi?.scrollPrev()}
                disabled={!canScrollPricingPrev}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Plano anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {mainPlans.map((plan, i) => (
                  <button
                    key={plan.name}
                    onClick={() => pricingEmblaApi?.scrollTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${selectedPricingIndex === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"}`}
                    aria-label={`Ir para o plano ${plan.name}`}
                  />
                ))}
              </div>
              <button
                onClick={() => pricingEmblaApi?.scrollNext()}
                disabled={!canScrollPricingNext}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Próximo plano"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {mainPlans.map((plan, i) => (
              <motion.div key={plan.name} variants={fadeUp} custom={i} className={plan.featured ? "lg:-translate-y-3" : ""}>
                {renderPlanCard(plan)}
              </motion.div>
            ))}
          </motion.div>



          <motion.p
            className="text-center text-sm text-muted-foreground mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Entrega em até 7 dias úteis para todos os planos. Você pode pagar 50% antes do início e 50% após a conclusão.
          </motion.p>
        </div>
      </section>

      {/* Detalhes dos recursos */}
      <section id="detalhes" className="py-20 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 font-mono text-xs">// detalhes</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              O que <span className="text-primary">cada recurso</span> faz
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A descrição de tudo que está incluído em cada plano, sem jargão técnico.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {featureGroups.map((group) => (
              <motion.div key={group.title} variants={fadeUp}>
                <Card className="bg-card border-border/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFeatureGroup(openFeatureGroup === group.title ? null : group.title)}
                    className="flex w-full items-center justify-between border-l-2 border-primary bg-primary/5 px-6 py-4 text-left transition-colors hover:bg-primary/10"
                    aria-expanded={openFeatureGroup === group.title}
                  >
                    <span className="font-semibold text-primary">{group.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openFeatureGroup === group.title ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {openFeatureGroup === group.title && (
                      <motion.div
                        className="divide-y divide-border/40 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        {group.items.map((item) => (
                          <div
                            key={item.name}
                            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-8 px-6 py-4"
                          >
                            <div className="font-semibold text-sm md:text-base">{item.name}</div>
                            <div className="text-sm text-muted-foreground leading-relaxed">{item.description}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 sm:py-32 px-4 sm:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
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
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8 leading-relaxed">
            {t.contactDescription}
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 text-left">
            <Card className="overflow-hidden border-border/50 bg-card">
              <form onSubmit={handleContactSubmit} className="grid gap-5 p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="block text-sm font-medium text-foreground">Seu nome</span>
                    <input
                      name="name"
                      autoComplete="name"
                      value={contactForm.name}
                      onChange={(event) => setContactForm((form) => ({ ...form, name: event.target.value }))}
                      className="h-12 w-full rounded-lg border border-border/60 bg-background/80 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-background"
                      placeholder="Como posso te chamar?"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="block text-sm font-medium text-foreground">Tipo de negócio</span>
                    <input
                      name="business"
                      autoComplete="organization"
                      value={contactForm.businessType}
                      onChange={(event) => setContactForm((form) => ({ ...form, businessType: event.target.value }))}
                      className="h-12 w-full rounded-lg border border-border/60 bg-background/80 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-background"
                      placeholder="Ex: Nail Designer, restaurante, loja..."
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="block text-sm font-medium text-foreground">Plano de interesse</span>
                  <input
                    name="plan"
                    value={contactForm.plan}
                    onChange={(event) => setContactForm((form) => ({ ...form, plan: event.target.value }))}
                    className="h-12 w-full rounded-lg border border-border/60 bg-background/80 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-background"
                    placeholder="Ex: Portfólio, Profissional ou ainda não sei"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="block text-sm font-medium text-foreground">O que você precisa?</span>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={(event) => setContactForm((form) => ({ ...form, message: event.target.value }))}
                    className="min-h-32 w-full resize-none rounded-lg border border-border/60 bg-background/80 px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-background"
                    placeholder="Ex: quero uma página para mostrar meus serviços e receber agendamentos pelo WhatsApp."
                  />
                </label>

                <Button type="submit" size="lg" className="mt-1 w-full rounded-full font-semibold gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300 hover:scale-[1.01]">
                  <WhatsAppIcon className="w-4 h-4" />
                  Enviar pelo WhatsApp
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-full font-semibold gap-2 px-8 transition-all duration-300 hover:scale-[1.02] hover:border-primary/60">
              <a href="https://www.instagram.com/douglz.code/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <span>{t.footer}</span>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
};

export default Index;
