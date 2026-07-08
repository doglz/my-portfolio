const fs = require('fs');

// Update LanguageContext.tsx
let langCode = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

langCode = langCode.replace(
  'heroTitle2: "clientes reais.",\n    heroDescription: "",',
  'heroTitle2: "clientes reais.",\n    heroDescription: "Landing pages de alta performance criadas sob medida para o seu negócio se destacar e vender mais todos os dias.",'
);

langCode = langCode.replace(
  'heroTitle2: "real customers.",\n    heroDescription: "",',
  'heroTitle2: "real customers.",\n    heroDescription: "High-performance landing pages custom-built to make your business stand out and sell more every single day.",'
);

fs.writeFileSync('src/contexts/LanguageContext.tsx', langCode);


// Update Index.tsx
let indexCode = fs.readFileSync('src/pages/Index.tsx', 'utf8');

const titleEndString = '</motion.h1>';
const pElement = `
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t.heroDescription}
          </motion.p>`;

// Insert the paragraph right after the h1 closing tag.
indexCode = indexCode.replace(titleEndString, titleEndString + pElement);

fs.writeFileSync('src/pages/Index.tsx', indexCode);

console.log('Done restoring short hero description');
