import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

const translations = {
  pt: {
    available: "Disponível para landing pages",
    heroTitle1: "Páginas de Captação",
    heroTitle2: "que Convertem",
    heroDescription: "Desenvolvo landing pages estratégicas para transformar visitas em contatos, clientes e oportunidades reais para sua marca.",
    viewProjects: "Ver projetos",
    talkToMe: "Fale comigo",
    aboutTag: "// sobre mim",
    aboutName: "Douglas, 21 anos",
    aboutP1: ["Atuo com ", "criação de landing pages e páginas de captação", ", desenvolvendo interfaces rápidas, responsivas e pensadas para conversão."],
    aboutP2: ["Também estruturo páginas com foco em ", "SEO, copywriting e clareza de oferta", ", ajudando sua marca a aparecer no Google e comunicar valor desde o primeiro acesso."],
    aboutP3: ["Uno ", "branding, copywriting e desenvolvimento frontend", " para criar páginas com identidade visual forte, boa leitura e experiência profissional."],
    statYear: "Ano de experiência",
    statSEO: "SEO para Google",
    statCopy: "Copywriting",
    statBranding: "Branding",
    skillsTag: "// tecnologias",
    skillsTitle1: "Stack ",
    skillsTitle2: " Entrega",
    projectsTag: "// projetos",
    projectsTitle1: "Trabalhos ",
    projectsTitle2: "recentes",
    contactTag: "// contato",
    contactTitle1: "Vamos ",
    contactTitle2: "conversar?",
    contactDescription: "Estou disponível para novos projetos e oportunidades. Entre em contato!",
    footer: "© 2025 Douglas. Todos os direitos reservados.",
    navAbout: "Sobre",
    navSkills: "Skills",
    navProjects: "Projetos",
    navContact: "Contato",
    projectRobuxDesc: "Landing page estratégica para captação de usuários, direcionando para uma loja de Robux com vendas e suporte realizados via Discord.",
    projectShardDesc: "Landing page desenvolvida para apresentar os serviços da Shard Services, com foco em desenvolvimento web, automações, bots e soluções digitais sob medida.",
    projectPortfolioDesc: "Portfólio desenvolvido para apresentar projetos, habilidades e serviços focados em landing pages, captação e presença digital.",
    projectBellaDesc: "Landing page criada para apresentar serviços de beleza e design com visual elegante, navegação direta e foco em conversão.",
    projectVisionDesc: "Site institucional desenvolvido para destacar a identidade do Studio Vision, seus serviços e canais de contato em uma experiência moderna.",
  },
  en: {
    available: "Available for landing pages",
    heroTitle1: "Lead Generation Pages",
    heroTitle2: "that Convert",
    heroDescription: "I develop strategic landing pages that turn visits into contacts, customers, and real opportunities for your brand.",
    viewProjects: "View projects",
    talkToMe: "Contact me",
    aboutTag: "// about me",
    aboutName: "Douglas, 21 years old",
    aboutP1: ["I work with ", "landing pages and lead generation pages", ", developing fast, responsive interfaces built for conversion."],
    aboutP2: ["I also structure pages around ", "SEO, copywriting, and offer clarity", ", helping your brand show up on Google and communicate value from the first visit."],
    aboutP3: ["I combine ", "branding, copywriting, and frontend development", " to create pages with strong visual identity, clear reading, and a professional experience."],
    statYear: "Year of experience",
    statSEO: "SEO for Google",
    statCopy: "Copywriting",
    statBranding: "Branding",
    skillsTag: "// technologies",
    skillsTitle1: "Stack ",
    skillsTitle2: " Delivery",
    projectsTag: "// projects",
    projectsTitle1: "Recent ",
    projectsTitle2: "work",
    contactTag: "// contact",
    contactTitle1: "Let's ",
    contactTitle2: "talk?",
    contactDescription: "I'm available for new projects and opportunities. Get in touch!",
    footer: "© 2025 Douglas. All rights reserved.",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    projectRobuxDesc: "Strategic landing page for user acquisition, directing to a Robux store with sales and support via Discord.",
    projectShardDesc: "Landing page developed to showcase Shard Services' offerings, focusing on web development, automations, bots, and custom digital solutions.",
    projectPortfolioDesc: "Portfolio developed to showcase projects, skills, and services focused on landing pages, lead generation, and digital presence.",
    projectBellaDesc: "Landing page created to present beauty and design services with an elegant look, direct navigation, and a focus on conversion.",
    projectVisionDesc: "Institutional website developed to highlight Studio Vision's identity, services, and contact channels in a modern experience.",
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
