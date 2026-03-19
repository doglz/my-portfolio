import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

const translations = {
  pt: {
    available: "Disponível para projetos",
    heroTitle1: "Frontend Developer",
    heroTitle2: "& Product Owner",
    heroDescription: "Especialista em landing pages — transformando ideias em interfaces modernas, responsivas e focadas em conversão.",
    viewProjects: "Ver projetos",
    talkToMe: "Fale comigo",
    aboutTag: "// sobre mim",
    aboutName: "Douglas, 21 anos",
    aboutP1: ["Atuo no último ano com ", "desenvolvimento frontend especializado em landing pages", ", criando interfaces modernas, responsivas e focadas em conversão e experiência do usuário."],
    aboutP2: ["Também trabalho como ", "Product Owner", ", participando da definição de produtos, organização de demandas e alinhamento de ideias para garantir soluções eficientes."],
    aboutP3: ["Tenho experiência com ", "Figma", ", desenvolvendo protótipos e interfaces UI/UX, buscando unir estética, usabilidade e performance."],
    statYear: "Ano de experiência",
    statPO: "Product Owner",
    statUI: "Design no Figma",
    statGrow: "Vontade de crescer",
    skillsTag: "// tecnologias",
    skillsTitle1: "Stack ",
    skillsTitle2: " Ferramentas",
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
    projectPortfolioDesc: "Portfólio desenvolvido para apresentar projetos, habilidades e experiências como Frontend Developer & Product Owner.",
  },
  en: {
    available: "Available for projects",
    heroTitle1: "Frontend Developer",
    heroTitle2: "& Product Owner",
    heroDescription: "Landing page specialist — turning ideas into modern, responsive interfaces focused on conversion.",
    viewProjects: "View projects",
    talkToMe: "Contact me",
    aboutTag: "// about me",
    aboutName: "Douglas, 21 years old",
    aboutP1: ["I've been working for the past year with ", "frontend development specialized in landing pages", ", creating modern, responsive interfaces focused on conversion and user experience."],
    aboutP2: ["I also work as a ", "Product Owner", ", participating in product definition, demand organization, and aligning ideas to ensure efficient solutions."],
    aboutP3: ["I have experience with ", "Figma", ", developing prototypes and UI/UX interfaces, seeking to combine aesthetics, usability, and performance."],
    statYear: "Year of experience",
    statPO: "Product Owner",
    statUI: "Figma Design",
    statGrow: "Desire to grow",
    skillsTag: "// technologies",
    skillsTitle1: "Stack ",
    skillsTitle2: " Tools",
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
    projectPortfolioDesc: "Portfolio developed to showcase projects, skills, and experiences as a Frontend Developer & Product Owner.",
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
  const [language, setLanguage] = useState<Language>("en");
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
