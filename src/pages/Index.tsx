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
    price: "R$ 99,00",
    description: "Para profissionais da beleza: manicures, nail designers, designers de unhas, designers de sobrancelhas, lash designers, extensionistas de cílios, maquiadoras, esteticistas e profissionais de estética que precisam de uma vitrine simples para mostrar serviços e receber contatos.",
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
    name: "Essencial",
    price: "R$ 497",
    description: "Para negócios que precisam estar online com profissionalismo. Página objetiva, mais completa e preparada para transformar visitantes em contatos.",
    features: [
      "Página landing page",
      "Botão para WhatsApp",
      "Serviços e modalidades",
      "Seção sobre a empresa",
      "Galeria de imagens",
      "Localização da empresa",
      "Links para redes sociais",
      "Perguntas frequentes",
      "Chamada para agendamento",
      "Design responsivo",
      "Suporte por 7 dias",
    ],
  },
  {
    name: "Profissional",
    price: "R$ 997",
    highlight: "mais escolhido",
    featured: true,
    description: "Para o pequeno negócio local que quer aparecer no Google. Domínio próprio, SEO local, copy estratégica e Google Maps integrados.",
    features: [
      "Tudo do Essencial",
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
    price: "R$ 1.997",
    description: "Para o dono de negócio ambicioso que quer captar leads, rastrear resultados e ter suporte dedicado. Posicionamento de especialista, sem peso de agência.",
    features: [
      "Tudo do Profissional",
      "Google Analytics",
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
    title: "Essencial",
    items: [
      { name: "Landing page", description: "Página única e objetiva para apresentar a empresa e converter visitantes em contatos." },
      { name: "Botão para WhatsApp", description: "Contato imediato com um clique, reduzindo o atrito para o cliente entrar em contato." },
      { name: "Serviços", description: "Organiza o que a empresa oferece de forma clara e de fácil leitura." },
      { name: "Seção sobre a empresa", description: "Apresenta quem está por trás do negócio e ajuda a criar confiança com novos clientes." },
      { name: "Galeria de imagens", description: "Exibe fotos do espaço, produtos, serviços ou resultados para deixar a página mais convincente." },
      { name: "Localização", description: "Exibe o endereço para que clientes saibam onde a empresa está." },
      { name: "Links para redes sociais", description: "Direciona visitantes para Instagram, Facebook ou outros canais importantes do negócio." },
      { name: "Perguntas frequentes", description: "Responde dúvidas comuns antes do contato e reduz objeções do visitante." },
      { name: "Chamada para agendamento", description: "Botões e frases posicionados para incentivar o cliente a pedir orçamento ou marcar horário." },
      { name: "Design responsivo", description: "Layout adaptado para celulares, tablets e computadores." },
      { name: "Suporte 7 dias", description: "Ajustes de texto, imagens e informações durante 7 dias após a entrega." },
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
      { name: "Google Analytics", description: "Dados de visitantes: volume, origem, tempo na página e comportamento." },
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [pricingEmblaRef, pricingEmblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPricingPrev, setCanScrollPricingPrev] = useState(false);
  const [canScrollPricingNext, setCanScrollPricingNext] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(0);
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
  const portfolioPlan = plans.find((plan) => plan.name === "Portfólio");
  const mainPlans = plans
    .filter((plan) => plan.name !== "Portfólio")
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

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
      "Olá, Douglas! Vim pelo site e quero conversar sobre uma landing page.",
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
          ? "bg-card border-primary/40"
          : "bg-card border-border/50 hover:border-primary/30"
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
            <span className="text-primary">&lt;</span>Douglas<span className="text-primary">/&gt;</span>
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
            className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-4"
          >
            {t.heroTitle1}
            <span className="block text-primary">{t.heroTitle2}</span>
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
            className="flex items-center justify-center"
          >
            <Button asChild size="lg" className="rounded-full font-semibold px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]">
              <a href="#planos">{t.viewProjects}</a>
            </Button>
          </motion.div>
        </motion.div>
        <motion.a
          href="#sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce z-10"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </section>

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
              { val: "1×", label: t.statCopy },
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
                    <motion.div
                      className="mx-auto h-full w-[86%] max-w-[340px] origin-center sm:w-full sm:max-w-none"
                      animate={{
                        opacity: selectedProjectIndex === i ? 1 : 0.58,
                        scale: selectedProjectIndex === i ? 1 : 0.88,
                        y: selectedProjectIndex === i ? 0 : 18,
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        image={project.image}
                        github={project.github}
                        live={project.live}
                        isActive={selectedProjectIndex === i}
                      />
                    </motion.div>
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

          {portfolioPlan && (
            <motion.div
              className="mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <Card className="relative overflow-hidden border-primary/25 bg-primary/5 p-6 sm:p-8 transition-all duration-300 hover:border-primary/40">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_1.55fr_auto] lg:items-center">
                  <div>
                    <Badge variant="outline" className="mb-4 border-primary/30 text-primary font-mono text-[10px] uppercase tracking-wide">
                      opção econômica
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">{portfolioPlan.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{portfolioPlan.description}</p>
                  </div>

                  <ul className="grid gap-3 sm:grid-cols-2">
                    {portfolioPlan.features.slice(0, 6).map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4 lg:min-w-[180px]">
                    <div>
                      <span className="text-4xl font-bold tracking-tight">{portfolioPlan.price}</span>
                      <span className="text-xs text-muted-foreground mt-1 block">50% antes e 50% após a conclusão</span>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full font-semibold w-full transition-all duration-300 hover:scale-[1.02] hover:border-primary/60"
                    >
                      <a href={waLinkForPlan(portfolioPlan.name)} target="_blank" rel="noopener noreferrer">
                        Quero esse plano
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

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
            <Card className="border-border/50 bg-card p-5 sm:p-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Seu nome</span>
                    <input
                      name="name"
                      autoComplete="name"
                      value={contactForm.name}
                      onChange={(event) => setContactForm((form) => ({ ...form, name: event.target.value }))}
                      className="w-full rounded-md border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                      placeholder="Como posso te chamar?"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Tipo de negócio</span>
                    <input
                      name="business"
                      autoComplete="organization"
                      value={contactForm.businessType}
                      onChange={(event) => setContactForm((form) => ({ ...form, businessType: event.target.value }))}
                      className="w-full rounded-md border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                      placeholder="Ex: Nail Designer, restaurante, loja..."
                    />
                  </label>
                </div>

                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-foreground">Plano de interesse</span>
                  <input
                    name="plan"
                    value={contactForm.plan}
                    onChange={(event) => setContactForm((form) => ({ ...form, plan: event.target.value }))}
                    className="w-full rounded-md border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                    placeholder="Ex: Portfólio, Profissional ou ainda não sei"
                  />
                </label>

                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-foreground">O que você precisa?</span>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={(event) => setContactForm((form) => ({ ...form, message: event.target.value }))}
                    className="min-h-28 w-full resize-none rounded-md border border-border/60 bg-background px-4 py-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                    placeholder="Ex: quero uma página para mostrar meus serviços e receber agendamentos pelo WhatsApp."
                  />
                </label>

                <Button type="submit" size="lg" className="w-full rounded-full font-semibold gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300 hover:scale-[1.01]">
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
