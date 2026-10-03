/**
 * Datos generales del local.
 * Edita este archivo para cambiar teléfono, horarios, dirección, etc.
 * (Todos los datos son de EJEMPLO: sustitúyelos por los reales.)
 */

export const site = {
  name: "Overdrive Studio",
  shortName: "Overdrive",
  tagline: "Salas de ensayo y estudio de grabación",
  description:
    "Alquila sala de ensayo por horas o con cuota mensual, graba y produce tu música en estudio y alquila equipo de sonido e instrumentos. Reserva directamente por WhatsApp.",

  // Número en formato internacional SIN "+" ni espacios (34 = España).
  whatsappNumber: "34600123456",
  // Número tal y como se muestra en pantalla.
  phoneDisplay: "600 123 456",
  email: "hola@overdrivestudio.es",

  address: {
    street: "Calle de la Música, 12 (nave 3)",
    postalCode: "28000",
    city: "Madrid",
    province: "Madrid",
    country: "España",
  },
  // Enlace a Google Maps (para el botón "Cómo llegar").
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+de+la+Musica+12+Madrid",
  // Src del iframe de Google Maps (Compartir > Insertar un mapa). Se usará en Contacto.
  mapsEmbedUrl: "",

  hours: [
    { days: "Lunes a viernes", time: "10:00 – 23:00" },
    { days: "Sábados", time: "11:00 – 23:00" },
    { days: "Domingos", time: "12:00 – 21:00" },
  ],

  social: {
    instagram: "https://instagram.com/overdrivestudio",
    youtube: "https://youtube.com/@overdrivestudio",
    spotify: "",
    tiktok: "",
  },

  // Enlaces de navegación (anclas de la página).
  nav: [
    { label: "Salas", href: "#salas" },
    { label: "Tarifas", href: "#tarifas" },
    { label: "Estudio", href: "#estudio" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
  ],

  // Datos de confianza que aparecen bajo el Hero.
  trustPoints: [
    { value: "3", label: "Salas insonorizadas" },
    { value: "Backline", label: "Incluido en cada sala" },
    { value: "7 días", label: "Abierto toda la semana" },
    { value: "< 1 h", label: "Respuesta por WhatsApp" },
  ],

  // Textos legales (se usarán en el Footer y en las páginas legales).
  legal: {
    companyName: "Overdrive Studio S.L.",
    taxId: "B-12345678",
    registeredAddress: "Calle de la Música, 12 (nave 3), 28000 Madrid",
    email: "legal@overdrivestudio.es",
    noticeTitle: "Aviso legal",
    notice:
      "En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titular de Overdrive Studio S.L., con NIF B-12345678 y domicilio en Calle de la Música, 12 (nave 3), 28000 Madrid. Para cualquier consulta puede escribir a legal@overdrivestudio.es.",
    privacy:
      "Los datos que nos facilites por WhatsApp o correo electrónico se utilizarán únicamente para gestionar tu reserva o consulta, y no se cederán a terceros salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición escribiendo a legal@overdrivestudio.es.",
    year: new Date().getFullYear(),
  },
} as const;

export type Site = typeof site;