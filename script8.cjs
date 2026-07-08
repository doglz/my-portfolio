const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf-8');

// 1. Process steps, plans, featureGroups injection
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


// 2. renderPlanCard replacement
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
        <span className="text-xs text-muted-foreground mt-1 block">{t.paymentDisclaimer}</span>
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

const newRenderPlanCard = `  const renderPlanCard = (plan: Plan, isWide: boolean = false) => (
    <Card
      className={\`relative h-full p-6 lg:p-8 flex flex-col transition-all duration-300 \${
        isWide ? "lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10" : ""
      } \${
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

      <div className={\`mb-5 lg:mb-6 flex-1 \${isWide ? "lg:mb-0 lg:max-w-xs" : ""}\`}>
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed lg:min-h-[3rem]">{plan.description}</p>
      </div>

      <div className={\`mb-6 lg:mb-8 \${isWide ? "lg:mb-0 lg:w-48 lg:shrink-0" : ""}\`}>
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

      <ul className={\`space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-1 \${isWide ? "lg:mb-0 lg:min-w-[200px]" : ""}\`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className={\`w-4 h-4 mt-0.5 shrink-0 \${plan.featured ? "text-primary" : "text-primary/70"}\`} />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      <div className={isWide ? "lg:w-56 lg:shrink-0" : "w-full"}>
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

// 3. Grid mapping for Complete System plan wide layout
const searchGrid = 'className="hidden lg:grid lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"';
if (index.includes(searchGrid)) {
  index = index.replace(searchGrid, 'className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"');
}
const oldMap = `{mainPlans.map((plan, i) => (
              <motion.div key={plan.name} variants={fadeUp} custom={i} className={plan.featured ? "lg:-translate-y-3" : ""}>
                {renderPlanCard(plan)}
              </motion.div>
            ))}`;
const newMap = `{mainPlans.map((plan, i) => {
              const isWide = i === 3;
              return (
                <motion.div 
                  key={plan.name} 
                  variants={fadeUp} 
                  custom={i} 
                  className={\`\${plan.featured && !isWide ? "lg:-translate-y-3" : ""} \${isWide ? "lg:col-span-3 lg:max-w-5xl lg:mx-auto lg:w-full mt-4" : ""}\`}
                >
                  {renderPlanCard(plan, isWide)}
                </motion.div>
              );
            })}`;
index = index.replace(oldMap, newMap);

// 4. Other translations
index = index.replace(/tags: \["Marcenaria", "São Paulo"\],/g, 'tags: t.projectsList[0].tags,');
index = index.replace(/tags: \["Jiu-jitsu", "Barra de São João"\],/g, 'tags: t.projectsList[1].tags,');
index = index.replace(/tags: \["Beleza", "Agendamento"\],/g, 'tags: t.projectsList[2].tags,');
index = index.replace(/tags: \["Institucional", "Audiovisual"\],/g, 'tags: t.projectsList[3].tags,');
index = index.replace(/tags: \["Loja de Jogos", "Internacional"\],/g, 'tags: t.projectsList[4].tags,');
index = index.replace(/tags: \["E-commerce", "Discord"\],/g, 'tags: t.projectsList[4].tags,'); // safety fallback

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

// Footer specific replacements to prevent HTML spacing bugs
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
console.log('Script8 completed');
