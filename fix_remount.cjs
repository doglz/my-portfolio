const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

// Fix "Escolha o plano ideal"
index = index.replace(
  /Escolha o plano <span className=\"text-primary\">ideal<\/span>/g,
  '{t.pricingTitle1}<span className="text-primary">{t.pricingTitle2}</span>'
);

// Add key={language} to the desktop plans grid parent to force remount on language change
index = index.replace(
  /<motion\.div\s+className=\"hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch\"\s+initial=\"hidden\"/g,
  '<motion.div\n            key={language}\n            className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"\n            initial="hidden"'
);

// Add key={language} to the mobile plans carousel parent
index = index.replace(
  /<motion\.div\s+className=\"lg:hidden\"\s+initial=\"hidden\"/g,
  '<motion.div\n            key={language}\n            className="lg:hidden"\n            initial="hidden"'
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed pricing title and forced remount on plans container');
