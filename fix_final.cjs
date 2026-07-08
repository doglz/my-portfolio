const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf8');

// Fix "O que você recebe" translation bug
index = index.replace(/t\.language === 'en'/g, "language === 'en'");

// Fix // tags
index = index.replace(/\/\/ processo/g, "{t.processTag}");
index = index.replace(/\/\/ planos/g, "{t.pricingTag}");
index = index.replace(/\/\/ detalhes/g, "{t.detailsTag}");

// Fix "Vamos Conversar?"
index = index.replace(/Vamos Conversar\?/g, "{t.megaFooter}");

// Fix openFeatureGroup to use index instead of title
index = index.replace(
  /const \[openFeatureGroup, setOpenFeatureGroup\] = useState<string \| null>\(t\.featureGroupsList\[0\]\?\.title\);/g,
  "const [openFeatureGroup, setOpenFeatureGroup] = useState<number | null>(0);"
);

// We need to change the map to use index
// From: {featureGroups.map((group) => (
// To:   {featureGroups.map((group, featureIndex) => (
index = index.replace(
  /\{featureGroups\.map\(\(group\) => \(/g,
  "{featureGroups.map((group, featureIndex) => ("
);

// We need to update all openFeatureGroup === group.title checks to openFeatureGroup === featureIndex
// Note: setOpenFeatureGroup(openFeatureGroup === group.title ? null : group.title)
index = index.replace(
  /onClick=\{\(\) => setOpenFeatureGroup\(openFeatureGroup === group\.title \? null : group\.title\)\}/g,
  "onClick={() => setOpenFeatureGroup(openFeatureGroup === featureIndex ? null : featureIndex)}"
);

index = index.replace(
  /openFeatureGroup === group\.title/g,
  "openFeatureGroup === featureIndex"
);

fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed final translation strings and feature group state bug');
