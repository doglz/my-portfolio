import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

const translations = {
  pt: {
    available: "Landing pages com entrega em até 7 dias",
    heroTitle1: "A sua nova página online.",
    heroTitle2: "Feita para dar resultados.",
    heroDescription: "Sou o Douglas, desenvolvedor web e designer focado na criação de Landing Pages e sites de alta conversão para negócios locais e profissionais independentes. Pagamento em até 3 vezes, sem mensalidade, sem letra miúda.",
    viewProjects: "Ver planos",
    talkToMe: "Falar no WhatsApp",
    aboutTag: "// sobre mim",
    aboutName: "Sou o Douglas,desenvolvedor e designer.",
    aboutP1: ["Você não precisa contratar designer, copywriter e desenvolvedor separadamente. ", "Nós cuidamos de tudo", ": do texto que vende ao código que carrega rápido."],
    aboutP2: ["Esqueça agências enroladas. ", "Eu pego o seu negócio", " e crio um posicionamento profissional na internet, focado em capturar clientes."],
    aboutP3: ["Páginas pensadas para o Google encontrar e para o cliente decidir. ", "SEO, copy e branding", " numa entrega única, sem mensalidade e sem fidelidade."],
    aboutP4: ["Trabalho com pagamento facilitado: ", "em até 3 vezes", ", com tudo combinado de forma clara antes de começar."],
    statYear: "Entrega",
    statSEO: "Foco",
    statCopy: "Pagamento",
    statBranding: "Atendimento direto",
    projectsTag: "// clientes",
    projectsTitle1: "Quem já está ",
    projectsTitle2: "no ar",
    contactTag: "// próximo passo",
    contactTitle1: "Pronto pra colocar sua ",
    contactTitle2: "página no ar?",
    contactDescription: "Me chama no WhatsApp e a gente conversa sobre o plano ideal pro seu negócio. Resposta no mesmo dia.",
    footer: "© 2025 Douglas — Desenvolvimento Web e Design.",
    navAbout: "Sobre",
    navProjects: "Clientes",
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
    available: "Landing pages delivered in up to 7 days",
    heroTitle1: "High-conversion landing pages.",
    heroTitle2: "Your business at the next level.",
    heroDescription: "I am Douglas, a web developer and designer focused on creating high-conversion landing pages and websites for local businesses and independent professionals. Payment in up to 3 installments, no monthly fees.",
    viewProjects: "See plans",
    talkToMe: "WhatsApp me",
    aboutTag: "// about me",
    aboutName: "I am Douglas,web developer and designer.",
    aboutP1: ["You don't need to hire a designer, a copywriter and a developer separately. ", "We handle everything", ": from the copy that sells to the code that loads fast."],
    aboutP2: ["Forget slow traditional agencies. ", "I take your business", " and create a professional positioning online focused on capturing customers."],
    aboutP3: ["Pages built for Google to find and for the customer to decide. ", "SEO, copy and branding", " in a single delivery, no monthly fees, no lock-in."],
    aboutP4: ["Easy payment options: ", "up to 3 installments", ", with everything clearly agreed before the project begins."],
    statYear: "Delivery",
    statSEO: "Focus",
    statCopy: "Payment",
    statBranding: "Direct contact",
    projectsTag: "// clients",
    projectsTitle1: "Already ",
    projectsTitle2: "online",
    contactTag: "// next step",
    contactTitle1: "Ready to put your ",
    contactTitle2: "page online?",
    contactDescription: "Text me on WhatsApp and let's talk about the right plan for your business. Same-day reply.",
    footer: "© 2025 Douglas — Web Development & Design.",
    navAbout: "About",
    navProjects: "Clients",
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
  const [language, setLanguage] = useState<Language>("pt");
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
