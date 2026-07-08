const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

index = index.replace(
  /aria-label=\{\`Ir para o plano \$\{plan\.name\}\`\}/g,
  "aria-label={language === 'en' ? `Go to plan ${plan.name}` : `Ir para o plano ${plan.name}`}"
);

index = index.replace(
  /Falar no WhatsApp/g,
  "{t.talkToMe}"
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed WhatsApp and Aria-label');
