const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf-8');

// 1. Remove outer processSteps
index = index.replace(/const processSteps = \[[\s\S]*?\];\n+/, '');

// 2. Remove outer Plan type and plans array
index = index.replace(/type Plan = \{[\s\S]*?\};\n+/, '');
index = index.replace(/const plans: Plan\[\] = \[[\s\S]*?\];\n+/, '');

// 3. Remove outer featureGroups
index = index.replace(/const featureGroups = \[[\s\S]*?\];\n+/, '');

// 4. Update inside Index component
const injectInsideIndex = `
  const { t, language, setLanguage } = useLanguage();

  const processStepsIcons = [
    <MessageSquare className="w-5 h-5" />,
    <Pencil className="w-5 h-5" />,
    <Palette className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <Rocket className="w-5 h-5" />
  ];
  const processSteps = t.processSteps.map((step, i) => ({ ...step, icon: processStepsIcons[i] }));
  const plans = t.plansList;
  const featureGroups = t.featureGroupsList;
`;
index = index.replace('const { t, language, setLanguage } = useLanguage();', injectInsideIndex);

// Replace static texts in JSX
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
index = index.replace(/>Quero esse plano</g, '>{t.planButton}<');
index = index.replace(/>Ver etapa</g, '>{t.viewStep}<');
index = index.replace(/>Pagamento em até 3 vezes</g, '>{t.paymentTerms}<');
index = index.replace(/>50% antes e 50% após a conclusão</g, '>{t.paymentDisclaimer}<');
index = index.replace(/>Do rascunho /g, '>{t.processTitle1}');
index = index.replace(/>ao ar</g, '>{t.processTitle2}<');
index = index.replace(/>Escolha o plano /g, '>{t.pricingTitle1}');
index = index.replace(/>ideal</g, '>{t.pricingTitle2}<');
index = index.replace(/>O que está incluso\?</g, '>{t.featuresTitle}<');
index = index.replace(/\/\/ como trabalhamos/g, '{t.processTag}');
index = index.replace(/\/\/ planos/g, '{t.pricingTag}');

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Index.tsx updated');
