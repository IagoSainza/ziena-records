/**
 * Datos generales del local.
 * Edita este archivo para cambiar teléfono, horarios, dirección, etc.
 * Se usan en layout.tsx (SEO, previa en redes y datos estructurados de Google).
 */

export const site = {
  name: "Ziena Records",
  shortName: "Ziena",
  tagline: "Estudio de grabación y local de ensayo",
  description:
    "Estudio de grabación y local de ensayo en Ourense (Av. Portugal, 133, sótano). Equipamiento profesional y reserva directa por WhatsApp.",

  // Número en formato internacional SIN "+" ni espacios (34 = España).
  whatsappNumber: "34679475522",
  // Número tal y como se muestra en pantalla.
  phoneDisplay: "679 47 55 22",
  // Déjalo vacío si no hay email público (no se incluirá en los datos de Google).
  email: "",

  address: {
    street: "Av. Portugal, 133, sótano",
    postalCode: "32002",
    city: "Ourense",
    province: "Ourense",
    country: "España",
  },
  // Enlace a Google Maps (para el botón "Cómo llegar").
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ziena+Records%2C+Av.+Portugal%2C+133%2C+32002+Ourense",
  // Src del iframe de Google Maps (Compartir > Insertar un mapa).
  mapsEmbedUrl: "",

  hours: [
    { days: "Lunes a viernes", time: "10:00 – 23:00" },
    { days: "Sábados y domingos", time: "Con cita previa" },
  ],

  // Añade aquí las URLs reales; las vacías no se publican.
  social: {
    instagram: "",
    youtube: "",
    spotify: "",
    tiktok: "",
  },

  // Textos legales (pendiente: razón social y NIF reales).
  legal: {
    companyName: "Ziena Records",
    taxId: "",
    registeredAddress: "Av. Portugal, 133, sótano, 32002 Ourense",
    email: "",
    year: new Date().getFullYear(),
  },
} as const;

export type Site = typeof site;
