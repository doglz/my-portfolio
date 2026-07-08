const fs = require('fs');
let code = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

code = code.replace(
  'aboutName: "Sou o Douglas, desenvolvedor web focado em conversão. Sem agências, sem intermediários — apenas eu cuidando de toda a sua presença online. Landing Pages e sites de alta conversão para negócios locais e profissionais independentes. Pagamento em até 3 vezes, sem mensalidade, sem letra miúda.",',
  'aboutName: "Sou o Douglas, desenvolvedor web focado em conversão. Sem agências, sem intermediários — apenas eu cuidando de toda a sua presença online.",'
);

code = code.replace(
  '    aboutP3: ["Pages built for Google to find and for the customer to decide. ",',
  `    available: "Landing pages delivered in up to 7 days",
    heroTitle1: "Turn visitors into ",
    heroTitle2: "real customers.",
    heroDescription: "",
    viewProjects: "See plans",
    talkToMe: "WhatsApp me",
    aboutTag: "// about me",
    aboutName: "I am Douglas, a web developer focused on conversion. No agencies, no middlemen — just me handling your entire online presence.",
    aboutP1: ["You don't need to hire a designer, a copywriter and a developer separately. ", "We handle everything", ": from the copy that sells to the code that loads fast."],
    aboutP2: ["Forget slow traditional agencies. ", "I take your business", " and create a professional positioning online focused on capturing customers."],
    aboutP3: ["Pages built for Google to find and for the customer to decide. ",`
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', code);
console.log('Fixed LanguageContext.tsx');
