import { useState } from "react";
import { Github, ExternalLink, Layout } from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  github: string | null;
  live: string;
}

const ProjectCard = ({ title, description, tags, image, github, live }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full transition-all duration-500 ease-out"
      style={{
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div
        className="rounded-lg overflow-hidden h-full flex flex-col border transition-all duration-500"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, hsl(var(--card)), hsl(var(--card) / 0.85))"
            : "hsl(var(--card))",
          backdropFilter: isHovered ? "blur(16px)" : "blur(8px)",
          WebkitBackdropFilter: isHovered ? "blur(16px)" : "blur(8px)",
          borderColor: isHovered
            ? "hsl(var(--primary) / 0.4)"
            : "hsl(var(--border) / 0.5)",
          boxShadow: isHovered
            ? "0 8px 32px hsl(var(--primary) / 0.12), inset 0 1px 0 hsl(var(--primary) / 0.1)"
            : "0 2px 8px hsl(var(--background) / 0.3), inset 0 1px 0 hsl(var(--foreground) / 0.03)",
          minHeight: "380px",
        }}
      >
        <div className="h-48 bg-secondary/50 flex items-center justify-center border-b border-border/50 overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="block w-full h-full flex-none object-cover object-top pointer-events-none select-none" />
          ) : (
            <Layout className="w-12 h-12 text-muted-foreground/30" />
          )}
        </div>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2">
            {github && (
              <a href={github} className="text-muted-foreground hover:text-primary hover:scale-125 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            )}
            <a href={live} className="text-muted-foreground hover:text-primary hover:scale-125 transition-all duration-300">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ProjectCard;
