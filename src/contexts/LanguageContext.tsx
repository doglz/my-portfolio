import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

export const resolveInitialLanguage = (navigatorLanguage?: string | null): Language => {
  const locale = navigatorLanguage?.toLowerCase() ?? "";
  if (locale.startsWith("pt")) return "pt";
  return "en";
};

const translations = {
  pt: {

    projectsList: [
      { title: 'Marcenaria', location: 'São Paulo', tags: ['Marcenaria', 'São Paulo'] },
      { title: 'Jiu-jitsu', location: 'Barra de São João', tags: ['Jiu-jitsu', 'Barra de São João'] },
      { title: 'Beleza', location: 'Agendamento', tags: ['Beleza', 'Agendamento'] },
      { title: 'Institucional', location: 'Audiovisual', tags: ['Institucional', 'Audiovisual'] },
      { title: 'Loja de Jogos', location: 'Internacional', tags: ['Loja de Jogos', 'Internacional'] }
    ],
    processSteps: [
      { title: 'Descoberta & Planejamento', description: 'Entendo a necessidade do projeto, defino a arquitetura e escolho a melhor stack tecnológica.' },
      { title: 'Design & UX', description: 'Caso necessário, elaboro interfaces no Figma, garantindo uma experiência moderna e focada no usuário.' },
      { title: 'Desenvolvimento', description: 'Transformo protótipos em código limpo, componentizado e performático usando o ecossistema React.' },
      { title: 'Testes & Otimização', description: 'Garanto responsividade impecável, acessibilidade e otimizo métricas de performance (Lighthouse/SEO).' },
      { title: 'Deploy & Handoff', description: 'Coloco a aplicação no ar, configurando CI/CD e entrego o código-fonte devidamente documentado.' }
    ],
    plansList: [
      {
        name: 'Portfólio', price: 'R$ 149,90', oldPrice: 'R$ 997,00', highlight: '',
        description: 'Focado em prestadores de serviços e profissionais autônomos, oferecendo uma vitrine rápida com galeria de serviços e botão pro WhatsApp.',
        features: ['Portfólio de serviços', 'Galeria com trabalhos', 'Botão para WhatsApp', 'Link para Instagram', 'Design responsivo', 'Suporte por 3 dias', 'Lista de procedimentos']
      },
      {
        name: 'Profissional', price: 'R$ 997,00', oldPrice: 'R$ 1.497,00', highlight: 'mais escolhido',
        description: 'Focado em negócios locais que querem aparecer no Google, oferecendo domínio próprio, SEO básico e Google Maps.',
        features: ['Tudo do Portfólio', 'Domínio próprio', 'SEO básico', 'Copy personalizada', 'Design personalizado', 'Google Maps integrado', 'Hospedagem inclusa', 'Seção de diferenciais', 'Chamada estratégica', 'Suporte por 14 dias']
      },
      {
        name: 'Premium', price: 'R$ 1.497,00', oldPrice: 'R$ 2.497,00', highlight: '',
        description: 'Focado em captação pesada de leads, oferecendo formulários, rastreamento de cliques e posicionamento especialista no Google Search Console.',
        features: ['Tudo do Profissional', 'Google Search Console', 'Formulário de captação', 'Hospedagem inclusa', 'Rastreamento de cliques', 'Animações leves', 'Suporte por 30 dias', 'Domínio por 3 anos']
      },
      {
        name: 'Sistema Completo', price: 'R$ 2.497,00', oldPrice: 'R$ 4.997,00', highlight: 'vip',
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
    paymentDisclaimer: '50% antes e 50% na entrega',
    trustMarquee: 'Projetos recentes',
    marqueeItems: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Framer Motion', 'UI/UX Design', 'Front-end Development'],
    processTitle1: 'Do rascunho ',
    processTitle2: 'ao ar',
    pricingTitle1: 'Escolha o plano ',
    pricingTitle2: 'ideal',
    featuresTitle: 'O que está incluso?',
    processTag: '// processo',
    pricingTag: '// planos',
    detailsTag: '// detalhes',
    processSubtitle: 'Um fluxo simples, transparente e focado em entregar a melhor solução técnica.',
    pricingSubtitle: 'Landing pages entregues em até 7 dias úteis. Sistemas em até 14 dias. Pagamento em até 3 vezes, 50% antes e 50% na entrega.',
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
    statYearVal: '+3 Anos',
    statSEOVal: 'React',
    statCopyVal: 'TypeScript',
    statBrandingVal: 'Figma',

    available: "Landing pages com entrega em até 7 dias",
    heroTitle1: "Olá, eu sou o ",
    heroTitle2: "Douglas.",
    heroDescription: "Desenvolvedor Front-end apaixonado por criar interfaces modernas, rápidas e escaláveis, focado em entregar as melhores experiências para os usuários.",
    viewProjects: "Ver meus projetos",
    contactCTA: "Entrar em contato",
    aboutTag: "// sobre mim",
    aboutName: "Mais de 3 anos transformando ideias em código e construindo produtos digitais que geram impacto real.",
    aboutP1: ["Minha especialidade é o ", "ecossistema React", ", construindo desde Landing Pages otimizadas até aplicações complexas com foco absoluto em performance."],
    aboutP2: ["Prezo por ", "código limpo", " e arquitetura escalável. Uso ferramentas modernas como TypeScript, Tailwind CSS e Vite para garantir a qualidade do que entrego."],
    aboutP3: ["Estou sempre em busca de ", "aprender novas tecnologias", " e aprimorar minhas habilidades em UX/UI para que o design não seja apenas bonito, mas funcional."],
    aboutP4: ["Meu objetivo é agregar valor ao time, ", "resolver problemas difíceis", " e colaborar ativamente na construção de projetos desafiadores."],
    statYear: "Experiência",
    statSEO: "Front-end",
    statCopy: "Tecnologia",
    statBranding: "UI/UX",
    projectsTag: "// clientes",
    projectsTitle1: "Meus trabalhos ",
    projectsTitle2: "recentes",
    contactTag: "// próximo passo",
    contactTitle1: "Vamos construir algo ",
    contactTitle2: "incrível juntos?",
    contactDescription: "Atualmente disponível para novas oportunidades. Seja para uma vaga full-time ou um projeto interessante, me mande uma mensagem.",
    footer: "© 2025 Douglas — Desenvolvimento Web e Design.",
    visitPage: "Acessar página",
    navAbout: "Sobre",
    navProjects: "Projetos",
    navProcess: "Processo",
    navPricing: "Planos",
    navContact: "Contato",
    projectRobuxDesc: "Loja de Robux com captação direta para o Discord. Lista de produtos, botão de contato e cadastro de clientes em uma única página.",
    projectNowasDesc: "Marcenaria de móveis sob medida em São Paulo. Página focada em projetos 3D, garantia e agendamento de atendimento exclusivo.",
    projectBazeAcademyDesc: "Academia de jiu-jitsu em Barra de São João com página focada em modalidades, estrutura e agendamento de aula grátis.",
    projectBellaDesc: "Salão de design e beleza com identidade elegante, navegação direta e foco em agendamento via WhatsApp.",
    projectVisionDesc: "Estúdio audiovisual com página institucional moderna, destacando identidade, serviços e canais de contato.",
  },
  en: {

    projectsList: [
      { title: 'Woodworking', location: 'São Paulo', tags: ['Woodworking', 'São Paulo'] },
      { title: 'Jiu-jitsu', location: 'Barra de São João', tags: ['Jiu-jitsu', 'Barra de São João'] },
      { title: 'Beauty', location: 'Scheduling', tags: ['Beauty', 'Scheduling'] },
      { title: 'Institutional', location: 'Audiovisual', tags: ['Institutional', 'Audiovisual'] },
      { title: 'Game Store', location: 'International', tags: ['Game Store', 'International'] }
    ],
    processSteps: [
      { title: 'Discovery & Planning', description: 'I gather requirements, define the architecture, and choose the most suitable tech stack for the problem.' },
      { title: 'Design & UX', description: 'If needed, I design UI mockups in Figma, ensuring a modern and user-centric experience.' },
      { title: 'Development', description: 'I translate designs into clean, component-based, and highly performant code using the React ecosystem.' },
      { title: 'Testing & Optimization', description: 'I ensure flawless responsiveness, accessibility, and optimize performance metrics (Lighthouse/SEO).' },
      { title: 'Deploy & Handoff', description: 'I deploy the application, set up CI/CD pipelines, and deliver well-documented source code.' }
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
          { name: 'Lead automation', description: 'Automated responses and flows so you don\'t miss any opportunities.' },
          { name: 'Maintenance included', description: 'Guarantee of operation and technical updates of the system.' },
          { name: '3-month VIP support', description: 'Dedicated technical support and priority service for 3 months.' }
        ]
      }
    ],
    planButton: 'I want this plan',
    megaFooter: 'Let\'s Talk?',
    talkToMe: 'Talk on WhatsApp',
    viewInstagram: 'View Instagram',
    paymentTerms: 'Payment in 2 installments',
    paymentDisclaimer: '50% upfront and 50% on delivery',
    trustMarquee: 'Recent work',
    marqueeItems: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Framer Motion', 'UI/UX Design', 'Front-end Development'],
    processTitle1: 'From draft ',
    processTitle2: 'to live',
    pricingTitle1: 'Choose the ',
    pricingTitle2: 'ideal plan',
    featuresTitle: 'What\'s included?',
    processTag: '// process',
    pricingTag: '// plans',
    detailsTag: '// details',
    processSubtitle: 'A simple, transparent workflow focused on delivering the best technical solution.',
    pricingSubtitle: 'Landing pages delivered in up to 7 business days. Systems in up to 14 days. Payment in 2 installments: 50% upfront and 50% on delivery.',
    detailsTitle1: 'What ',
    detailsTitle2: 'each feature',
    detailsTitle3: ' does',
    detailsSubtitle: 'The description of everything included in each plan, without technical jargon.',
    contactFormName: 'How can I call you?',
    contactFormNamePlaceholder: 'Your name or your company\'s name',
    contactFormBusiness: 'What is your business type?',
    contactFormBusinessPlaceholder: 'Ex: Nail Designer, restaurant, store...',
    contactFormPlan: 'Which plan do you need?',
    contactFormPlanPlaceholder: 'Select a plan',
    contactFormMessage: 'How can I help you?',
    contactFormMessagePlaceholder: 'Tell me a little about what you need...',
    contactFormSubmit: 'Send message',
    statYearVal: '+3 Years',
    statSEOVal: 'React',
    statCopyVal: 'TypeScript',
    statBrandingVal: 'Figma',
    available: "Landing pages delivered in up to 7 days",
    heroTitle1: "Hi, I am ",
    heroTitle2: "Douglas.",
    heroDescription: "Front-end Developer passionate about building modern, fast, and scalable interfaces, focused on delivering the best user experiences.",
    viewProjects: "See my projects",
    contactCTA: "Get in touch",
    aboutTag: "// about me",
    aboutName: "Over 3 years of experience turning ideas into code and building digital products that create real impact.",
    aboutP1: ["My main expertise lies within the ", "React ecosystem", ", building everything from highly optimized landing pages to complex web applications."],
    aboutP2: ["I value ", "clean code", " and scalable architecture. I rely on modern tools like TypeScript, Tailwind CSS, and Vite to ensure top-notch quality."],
    aboutP3: ["I am always eager to ", "learn new technologies", " and sharpen my UI/UX skills to ensure that my designs are not only beautiful but highly functional."],
    aboutP4: ["My goal is to bring real value to the team, ", "solve hard problems", " and actively collaborate in challenging projects."],
    statYear: "Experience",
    statSEO: "Front-end",
    statCopy: "Stack",
    statBranding: "UI/UX",
    projectsTag: "// clients",
    projectsTitle1: "My recent ",
    projectsTitle2: "work",
    contactTag: "// next step",
    contactTitle1: "Let's build something ",
    contactTitle2: "amazing together?",
    contactDescription: "Currently available for new opportunities. Whether it is a full-time role or a freelance project, feel free to drop me a message.",
    footer: "© 2025 Douglas — Web Development & Design.",
    visitPage: "Visit page",
    navAbout: "About",
    navProjects: "Projects",
    navProcess: "Process",
    navPricing: "Plans",
    navContact: "Contact",
    projectRobuxDesc: "Robux store with direct lead capture to Discord. Product list, contact button and customer signup in a single page.",
    projectNowasDesc: "Custom furniture workshop in São Paulo. Page focused on 3D project previews, warranty and exclusive in-studio appointment.",
    projectBazeAcademyDesc: "Jiu-jitsu academy in Barra de São João with a page focused on programs, facilities and free trial class booking.",
    projectBellaDesc: "Design and beauty salon with an elegant identity, direct navigation and a focus on WhatsApp booking.",
    projectVisionDesc: "Audiovisual studio with a modern institutional page highlighting identity, services and contact channels.",
  },
} as const;

type Translations = {
  [K in keyof typeof translations.pt]: (typeof translations.pt)[K] extends readonly unknown[] ? readonly string[] : string;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => resolveInitialLanguage(typeof navigator !== "undefined" ? navigator.language : ""));
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
