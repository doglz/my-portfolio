const fs = require('fs');
let content = fs.readFileSync('src/pages/Index.tsx', 'utf8');

content = content.replace(/tags: \["Marcenaria", "São Paulo"\],/g, 'tags: t.projectsList[0].tags,');
content = content.replace(/tags: \["Jiu-jitsu", "Barra de São João"\],/g, 'tags: t.projectsList[1].tags,');
content = content.replace(/tags: \["Beleza", "Agendamento"\],/g, 'tags: t.projectsList[2].tags,');
content = content.replace(/tags: \["Institucional", "Audiovisual"\],/g, 'tags: t.projectsList[3].tags,');
content = content.replace(/tags: \["Loja de Jogos", "Internacional"\],/g, 'tags: t.projectsList[4].tags,');
content = content.replace(/tags: \["E-commerce", "Discord"\],/g, 'tags: t.projectsList[4].tags,');

content = content.replace(/val: "7 dias"/g, 'val: t.statYearVal');
content = content.replace(/val: "Conversão"/g, 'val: t.statSEOVal');
content = content.replace(/val: "Até 3x"/g, 'val: t.statCopyVal');
content = content.replace(/val: "Direto"/g, 'val: t.statBrandingVal');

content = content.replace(/Quero esse plano/g, '{t.planButton}');

content = content.replace(
  /className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing select-none" ref={emblaRef}/g,
  'className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing select-none" ref={emblaRef} style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}'
);

fs.writeFileSync('src/pages/Index.tsx', content);
