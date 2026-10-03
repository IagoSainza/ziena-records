import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Resalta la tarjeta con borde y brillo ámbar (ej. plan recomendado). */
  highlighted?: boolean;
  /** Efecto de elevación y brillo al pasar el cursor. */
  hoverable?: boolean;
  /** Quita el padding interno (útil si la tarjeta lleva imagen a sangre). */
  flush?: boolean;
}

export function Card({
  children,
  highlighted = false,
  hoverable = true,
  flush = false,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "relative overflow-hidden rounded-2xl border bg-ink-raised",
    flush ? "" : "p-6 sm:p-7",
    highlighted
      ? "border-accent/60 shadow-glow"
      : "border-white/10",
    hoverable
      ? "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow-sm"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;
