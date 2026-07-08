const fs = require('fs');
let code = fs.readFileSync('src/pages/Index.tsx', 'utf8');

// 1. Remove heroDescription paragraph
code = code.replace(
  /<motion\.p\s+initial=\{\{ opacity: 0, y: 20 \}\}\s+animate=\{\{ opacity: 1, y: 0 \}\}\s+transition=\{\{ duration: 0\.6, delay: 0\.7 \}\}\s+className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed"\s*>\s*\{t\.heroDescription\}\s*<\/motion\.p>/,
  ''
);

// 2. Change section classes for better flex layout
code = code.replace(
  '<section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">',
  '<section ref={heroRef} className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6 overflow-hidden pt-24 pb-8">'
);

// 3. Make the inner wrapper flex so it pushes the arrow down
code = code.replace(
  '<motion.div className="w-full max-w-7xl text-center relative z-10" style={{ opacity: heroOpacity }}>',
  '<motion.div className="w-full max-w-7xl text-center relative z-10 flex-1 flex flex-col items-center justify-center pt-12" style={{ opacity: heroOpacity }}>'
);

// 4. Update the chevron link to remove absolute positioning and just sit at the bottom naturally
code = code.replace(
  /<motion\.a\s+href="#sobre"\s+initial=\{\{ opacity: 0 \}\}\s+animate=\{\{ opacity: 1 \}\}\s+transition=\{\{ delay: 1\.2 \}\}\s+className="absolute bottom-16 sm:bottom-14 left-1\/2 -translate-x-1\/2 text-muted-foreground animate-bounce z-10"\s*>/,
  '<motion.a\n          href="#sobre"\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          transition={{ delay: 1.2 }}\n          className="text-muted-foreground animate-bounce z-10 mt-auto"\n        >'
);

fs.writeFileSync('src/pages/Index.tsx', code);
console.log('Fixed Index.tsx layout and arrow');
