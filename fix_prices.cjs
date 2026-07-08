const fs = require('fs');
let content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Replace PT plan prices
content = content.replace(/price: 'R\$ 119,90'/, "price: 'R$ 599,90'");
content = content.replace(/oldPrice: 'R\$ 299,90'/, "oldPrice: 'R$ 1.499,90'");

content = content.replace(/price: 'R\$ 349,90'/, "price: 'R$ 1.749,90'");
content = content.replace(/oldPrice: 'R\$ 529,90'/, "oldPrice: 'R$ 2.649,90'");

content = content.replace(/price: 'R\$ 799,90'/, "price: 'R$ 3.999,90'");
content = content.replace(/oldPrice: 'R\$ 999,90'/, "oldPrice: 'R$ 4.999,90'");

content = content.replace(/price: 'R\$ 1499,90'/, "price: 'R$ 7.499,90'");
content = content.replace(/oldPrice: 'R\$ 1999,90'/, "oldPrice: 'R$ 9.999,90'");

fs.writeFileSync('src/contexts/LanguageContext.tsx', content);
console.log('Fixed prices');
