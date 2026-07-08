const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

// Replace 50% antes...
index = index.replace(/50% antes e 50% após a conclusão/g, '{t.paymentDisclaimer}');

// Replace Quero esse plano
index = index.replace(/Quero esse plano/g, '{t.planButton}');

// Replace pricingSubtitle
index = index.replace(
  /Entrega em até 7 dias úteis para todos os planos\. Você pode pagar 50% antes do início e 50% após a conclusão\./g,
  '{t.pricingSubtitle}'
);

// Map featured
index = index.replace(
  /const plans = t\.plansList as Plan\[\];/,
  'const plans = (t.plansList as Plan[]).map(p => ({...p, featured: p.highlight === "mais escolhido" || p.highlight === "most popular"}));'
);

// Remove top-level const plans
index = index.replace(/const plans: Plan\[\] = \[[\s\S]*?\n\];\n*/, '');

// Remove top-level const featureGroups
index = index.replace(/const featureGroups = \[[\s\S]*?\n\];\n*/, '');

// Remove top-level const processSteps
index = index.replace(/const processSteps = \[[\s\S]*?\n\];\n*/, '');

// Replace Portfólio in useState
index = index.replace(
  'useState<string | null>("Portfólio")',
  'useState<string | null>(t.featureGroupsList[0]?.title)'
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Done');
