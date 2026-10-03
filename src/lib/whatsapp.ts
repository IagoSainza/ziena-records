import { site } from "@/data/site";

/**
 * Construye un enlace de WhatsApp (wa.me) con mensaje prellenado.
 *
 * @example
 * getWhatsAppLink("Hola, quiero reservar la Sala 2")
 * // => "https://wa.me/34600123456?text=Hola%2C%20quiero%20reservar%20la%20Sala%202"
 */
export function getWhatsAppLink(
  message?: string,
  phone: string = site.whatsappNumber
): string {
  // Elimina cualquier carácter que no sea dígito (por si se pone "+" o espacios).
  const cleanPhone = phone.replace(/\D/g, "");
  const base = `https://wa.me/${cleanPhone}`;

  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Mensajes prellenados para cada situación.
 * Úsalos en los botones para que el músico solo tenga que pulsar "Enviar".
 */
export const whatsappMessages = {
  general: "Hola, me gustaría pedir información sobre el local.",

  reservarSala: (roomName?: string) =>
    roomName
      ? `Hola, quiero reservar la ${roomName}. ¿Qué disponibilidad tenéis?`
      : "Hola, quiero reservar una sala de ensayo. ¿Qué disponibilidad tenéis?",

  cuotaMensual: (planName?: string) =>
    planName
      ? `Hola, me interesa la cuota mensual "${planName}". ¿Me podéis dar más información?`
      : "Hola, me interesa una cuota mensual de ensayo. ¿Me podéis dar más información?",

  presupuestoEstudio: (service?: string) =>
    service
      ? `Hola, quiero pedir presupuesto para: ${service}.`
      : "Hola, quiero pedir presupuesto para grabar en el estudio.",

  alquilerEquipo: (item?: string) =>
    item
      ? `Hola, quiero consultar la disponibilidad de: ${item}.`
      : "Hola, quiero alquilar equipo de sonido o instrumentos. ¿Qué tenéis disponible?",
} as const;