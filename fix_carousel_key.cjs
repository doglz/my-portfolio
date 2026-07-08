const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

index = index.replace(
  /key={plan.name}\n(\s*)className=\"flex-\[0_0_85%\] sm:flex-\[0_0_60%\] min-w-0 pl-4 relative\"/g,
  'key={i}\n$1className="flex-[0_0_85%] sm:flex-[0_0_60%] min-w-0 pl-4 relative"'
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed mobile carousel key');
