const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

// Fix contact form WhatsApp message
index = index.replace(
  /\"Olá, Douglas! Vim pelo site e quero conversar sobre uma landing page\.\",/g,
  "language === 'en' ? 'Hi Douglas! I came from your website and want to talk about a landing page.' : 'Olá, Douglas! Vim pelo site e quero conversar sobre uma landing page.',"
);

index = index.replace(
  /\`Nome: \$\{contactForm\.name \|\| \"Não informado\"\}\`,/g,
  "language === 'en' ? `Name: ${contactForm.name || 'Not provided'}` : `Nome: ${contactForm.name || 'Não informado'}`, "
);

index = index.replace(
  /\`Tipo de negócio: \$\{contactForm\.businessType\}\`,/g,
  "language === 'en' ? `Business type: ${contactForm.businessType}` : `Tipo de negócio: ${contactForm.businessType}`,"
);

index = index.replace(
  /\`Plano de interesse: \$\{contactForm\.plan\}\`,/g,
  "language === 'en' ? `Plan of interest: ${contactForm.plan}` : `Plano de interesse: ${contactForm.plan}`,"
);

index = index.replace(
  /contactForm\.message \? \`Sobre o projeto: \$\{contactForm\.message\}\` : null,/g,
  "contactForm.message ? (language === 'en' ? `About the project: ${contactForm.message}` : `Sobre o projeto: ${contactForm.message}`) : null,"
);

// Fix aria-labels on mobile carousel
index = index.replace(
  /aria-label=\"Plano anterior\"/g,
  "aria-label={language === 'en' ? 'Previous plan' : 'Plano anterior'}"
);

index = index.replace(
  /aria-label=\"Próximo plano\"/g,
  "aria-label={language === 'en' ? 'Next plan' : 'Próximo plano'}"
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed WhatsApp message payload and aria-labels');
