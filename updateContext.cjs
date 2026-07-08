const fs = require('fs');

let lc = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf-8');

const additionalPt = `
    // Process
    processTag: '// como trabalhamos',
    processTitle1: 'Do rascunho ',
    processTitle2: 'ao ar',
    processSteps: [
      { title: 'Briefing', description: 'Conversamos para entender o seu negócio, público, oferta e os objetivos da página.' },
      { title: 'Estrutura & Copy', description: 'Estruturo a página com foco em conversão e escrevo os textos que comunicam o valor da sua oferta.' },
      { title: 'Design', description: 'Visual alinhado à identidade da marca, totalmente responsivo para celular, tablet e desktop.' },
      { title: 'Desenvolvimento & SEO', description: 'Programo com performance, aplico SEO básico e integro WhatsApp, mapa e métricas conforme o plano.' },
      { title: 'Entrega & Ajustes', description: 'Entrega em até 7 dias úteis, com revisões e suporte de acordo com o plano contratado.' }
    ],
    // Pricing
    pricingTag: '// planos',
    pricingTitle1: 'Escolha o plano ',
    pricingTitle2: 'ideal',
    paymentTerms: 'Pagamento em até 3 vezes',
    paymentDisclaimer: '50% antes e 50% após a conclusão',
    plansList: [
      {
        name: 'Portfólio', price: '$ 119.90', oldPrice: '$ 299.90', highlight: '',
        description: 'Focado no nicho de estética (manicures, lash designers), oferecendo uma vitrine rápida com galeria de serviços e botão pro WhatsApp.',
        features: ['Portfólio de serviços', 'Galeria com trabalhos', 'Botão para WhatsApp', 'Link para Instagram', 'Design responsivo', 'Suporte por 3 dias', 'Lista de procedimentos']
      },
      {
        name: 'Profissional', price: '$ 349.90', oldPrice: '$ 529.90', highlight: 'mais escolhido',
        description: 'Focado em negócios locais que querem aparecer no Google, oferecendo domínio próprio, SEO básico e Google Maps.',
        features: ['Tudo do Portfólio', 'Domínio próprio', 'SEO básico', 'Copy personalizada', 'Design personalizado', 'Google Maps integrado', 'Hospedagem inclusa', 'Seção de diferenciais', 'Chamada estratégica', 'Suporte por 14 dias']
      },
      {
        name: 'Premium', price: '$ 799.90', oldPrice: '$ 999.90', highlight: '',
        description: 'Focado em captação pesada de leads, oferecendo formulários, rastreamento de cliques e posicionamento especialista no Google Search Console.',
        features: ['Tudo do Profissional', 'Google Search Console', 'Formulário de captação', 'Hospedagem inclusa', 'Rastreamento de cliques', 'Animações leves', 'Suporte por 30 dias', 'Domínio por 3 anos']
      }
    ],
    // Features inclusion
    featuresTitle: 'O que está incluso?',
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
      }
    ],
    // Forms & Misc
    contactFormName: 'Como posso te chamar?',
    contactFormNamePlaceholder: 'Seu nome ou da sua empresa',
    contactFormBusiness: 'Qual o seu tipo de negócio?',
    contactFormBusinessPlaceholder: 'Ex: Nail Designer, restaurante, loja...',
    contactFormPlan: 'De qual plano você precisa?',
    contactFormPlanPlaceholder: 'Selecione um plano',
    contactFormMessage: 'Como posso te ajudar?',
    contactFormMessagePlaceholder: 'Me conte um pouco sobre o que você precisa...',
    contactFormSubmit: 'Enviar mensagem',
    trustMarquee: 'Empresas que confiam no meu trabalho',
    megaFooter: 'Vamos Conversar?',
    planButton: 'Quero esse plano',
    viewStep: 'Ver etapa',`;

const additionalEn = `
    // Process
    processTag: '// how we work',
    processTitle1: 'From draft ',
    processTitle2: 'to live',
    processSteps: [
      { title: 'Briefing', description: 'We chat to understand your business, audience, offer, and page goals.' },
      { title: 'Structure & Copy', description: 'I structure the page focusing on conversion and write copy that communicates your offer\\'s value.' },
      { title: 'Design', description: 'Visuals aligned with your brand identity, fully responsive for mobile, tablet, and desktop.' },
      { title: 'Development & SEO', description: 'I code for performance, apply basic SEO, and integrate WhatsApp, maps, and analytics according to your plan.' },
      { title: 'Delivery & Revisions', description: 'Delivered in up to 7 business days, with revisions and support as per the chosen plan.' }
    ],
    // Pricing
    pricingTag: '// pricing',
    pricingTitle1: 'Choose your ',
    pricingTitle2: 'ideal plan',
    paymentTerms: 'Payment in up to 3 installments',
    paymentDisclaimer: '50% upfront and 50% upon completion',
    plansList: [
      {
        name: 'Portfolio', price: '$ 119.90', oldPrice: '$ 299.90', highlight: '',
        description: 'Focused on the beauty niche (nail techs, lash designers), offering a quick showcase with a service gallery and WhatsApp button.',
        features: ['Service portfolio', 'Work gallery', 'WhatsApp button', 'Instagram link', 'Responsive design', '3-day support', 'List of procedures']
      },
      {
        name: 'Professional', price: '$ 349.90', oldPrice: '$ 529.90', highlight: 'most popular',
        description: 'Focused on local businesses aiming to appear on Google, offering a custom domain, basic SEO, and Google Maps.',
        features: ['Everything in Portfolio', 'Custom domain', 'Basic SEO', 'Custom copy', 'Custom design', 'Integrated Google Maps', 'Hosting included', 'Differentiators section', 'Strategic call-to-action', '14-day support']
      },
      {
        name: 'Premium', price: '$ 799.90', oldPrice: '$ 999.90', highlight: '',
        description: 'Focused on heavy lead generation, offering forms, click tracking, and expert positioning on Google Search Console.',
        features: ['Everything in Professional', 'Google Search Console', 'Lead capture form', 'Hosting included', 'Click tracking', 'Light animations', '30-day support', '3-year domain']
      }
    ],
    // Features inclusion
    featuresTitle: 'What is included?',
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
          { name: 'Google Maps', description: 'Map embedded on the page to help new clients find you.' },
          { name: 'Hosting included', description: 'Site published and hosted at no extra cost during the agreed period.' },
          { name: 'Differentiators section', description: 'Highlights the reasons why clients should choose your business.' },
          { name: 'Strategic CTA', description: 'Phrases and buttons positioned to encourage contact or booking.' },
          { name: '14-day support', description: 'Text, image, and info adjustments for 14 days after delivery.' }
        ]
      },
      {
        title: 'Premium',
        items: [
          { name: 'Search Console', description: 'Monitors if the site is appearing on Google and what searches generate clicks.' },
          { name: 'Lead capture form', description: 'Collects names and contacts of interested visitors for later follow-up.' },
          { name: 'Hosting included', description: 'Site published and hosted at no extra cost during the agreed period.' },
          { name: 'Click tracking', description: 'Records clicks on WhatsApp and CTA buttons to measure results.' },
          { name: 'Light animations', description: 'Subtle visual effects that enrich the experience without hurting speed.' },
          { name: '30-day support', description: 'Text, image, and info adjustments for 30 days after delivery.' },
          { name: '3-year domain', description: 'Domain registration included for 3 years, at no extra cost during this period.' }
        ]
      }
    ],
    // Forms & Misc
    contactFormName: 'How can I call you?',
    contactFormNamePlaceholder: 'Your name or your company',
    contactFormBusiness: 'What is your business type?',
    contactFormBusinessPlaceholder: 'e.g. Nail Designer, restaurant, store...',
    contactFormPlan: 'Which plan do you need?',
    contactFormPlanPlaceholder: 'Select a plan',
    contactFormMessage: 'How can I help you?',
    contactFormMessagePlaceholder: 'Tell me a bit about what you need...',
    contactFormSubmit: 'Send message',
    trustMarquee: 'Companies that trust my work',
    megaFooter: 'Let\\'s Talk?',
    planButton: 'I want this plan',
    viewStep: 'View step',`;

lc = lc.replace('projectVisionDesc: "Estúdio audiovisual com página institucional moderna, destacando identidade, serviços e canais de contato.",', 'projectVisionDesc: "Estúdio audiovisual com página institucional moderna, destacando identidade, serviços e canais de contato.",\n' + additionalPt);
lc = lc.replace('projectVisionDesc: "Audiovisual studio with a modern institutional page highlighting identity, services and contact channels.",', 'projectVisionDesc: "Audiovisual studio with a modern institutional page highlighting identity, services and contact channels.",\n' + additionalEn);
fs.writeFileSync('src/contexts/LanguageContext.tsx', lc);
console.log('LanguageContext updated');
