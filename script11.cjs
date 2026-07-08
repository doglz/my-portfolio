const fs = require('fs');

let lang = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const ptData = `
    projectsList: [
      { title: 'Marcenaria', location: 'São Paulo', tags: ['Marcenaria', 'São Paulo'] },
      { title: 'Jiu-jitsu', location: 'Barra de São João', tags: ['Jiu-jitsu', 'Barra de São João'] },
      { title: 'Beleza', location: 'Agendamento', tags: ['Beleza', 'Agendamento'] },
      { title: 'Institucional', location: 'Audiovisual', tags: ['Institucional', 'Audiovisual'] },
      { title: 'Loja de Jogos', location: 'Internacional', tags: ['Loja de Jogos', 'Internacional'] }
    ],
    processSteps: [
      { title: 'Briefing e Estratégia', description: 'Entendemos seu negócio, público e objetivos para criar uma comunicação certeira.' },
      { title: 'Copy e Conteúdo', description: 'Escrevemos os textos usando gatilhos mentais e técnicas de SEO para ranquear no Google.' },
      { title: 'Design e UI', description: 'Criamos a identidade visual da página, garantindo que seja moderna e transmita confiança.' },
      { title: 'Desenvolvimento', description: 'Transformamos o design em código otimizado, rápido e totalmente responsivo.' },
      { title: 'Entrega e Ajustes', description: 'Entrega em até 7 dias úteis, com revisões e suporte de acordo com o plano contratado.' }
    ],
    plansList: [
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
    ],
    featureGroupsList: [
      {
        title: 'Portfólio',
        items: [
          { name: 'Portfólio de serviços', description: 'Página simples para apresentar procedimentos, especialidades e formas de contato.' },
          { name: 'Galeria com trabalhos', description: 'Mostra fotos de unhas, sobrancelhas, cílios, maquiagem ou outros resultados do seu atendimento.' },
          { name: 'Botão para WhatsApp', description: 'Leva o visitante direto para uma conversa de orçamento ou agendamento.' },
          { name: 'Link para Instagram', description: 'Conecta a página ao perfil onde o cliente pode ver mais trabalhos e acompanhar novidades.' },
          { name: 'Design responsivo', description: 'Visual adaptado para celular, que é onde a maioria dos clientes acessa.' },
          { name: 'Suporte 3 dias', description: 'Ajustes simples de texto, imagens e informações durante 3 dias após a entrega.' },
          { name: 'Lista de procedimentos', description: 'Organiza os serviços oferecidos para o cliente entender rapidamente o que pode contratar.' }
        ]
      },
      {
        title: 'Profissional',
        items: [
          { name: 'Domínio próprio', description: 'Endereço como empresa.com.br, transmitindo profissionalismo e credibilidade.' },
          { name: 'SEO básico', description: 'Configurações para que o Google consiga encontrar e indexar a página.' },
          { name: 'Copy personalizada', description: 'Textos criados para comunicar a oferta com clareza e convencer o visitante.' },
          { name: 'Design personalizado', description: 'Visual alinhado às cores, fonte e identidade da marca.' },
          { name: 'Google Maps', description: 'Mapa incorporado na página para facilitar a chegada de novos clientes.' },
          { name: 'Hospedagem inclusa', description: 'Site publicado e hospedado sem custo extra durante o período combinado.' },
          { name: 'Seção de diferenciais', description: 'Destaca os motivos pelos quais o cliente deve escolher a empresa.' },
          { name: 'Chamada estratégica', description: 'Frases e botões posicionados para incentivar o contato ou agendamento.' },
          { name: 'Suporte 14 dias', description: 'Ajustes de texto, imagens e informações durante 14 dias após a entrega.' }
        ]
      },
      {
        title: 'Premium',
        items: [
          { name: 'Search Console', description: 'Monitora se o site está aparecendo no Google e quais buscas geram cliques.' },
          { name: 'Formulário de captação', description: 'Coleta nome e contato de visitantes interessados para abordagem posterior.' },
          { name: 'Hospedagem inclusa', description: 'Site publicado e hospedado sem custo extra durante o período combinado.' },
          { name: 'Rastreamento de cliques', description: 'Registra cliques nos botões de WhatsApp e CTA para medir resultados.' },
          { name: 'Animações leves', description: 'Efeitos visuais sutis que enriquecem a experiência sem prejudicar velocidade.' },
          { name: 'Suporte 30 dias', description: 'Ajustes de texto, imagens e informações durante 30 dias após a entrega.' },
          { name: 'Domínio por 3 anos', description: 'Registro do domínio incluído por 3 anos, sem custo extra nesse período.' }
        ]
      },
      {
        title: 'Sistema Completo',
        items: [
          { name: 'Sistema de CRM', description: 'Plataforma para gerenciar todos os seus clientes e leads em um só lugar.' },
          { name: 'Gestão de Vendas', description: 'Acompanhamento do funil de vendas, propostas e fechamentos.' },
          { name: 'Automação de leads', description: 'Respostas e fluxos automáticos para não perder nenhuma oportunidade.' },
          { name: 'Manutenção inclusa', description: 'Garantia de funcionamento e atualizações técnicas do sistema.' },
          { name: 'Suporte VIP 3 meses', description: 'Apoio técnico dedicado e prioridade no atendimento durante 3 meses.' }
        ]
      }
    ],
    planButton: 'Quero esse plano',
    megaFooter: 'Vamos Conversar?',
    talkToMe: 'Falar no WhatsApp',
    viewInstagram: 'Ver Instagram',
    paymentTerms: 'Pagamento em até 3 vezes',
    paymentDisclaimer: '50% antes e 50% após a conclusão',
    trustMarquee: 'Empresas que confiam no meu trabalho',
    processTitle1: 'Do rascunho ',
    processTitle2: 'ao ar',
    pricingTitle1: 'Escolha o plano ',
    pricingTitle2: 'ideal',
    featuresTitle: 'O que está incluso?',
    processTag: '// processo',
    pricingTag: '// planos',
    detailsTag: '// detalhes',
    processSubtitle: 'Um fluxo simples e transparente, do primeiro contato à página no ar.',
    pricingSubtitle: 'Entrega em até 7 dias úteis para todos os planos. Pagamento em duas partes: metade antes e metade após a conclusão.',
    detailsTitle1: 'O que ',
    detailsTitle2: 'cada recurso',
    detailsTitle3: ' faz',
    detailsSubtitle: 'A descrição de tudo que está incluído em cada plano, sem jargão técnico.',
    contactFormName: 'Como posso te chamar?',
    contactFormNamePlaceholder: 'Seu nome ou da sua empresa',
    contactFormBusiness: 'Qual o seu tipo de negócio?',
    contactFormBusinessPlaceholder: 'Ex: Nail Designer, restaurante, loja...',
    contactFormPlan: 'De qual plano você precisa?',
    contactFormPlanPlaceholder: 'Selecione um plano',
    contactFormMessage: 'Como posso te ajudar?',
    contactFormMessagePlaceholder: 'Me conte um pouco sobre o que você precisa...',
    contactFormSubmit: 'Enviar mensagem',
    statYearVal: '7 dias',
    statSEOVal: 'Conversão',
    statCopyVal: 'Até 3x',
    statBrandingVal: 'Direto',
`;

const enData = `
    projectsList: [
      { title: 'Woodworking', location: 'São Paulo', tags: ['Woodworking', 'São Paulo'] },
      { title: 'Jiu-jitsu', location: 'Barra de São João', tags: ['Jiu-jitsu', 'Barra de São João'] },
      { title: 'Beauty', location: 'Scheduling', tags: ['Beauty', 'Scheduling'] },
      { title: 'Institutional', location: 'Audiovisual', tags: ['Institutional', 'Audiovisual'] },
      { title: 'Game Store', location: 'International', tags: ['Game Store', 'International'] }
    ],
    processSteps: [
      { title: 'Briefing & Strategy', description: 'We understand your business, audience, and goals to create accurate communication.' },
      { title: 'Copy & Content', description: 'We write texts using mental triggers and SEO techniques to rank on Google.' },
      { title: 'Design & UI', description: 'We create the visual identity of the page, ensuring it is modern and trustworthy.' },
      { title: 'Development', description: 'We turn the design into optimized, fast, and fully responsive code.' },
      { title: 'Delivery & Adjustments', description: 'Delivery in up to 7 business days, with revisions and support according to the contracted plan.' }
    ],
    plansList: [
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
    ],
    featureGroupsList: [
      {
        title: 'Portfolio',
        items: [
          { name: 'Service portfolio', description: 'Simple page to present procedures, specialties, and contact methods.' },
          { name: 'Work gallery', description: 'Showcases photos of nails, brows, lashes, makeup, or other service results.' },
          { name: 'WhatsApp button', description: 'Takes the visitor directly to a chat for a quote or booking.' },
          { name: 'Instagram link', description: 'Connects the page to your profile where clients can see more work and news.' },
          { name: 'Responsive design', description: 'Adapted visuals for mobile, where most clients access from.' },
          { name: '3-day support', description: 'Simple text, image, and information adjustments for 3 days after delivery.' },
          { name: 'List of procedures', description: 'Organizes offered services for clients to quickly understand what they can hire.' }
        ]
      },
      {
        title: 'Professional',
        items: [
          { name: 'Custom domain', description: 'An address like yourcompany.com, conveying professionalism and credibility.' },
          { name: 'Basic SEO', description: 'Settings so Google can find and index your page.' },
          { name: 'Custom copy', description: 'Texts created to clearly communicate your offer and convince the visitor.' },
          { name: 'Custom design', description: 'Visuals aligned with your brand colors, fonts, and identity.' },
          { name: 'Google Maps', description: 'Map embedded on the page to make it easier for new clients to arrive.' },
          { name: 'Hosting included', description: 'Site published and hosted at no extra cost during the agreed period.' },
          { name: 'Differentiators section', description: 'Highlights the reasons why the client should choose the company.' },
          { name: 'Strategic call-to-action', description: 'Phrases and buttons positioned to encourage contact or booking.' },
          { name: '14-day support', description: 'Text, image, and information adjustments for 14 days after delivery.' }
        ]
      },
      {
        title: 'Premium',
        items: [
          { name: 'Search Console', description: 'Monitors if the site is appearing on Google and which searches generate clicks.' },
          { name: 'Lead capture form', description: 'Collects name and contact from interested visitors for later approach.' },
          { name: 'Hosting included', description: 'Site published and hosted at no extra cost during the agreed period.' },
          { name: 'Click tracking', description: 'Registers clicks on WhatsApp and CTA buttons to measure results.' },
          { name: 'Lightweight animations', description: 'Subtle visual effects that enrich the experience without harming speed.' },
          { name: '30-day support', description: 'Text, image, and information adjustments for 30 days after delivery.' },
          { name: '3-year domain', description: 'Domain registration included for 3 years, with no extra cost in this period.' }
        ]
      },
      {
        title: 'Complete System',
        items: [
          { name: 'CRM System', description: 'Platform to manage all your clients and leads in one place.' },
          { name: 'Sales Management', description: 'Tracking of the sales funnel, proposals, and closings.' },
          { name: 'Lead automation', description: 'Automated responses and flows so you don\\'t miss any opportunities.' },
          { name: 'Maintenance included', description: 'Guarantee of operation and technical updates of the system.' },
          { name: '3-month VIP support', description: 'Dedicated technical support and priority service for 3 months.' }
        ]
      }
    ],
    planButton: 'I want this plan',
    megaFooter: 'Let\\'s Talk?',
    talkToMe: 'Talk on WhatsApp',
    viewInstagram: 'View Instagram',
    paymentTerms: 'Payment in up to 3 installments',
    paymentDisclaimer: '50% upfront and 50% upon completion',
    trustMarquee: 'Companies that trust my work',
    processTitle1: 'From draft ',
    processTitle2: 'to live',
    pricingTitle1: 'Choose the ',
    pricingTitle2: 'ideal plan',
    featuresTitle: 'What\\'s included?',
    processTag: '// process',
    pricingTag: '// plans',
    detailsTag: '// details',
    processSubtitle: 'A simple and transparent flow, from the first contact to the live page.',
    pricingSubtitle: 'Delivery in up to 7 business days for all plans. Payment in two parts: half before and half after completion.',
    detailsTitle1: 'What ',
    detailsTitle2: 'each feature',
    detailsTitle3: ' does',
    detailsSubtitle: 'The description of everything included in each plan, without technical jargon.',
    contactFormName: 'How can I call you?',
    contactFormNamePlaceholder: 'Your name or your company\\'s name',
    contactFormBusiness: 'What is your business type?',
    contactFormBusinessPlaceholder: 'Ex: Nail Designer, restaurant, store...',
    contactFormPlan: 'Which plan do you need?',
    contactFormPlanPlaceholder: 'Select a plan',
    contactFormMessage: 'How can I help you?',
    contactFormMessagePlaceholder: 'Tell me a little about what you need...',
    contactFormSubmit: 'Send message',
    statYearVal: '7 days',
    statSEOVal: 'Conversion',
    statCopyVal: 'Up to 3x',
    statBrandingVal: 'Direct',
`;

// Inject ptData into the pt: { ... } block
lang = lang.replace(/pt: \{/, 'pt: {\n' + ptData);
lang = lang.replace(/en: \{/, 'en: {\n' + enData);

fs.writeFileSync('src/contexts/LanguageContext.tsx', lang);
console.log('LanguageContext.tsx populated');
