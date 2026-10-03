"use client";

import { useEffect, useState } from "react";
import { getWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppButton";

interface FloatingWhatsAppProps {
  /** Mensaje prellenado. */
  message?: string;
  /** Píxeles de scroll a partir de los cuales aparece el botón. */
  showAfter?: number;
}

/**
 * Botón flotante de WhatsApp, fijo abajo a la derecha.
 * Aparece tras hacer un poco de scroll para no competir con el CTA del Hero.
 */
export function FloatingWhatsApp({
  message = whatsappMessages.general,
  showAfter = 320,
}: FloatingWhatsAppProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={[
        "group fixed z-40 flex items-center gap-2 rounded-full bg-whatsapp p-4 text-ink shadow-whatsapp",
        "right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6",
        "transition-all duration-300 hover:bg-whatsapp-dark hover:scale-105 active:scale-95",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      {/* Onda de aviso */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40"
      />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:inline">
        ¿Hablamos?
      </span>
    </a>
  );
}

export default FloatingWhatsApp;
