const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

index = index.replace(
  /Empresas que confiam no meu trabalho/g,
  '{t.trustMarquee}'
);

index = index.replace(
  /Como <span className=\"text-primary\">trabalhamos<\/span>/g,
  '{t.processTitle1}<span className="text-primary">{t.processTitle2}</span>'
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed hardcoded strings');
