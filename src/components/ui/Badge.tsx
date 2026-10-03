import type { ReactNode } from "react";

type Variant = "accent" | "neutral" | "success" | "solid";
type Size = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent-light",
  neutral: "border-white/10 bg-white/5 text-zinc-300",
  success: "border-whatsapp/30 bg-whatsapp/10 text-whatsapp",
  solid: "border-transparent bg-accent text-ink",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  children,
  variant = "accent",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;
