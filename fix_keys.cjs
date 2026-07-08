const fs = require('fs');
let content = fs.readFileSync('src/pages/Index.tsx', 'utf8');
const lines = content.split('\n');

let count = 0;
const result = lines.map((l, i) => {
  if (l.includes('key={language}')) {
    count++;
    if (count === 1) return l.replace('key={language}', 'key={language + "_mobile"}');
    if (count === 2) return l.replace('key={language}', 'key={language + "_desktop"}');
    if (count === 3) return l.replace('key={language}', 'key={language + "_details"}');
  }
  return l;
});

fs.writeFileSync('src/pages/Index.tsx', result.join('\n'));
console.log('Fixed duplicate keys. Total found:', count);
