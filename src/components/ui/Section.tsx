import type { ReactNode } from "react";

type Tone = "default" | "soft";
type Align = "left" | "center";

interface SectionProps {
  /** Id del ancla (ej. "salas" → #salas). */
  id?: string;
  /** Texto pequeño sobre el título (ej. "Ensayo"). */
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** "soft" usa un fondo ligeramente más claro para alternar secciones. */
  tone?: Tone;
  align?: Align;
  children?: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  default: "bg-ink",
  soft: "bg-ink-soft border-y border-white/5",
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "default",
  align = "center",
  children,
  className = "",
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle);
  const headerAlign =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 lg:py-24 ${toneClasses[tone]} ${className}`}
    >
      <div className="container-page">
        {hasHeader && (
          <header className={`mb-10 max-w-3xl sm:mb-14 ${headerAlign}`}>
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
