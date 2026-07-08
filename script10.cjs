const fs = require('fs');

// 1. LanguageContext.tsx
let lang = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

// The original base LanguageContext.tsx has EN prices as 'R$ 299,90' and PT prices as 'R$ 299,90'.
// Let's replace the plansList section for PT and EN entirely to be safe!

const ptPlansListRegex = /plansList: \[\s*\{\s*name: 'Portfólio'[^]*?\}\s*\]/s;
const ptPlansListNew = `plansList: [
      {
        name: 'Portfólio', price: 'R$ 119,90', oldPrice: 'R$ 299,90', highlight: '',
        description: 'Focado em prestadores de serviços e profissionais autônomos, oferecendo uma vitrine rápida com galeria de serviços e botão pro WhatsApp.',
        features: ['Portfólio de serviços', 'Galeria com trabalhos', 'Botão para WhatsApp', 'Link para Instagram', 'Design responsivo', 'Suporte por 3 dias', 'Lista de procedimentos']
      },
      {
        name: 'Profissional', price: 'R$ 349,90', oldPrice: 'R$ 529,90', highlight: 'mais escolhido',
        description: 'Focado em negócios locais que querem aparecer no Google, oferecendo domínio próprio, SEO básico e Google Maps.',
        features: ['Tudo do Portfólio', 'Domínio próprio', 'SEO básico', 'Copy personalizada', 'Design personalizado', 'Google Maps integrado', 'Hospedagem inclusa', 'Seção de diferenciais', 'Chamada estratégica', 'Suporte por 14 dias']
      },
      {
        name: 'Premium', price: 'R$ 799,90', oldPrice: 'R$ 999,90', highlight: '',
        description: 'Focado em captação pesada de leads, oferecendo formulários, rastreamento de cliques e posicionamento especialista no Google Search Console.',
        features: ['Tudo do Profissional', 'Google Search Console', 'Formulário de captação', 'Hospedagem inclusa', 'Rastreamento de cliques', 'Animações leves', 'Suporte por 30 dias', 'Domínio por 3 anos']
      },
      {
        name: 'Sistema Completo', price: 'R$ 1499,90', oldPrice: 'R$ 1999,90', highlight: 'vip',
        description: 'Sistema completo de CRM e vendas focado em automação total, com manutenção e suporte inclusos por 3 meses.',
        features: ['Tudo do Premium', 'Sistema de CRM completo', 'Gestão de vendas', 'Automação de leads', 'Manutenção inclusa', 'Suporte VIP por 3 meses']
      }
    ]`;

const enPlansListRegex = /plansList: \[\s*\{\s*name: 'Portfolio'[^]*?\}\s*\]/s;
const enPlansListNew = `plansList: [
      {
        name: 'Portfolio', price: '$ 119.90', oldPrice: '$ 299.90', highlight: '',
        description: 'Focused on service providers and freelancers, offering a quick showcase with a service gallery and WhatsApp button.',
        features: ['Service portfolio', 'Work gallery', 'WhatsApp button', 'Instagram link', 'Responsive design', '3-day support', 'List of procedures']
      },
      {
        name: 'Professional', price: '$ 349.90', oldPrice: '$ 529.90', highlight: 'most popular',
        description: 'Focused on local businesses wanting to appear on Google, offering a custom domain, basic SEO, and Google Maps.',
        features: ['Everything in Portfolio', 'Custom domain', 'Basic SEO', 'Custom copy', 'Custom design', 'Integrated Google Maps', 'Hosting included', 'Differentiators section', 'Strategic call-to-action', '14-day support']
      },
      {
        name: 'Premium', price: '$ 799.90', oldPrice: '$ 999.90', highlight: '',
        description: 'Focused on heavy lead capture, offering forms, click tracking, and expert positioning on Google Search Console.',
        features: ['Everything in Professional', 'Google Search Console', 'Lead capture form', 'Hosting included', 'Click tracking', 'Lightweight animations', '30-day support', '3-year domain']
      },
      {
        name: 'Complete System', price: '$ 1499.90', oldPrice: '$ 1999.90', highlight: 'vip',
        description: 'Complete CRM and sales system focused on full automation, with maintenance and support included for 3 months.',
        features: ['Everything in Premium', 'Full CRM system', 'Sales management', 'Lead automation', 'Maintenance included', '3-month VIP support']
      }
    ]`;

lang = lang.replace(ptPlansListRegex, ptPlansListNew);
lang = lang.replace(enPlansListRegex, enPlansListNew);

// Add planButton if it's missing (base already has it? Let's check: t.planButton in base was not there, wait, did base have it? Base didn't have planButton in the first place, I added it in earlier scripts which I lost when restoring).
if (!lang.includes("planButton: 'Quero esse plano'")) {
    lang = lang.replace(/paymentDisclaimer: '50% antes e 50% após a conclusão',/, "paymentDisclaimer: '50% antes e 50% após a conclusão',\n    planButton: 'Quero esse plano',\n    megaFooter: 'Vamos Conversar?',\n    talkToMe: 'Falar no WhatsApp',\n    viewInstagram: 'Ver Instagram',");
}
if (!lang.includes("planButton: 'I want this plan'")) {
    lang = lang.replace(/paymentDisclaimer: '50% upfront and 50% upon completion',/, "paymentDisclaimer: '50% upfront and 50% upon completion',\n    planButton: 'I want this plan',\n    megaFooter: 'Let\\'s Talk?',\n    talkToMe: 'Talk on WhatsApp',\n    viewInstagram: 'View Instagram',");
}

fs.writeFileSync('src/contexts/LanguageContext.tsx', lang);


// 2. Index.tsx
let index = fs.readFileSync('src/pages/Index.tsx', 'utf-8');

index = index.replace(/const processSteps = \[[^]*?\];\n+/s, '');
index = index.replace(/type Plan = \{[^]*?\};\n+/s, '');
index = index.replace(/const plans: Plan\[\] = \[[^]*?\];\n+/s, '');
index = index.replace(/const featureGroups = \[[^]*?\];\n+/s, '');

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

index = index.replace('const { t, language, setLanguage } = useLanguage();', injectInsideIndex);

// Replace renderPlanCard to only include oldPrice and t.planButton (NO WIDE LOGIC)
const oldRenderPlanCard = `  const renderPlanCard = (plan: Plan) => (
    <Card
      className={\`relative h-full p-6 lg:p-8 flex flex-col transition-all duration-300 \${
        plan.featured
          ? "bg-card border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.05)]"
      }\`}
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
            <Check className={\`w-4 h-4 mt-0.5 shrink-0 \${plan.featured ? "text-primary" : "text-primary/70"}\`} />
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
  );`;

const newRenderPlanCard = `  const renderPlanCard = (plan: Plan) => (
    <Card
      className={\`relative h-full p-6 lg:p-8 flex flex-col transition-all duration-300 \${
        plan.featured
          ? "bg-card border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.05)]"
      }\`}
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
        <div className="flex flex-col gap-1">
          {plan.oldPrice && (
            <span className="text-lg font-medium text-muted-foreground line-through opacity-70">
              {plan.oldPrice}
            </span>
          )}
          <span className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">
            {plan.price}
          </span>
        </div>
        <span className="text-xs text-muted-foreground mt-2 block uppercase tracking-wider font-semibold">{t.paymentTerms}</span>
      </div>

      <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className={\`w-4 h-4 mt-0.5 shrink-0 \${plan.featured ? "text-primary" : "text-primary/70"}\`} />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="w-full mt-auto">
        <Button
          asChild
          size="lg"
          variant={plan.featured ? "default" : "outline"}
          className="rounded-full font-semibold w-full transition-all duration-300 hover:scale-[1.02]"
        >
          <a href={waLinkForPlan(plan.name)} target="_blank" rel="noopener noreferrer">
            {t.planButton}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </Card>
  );`;

index = index.replace(oldRenderPlanCard, newRenderPlanCard);

// Make sure the mainPlans grid layout is exactly grid-cols-4 and no col-span is used.
// It is already grid-cols-4 in the base Index.tsx, so we don't need to touch it!

// Translations
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
index = index.replace(/Empresas que confiam no meu trabalho/g, '{t.trustMarquee}');

// Footer specific replacements
index = index.replace(/>\s*Vamos Conversar\?\s*<\/h2>/g, '>{t.megaFooter}</h2>');
index = index.replace(/>\s*Falar no WhatsApp\s*<\/a>/g, '>{t.talkToMe}</a>');
index = index.replace(/>\s*Ver Instagram\s*<\/a>/g, '>{t.viewInstagram}</a>');

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

// Details tag and subtitle
index = index.replace(/>\/\/ detalhes</g, '>{t.detailsTag}<');
index = index.replace(/O que <span className="text-primary">cada recurso<\/span> faz/, '{t.detailsTitle1}<span className="text-primary">{t.detailsTitle2}</span>{t.detailsTitle3}');
index = index.replace(/A descrição de tudo que está incluído em cada plano, sem jargão técnico\./, '{t.detailsSubtitle}');

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Script10 completed');
