const fs = require('fs');
let index = fs.readFileSync('src/pages/Index.tsx', 'utf-8');

const renderPlanCardStr = `
  const renderPlanCard = (plan: Plan, isWide: boolean = false) => (
    <Card
      className={\`relative h-full p-6 lg:p-8 flex flex-col transition-all duration-300 \${
        isWide ? "lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10" : ""
      } \${
        plan.featured
          ? "bg-card border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
          : "bg-card border-border/50 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.05)]"
      }\`}
    >
      {plan.highlight && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-mono text-[10px] tracking-wide uppercase px-3 py-1">
          <Sparkles className="w-3 h-3 mr-1" />
          {plan.highlight}
        </Badge>
      )}

      <div className={\`mb-5 lg:mb-6 flex-1 \${isWide ? "lg:mb-0 lg:max-w-xs" : ""}\`}>
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed lg:min-h-[3rem]">{plan.description}</p>
      </div>

      <div className={\`mb-6 lg:mb-8 \${isWide ? "lg:mb-0 lg:w-48 lg:shrink-0" : ""}\`}>
        <div className="flex flex-col gap-1">
          {plan.oldPrice && (
            <span className="text-lg font-medium text-muted-foreground line-through opacity-70">
              {plan.oldPrice}
            </span>
          )}
          <span className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">
            {plan.price}
          </span>
        </div>
        <span className="text-xs text-muted-foreground mt-2 block uppercase tracking-wider font-semibold">{t.paymentTerms}</span>
      </div>

      <ul className={\`space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-1 \${isWide ? "lg:mb-0 lg:min-w-[200px]" : ""}\`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className={\`w-4 h-4 mt-0.5 shrink-0 \${plan.featured ? "text-primary" : "text-primary/70"}\`} />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      <div className={isWide ? "lg:w-56 lg:shrink-0" : "w-full"}>
        <Button
          asChild
          size="lg"
          variant={plan.featured ? "default" : "outline"}
          className="rounded-full font-semibold w-full transition-all duration-300 hover:scale-[1.02]"
        >
          <a href={waLinkForPlan(plan.name)} target="_blank" rel="noopener noreferrer">
            {t.planButton}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
`;

const insertPoint = `    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };`;

index = index.replace(insertPoint, insertPoint + renderPlanCardStr);
fs.writeFileSync('src/pages/Index.tsx', index);
console.log('Fixed renderPlanCard');
