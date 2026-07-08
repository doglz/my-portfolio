const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf-8');

// 1. Process steps (remove outer array, inject inner)
index = index.replace(/const processSteps = \[[^]*?\];\n+/s, '');

// 2. Plans (remove outer type and array)
index = index.replace(/type Plan = \{[^]*?\};\n+/s, '');
index = index.replace(/const plans: Plan\[\] = \[[^]*?\];\n+/s, '');

// 3. Feature groups (remove outer array)
index = index.replace(/const featureGroups = \[[^]*?\];\n+/s, '');

// 4. Inject inner definitions
const injectInsideIndex = `
  const { t, language, setLanguage } = useLanguage();

  type Plan = {
    name: string;
    price: string;
    oldPrice?: string;
    highlight?: string;
    description: string;
    features: string[];
    featured?: boolean;
  };

  const processStepsIcons = [
    <MessageSquare className="w-5 h-5" />,
    <Pencil className="w-5 h-5" />,
    <Palette className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <Rocket className="w-5 h-5" />
  ];
  const processSteps = t.processSteps.map((step, i) => ({ ...step, icon: processStepsIcons[i] }));
  const plans = t.plansList as Plan[];
  const featureGroups = t.featureGroupsList;
`;

// Replace `const { t, language, setLanguage } = useLanguage();` with injectInsideIndex
index = index.replace('const { t, language, setLanguage } = useLanguage();', injectInsideIndex);

// Add oldPrice to plan card render
index = index.replace(
  /<span className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">\s*\{plan\.price\}\s*<\/span>/,
  '{plan.oldPrice && <span className="text-lg font-medium text-muted-foreground line-through opacity-70">{plan.oldPrice}</span>}\n          <span className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">{plan.price}</span>'
);

// Translation replacements
index = index.replace(/tags: \["Marcenaria", "São Paulo"\],/g, 'tags: t.projectsList[0].tags,');
index = index.replace(/tags: \["Jiu-jitsu", "Barra de São João"\],/g, 'tags: t.projectsList[1].tags,');
index = index.replace(/tags: \["Beleza", "Agendamento"\],/g, 'tags: t.projectsList[2].tags,');
index = index.replace(/tags: \["Institucional", "Audiovisual"\],/g, 'tags: t.projectsList[3].tags,');
index = index.replace(/tags: \["Loja de Jogos", "Internacional"\],/g, 'tags: t.projectsList[4].tags,');
index = index.replace(/tags: \["E-commerce", "Discord"\],/g, 'tags: t.projectsList[4].tags,');

index = index.replace(/val: "7 dias"/g, 'val: t.statYearVal');
index = index.replace(/val: "Conversão"/g, 'val: t.statSEOVal');
index = index.replace(/val: "Até 3x"/g, 'val: t.statCopyVal');
index = index.replace(/val: "Direto"/g, 'val: t.statBrandingVal');

index = index.replace(/>Quero esse plano</g, '>{t.planButton}<');
index = index.replace(/>Ver etapa</g, '>{t.viewStep}<');

// Forms & Misc
index = index.replace(/Como posso te chamar\?/g, '{t.contactFormName}');
index = index.replace(/Seu nome ou da sua empresa/g, '{t.contactFormNamePlaceholder}');
index = index.replace(/Qual o seu tipo de negócio\?/g, '{t.contactFormBusiness}');
index = index.replace(/Ex: Nail Designer, restaurante, loja\.\.\./g, '{t.contactFormBusinessPlaceholder}');
index = index.replace(/De qual plano você precisa\?/g, '{t.contactFormPlan}');
index = index.replace(/Selecione um plano/g, '{t.contactFormPlanPlaceholder}');
index = index.replace(/Como posso te ajudar\?/g, '{t.contactFormMessage}');
index = index.replace(/Me conte um pouco sobre o que você precisa\.\.\./g, '{t.contactFormMessagePlaceholder}');
index = index.replace(/>Enviar mensagem</g, '>{t.contactFormSubmit}<');
index = index.replace(/>Vamos Conversar\?</g, '>{t.megaFooter}<');
index = index.replace(/Empresas que confiam no meu trabalho/g, '{t.trustMarquee}');
index = index.replace(/>Pagamento em até 3 vezes</g, '>{t.paymentTerms}<');
index = index.replace(/>50% antes e 50% após a conclusão</g, '>{t.paymentDisclaimer}<');

// Titles & Subtitles
index = index.replace(/>Do rascunho /g, '>{t.processTitle1}');
index = index.replace(/>ao ar</g, '>{t.processTitle2}<');
index = index.replace(/>Escolha o plano /g, '>{t.pricingTitle1}');
index = index.replace(/>ideal</g, '>{t.pricingTitle2}<');
index = index.replace(/>O que está incluso\?</g, '>{t.featuresTitle}<');

// Process tag and subtitle
index = index.replace(/>\/\/ processo</g, '>{t.processTag}<');
index = index.replace(/Como <span className="text-primary">trabalhamos<\/span>/, '{t.processTitle1}<span className="text-primary">{t.processTitle2}</span>');
index = index.replace(/Um fluxo simples e transparente, do primeiro contato à página no ar\./, '{t.processSubtitle}');

// Pricing tag and subtitle
index = index.replace(/>\/\/ planos</g, '>{t.pricingTag}<');
index = index.replace(/Entrega em até 7 dias úteis para todos os planos\. Pagamento em duas partes: metade antes e metade após a conclusão\./, '{t.pricingSubtitle}');
index = index.replace(/Entrega em até 7 dias úteis para todos os planos\. Você pode pagar 50% antes do início e 50% após a conclusão\./, '{t.pricingSubtitle}');

// Details tag and subtitle
index = index.replace(/>\/\/ detalhes</g, '>{t.detailsTag}<');
index = index.replace(/O que <span className="text-primary">cada recurso<\/span> faz/, '{t.detailsTitle1}<span className="text-primary">{t.detailsTitle2}</span>{t.detailsTitle3}');
index = index.replace(/A descrição de tudo que está incluído em cada plano, sem jargão técnico\./, '{t.detailsSubtitle}');

// Footer
index = index.replace(/>Falar no WhatsApp</g, '>{t.talkToMe}<');
index = index.replace(/>Ver Instagram</g, '>{t.viewInstagram}<');
index = index.replace(/>Design minimalista e de alta conversão\.</g, '>{t.footerDisclaimer}<');

// Carousel mask
index = index.replace(
  /className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing select-none" ref={emblaRef}/g,
  'className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing select-none" ref={emblaRef} style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}'
);

// Grid cols for 4 plans
index = index.replace(/className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"/, 'className="hidden lg:grid lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"');
index = index.replace(/<div className="max-w-6xl mx-auto relative z-10">/, '<div className="max-w-[90rem] mx-auto relative z-10">');
index = index.replace(/<div className="max-w-6xl mx-auto">/, '<div className="max-w-7xl mx-auto">');

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Index.tsx fixed');
