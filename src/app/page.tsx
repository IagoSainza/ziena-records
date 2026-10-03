"use client";

/**
 * page.tsx STANDALONE · Ziena Records
 * Todo en un solo archivo, sin imports de carpetas externas
 * (@/components, @/lib, @/data). Solo React + clases de Tailwind
 * con valores directos (sin colores personalizados del tema).
 *
 * Paleta (basada en el logo):
 *   Fondo     #09090b
 *   Morado    #a855f7 / #8b5cf6
 *   Verde     #22c55e / #10b981
 *   WhatsApp  #25D366
 *
 * Imágenes que puedes subir a /public (si faltan se muestra un diseño de reserva):
 *   /logo.png            Logo del header y footer
 *   /banner.png          Banner promocional bajo el header (recomendado 1600×500)
 *   /galeria/*.jpg       Fotos de la galería (ver `gallery` más abajo)
 */

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ==========================================================================
   1. DATOS DEL ESTUDIO
   ========================================================================== */

const site = {
  name: "Ziena Records",

  // Número internacional SIN "+" ni espacios (34 = España)
  whatsappNumber: "34679475522",
  phoneDisplay: "679 47 55 22",

  address: {
    street: "Av. Portugal, 133, sótano",
    postalCode: "32002",
    city: "Ourense",
  },

  hours: [
    { days: "Lunes a viernes", time: "10:00 – 23:00" },
    { days: "Sábados y domingos", time: "Con cita previa" },
  ],

  room: {
    name: "Sala Principal",
    description:
      "Sala insonorizada y acondicionada acústicamente, preparada para ensayar con banda completa o grabar tu próxima maqueta sin salir de la sala.",
    equipment: [
      "Batería completa con platos",
      "Amplificadores de guitarra y bajo",
      "Equipo de voces con PA",
      "Micrófonos de estudio",
      "Mesa de mezclas digital",
      "Grabación multipista",
    ],
  },

  // Servicios para consultar tarifa (sin precios: se piden por WhatsApp)
  services: [
    {
      name: "Ensayo",
      detail: "Por horas o con horario fijo semanal para tu banda. Backline incluido.",
    },
    {
      name: "Grabación",
      detail: "Maquetas, singles y EPs con técnico de sonido y grabación multipista.",
    },
    {
      name: "Sonido en directo",
      detail: "Equipo de PA y técnico para conciertos, festivales y eventos.",
    },
  ],
} as const;

/**
 * Galería del local. Sube las fotos a /public/galeria/ con estos nombres
 * (o cambia las rutas). Si una foto no existe, se muestra una tarjeta de reserva.
 */
const gallery = [
  { src: "/galeria/sala-principal.jpg", title: "Sala Principal", caption: "Ensayo con banda completa" },
  { src: "/galeria/bateria.jpg", title: "Batería", caption: "Kit completo con platos" },
  { src: "/galeria/amplificacion.jpg", title: "Amplificación", caption: "Guitarra y bajo" },
  { src: "/galeria/grabacion.jpg", title: "Puesto de grabación", caption: "Multipista y mezcla" },
  { src: "/galeria/microfonos.jpg", title: "Microfonía", caption: "Micrófonos de estudio" },
  { src: "/galeria/directo.jpg", title: "Sonido en directo", caption: "PA para conciertos" },
];

/**
 * Artistas y bandas que han pasado por el estudio (solo nombres reales,
 * con su permiso). Mientras la lista esté vacía, no se muestra el bloque.
 * Ejemplo: { name: "Nombre de la banda", project: "EP 2026 · Grabación" }
 */
const artists: { name: string; project: string }[] = [];

/**
 * Reseñas REALES copiadas de la ficha de Google de Ziena Records.
 * No inventes reseñas: publicar opiniones falsas es ilegal (Directiva Ómnibus).
 * Mientras la lista esté vacía, se muestra un enlace a las reseñas de Google.
 * Ejemplo: { author: "Nombre", role: "Batería", rating: 5, text: "..." }
 */
const reviews: { author: string; role?: string; rating: number; text: string }[] = [];

const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
const mapsQuery = encodeURIComponent(`Ziena Records, ${fullAddress}`);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

/* ==========================================================================
   2. COLORES Y HELPERS DE WHATSAPP
   ========================================================================== */

const COLORS = {
  ink: "#09090b",
  purple: "#a855f7",
  violet: "#8b5cf6",
  green: "#22c55e",
  emerald: "#10b981",
  whatsapp: "#25D366",
};

const BRAND_GRADIENT = `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.violet} 55%, ${COLORS.green})`;

function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber.replace(/\D/g, "")}`;
  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

const whatsappMessages = {
  general: "Hola, me gustaría pedir información sobre Ziena Records.",
  reservar: "Hola, quiero reservar la Sala Principal. ¿Qué disponibilidad tenéis?",
  presupuesto: "Hola, me gustaría pedir un presupuesto personalizado. Os cuento mi proyecto:",
  servicio: (service: string) =>
    `Hola, quiero consultar la tarifa de ${service.toLowerCase()}. ¿Qué disponibilidad tenéis?`,
  sonido: "Hola, quiero pedir presupuesto de sonido en directo para un concierto/evento.",
  grabacion: "Hola, queremos grabar con nuestra banda en Ziena Records. ¿Nos dais información?",
};

/* ==========================================================================
   3. ICONOS
   ========================================================================== */

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function LineIcon({ className = "h-5 w-5", children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const PinIcon = ({ className }: { className?: string }) => (
  <LineIcon className={className}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </LineIcon>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <LineIcon className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </LineIcon>
);

const CameraIcon = ({ className }: { className?: string }) => (
  <LineIcon className={className}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </LineIcon>
);

const MicIcon = ({ className }: { className?: string }) => (
  <LineIcon className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </LineIcon>
);

const SpeakerIcon = ({ className }: { className?: string }) => (
  <LineIcon className={className}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <circle cx="12" cy="14" r="3.5" />
    <circle cx="12" cy="7.5" r="1" />
  </LineIcon>
);

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Stars({ rating = 5, className = "h-4 w-4" }: { rating?: number; className?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill={i < rating ? "#facc15" : "rgba(255,255,255,0.15)"}
        >
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/* ==========================================================================
   4. IMAGEN CON RESPALDO (si el archivo no existe, pinta `fallback`)
   ========================================================================== */

function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      // Si la imagen falló antes de hidratar, onError no llega a dispararse
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
      }}
    />
  );
}

/* ==========================================================================
   5. BOTÓN DE WHATSAPP Y LOGO
   ========================================================================== */

type ButtonSize = "sm" | "md" | "lg";

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2.5",
  lg: "px-8 py-4 text-lg gap-3",
};

function WhatsAppButton({
  message = whatsappMessages.general,
  children = "Reservar por WhatsApp",
  size = "md",
  variant = "solid",
  className = "",
}: {
  message?: string;
  children?: ReactNode;
  size?: ButtonSize;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const solid = variant === "solid";
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center justify-center rounded-full border font-semibold",
        "transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]",
        buttonSizes[size],
        className,
      ].join(" ")}
      style={{
        borderColor: solid ? COLORS.whatsapp : "rgba(255,255,255,0.15)",
        backgroundColor: solid ? COLORS.whatsapp : "transparent",
        color: solid ? "#09090b" : "#e4e4e7",
        boxShadow: solid ? "0 10px 30px -10px rgba(37,211,102,0.55)" : "none",
      }}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

function Logo({ size = 40 }: { size?: number }) {
  return (
    <ImageWithFallback
      src="/logo.png"
      alt=""
      className="rounded-xl object-contain"
      style={{ width: size, height: size }}
      fallback={
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center rounded-xl font-black text-white"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.5,
            backgroundImage: BRAND_GRADIENT,
            boxShadow: "0 0 20px -6px rgba(168,85,247,0.7)",
          }}
        >
          Z
        </span>
      }
    />
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-[0.25em]"
      style={{ color: COLORS.purple }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{children}</h2>
  );
}

/* ==========================================================================
   6. HEADER Y BANNER PROMOCIONAL
   ========================================================================== */

function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5"
      style={{
        backgroundColor: "rgba(9,9,11,0.8)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${site.name}, inicio`}>
          <Logo size={36} />
          <span className="text-lg font-bold tracking-tight text-white">
            Ziena <span style={{ color: COLORS.purple }}>Records</span>
          </span>
        </a>

        <WhatsAppButton message={whatsappMessages.reservar} size="sm">
          <span className="hidden sm:inline">Reservar por WhatsApp</span>
          <span className="sm:hidden">Reservar</span>
        </WhatsAppButton>
      </div>
    </header>
  );
}

function PromoBanner() {
  return (
    <section id="inicio" aria-label="Banner de Ziena Records" className="px-4 pt-20 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto flex aspect-[16/9] max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-white/10 sm:aspect-[16/5]"
        style={{
          backgroundColor: "#0f0f13",
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(ellipse at 90% 100%, rgba(34,197,94,0.16), transparent 55%)",
        }}
      >
        <ImageWithFallback
          src="/banner.png"
          alt="Ziena Records, estudio de ensayo y grabación en Ourense"
          className="absolute inset-0 h-full w-full object-cover"
          fallback={
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <Logo size={72} />
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Ziena <span style={{ color: COLORS.purple }}>Records</span>
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400 sm:text-sm">
                Ensayo · Grabación · Sonido en directo
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ==========================================================================
   7. HERO
   ========================================================================== */

function RecBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
      style={{
        borderColor: "rgba(168,85,247,0.35)",
        backgroundColor: "rgba(168,85,247,0.08)",
        color: "#d8b4fe",
      }}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: COLORS.green,
            animation: "zr-ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        <span
          className="relative h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: COLORS.green,
            boxShadow: "0 0 10px 2px rgba(34,197,94,0.7)",
            animation: "zr-pulse 1.2s ease-in-out infinite",
          }}
        />
      </span>
      REC
      <span className="h-3 w-px bg-white/20" aria-hidden="true" />
      <span className="text-zinc-400">{site.address.city}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-10rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "rgba(139,92,246,0.18)", filter: "blur(130px)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <RecBadge />

        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Estudio de Ensayo y Grabación{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.violet} 45%, ${COLORS.green})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            en Ourense
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Una sala insonorizada con todo el equipo listo para tocar. Ensaya con tu banda, graba tu
          música o lleva nuestro sonido a tu directo. Reserva en un minuto por WhatsApp.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <WhatsAppButton message={whatsappMessages.reservar} size="lg">
            Reservar por WhatsApp
          </WhatsAppButton>
          <a
            href="#sala"
            className="text-sm font-semibold text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Ver la sala ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   8. SALA PRINCIPAL + CONSULTAR TARIFA
   ========================================================================== */

function RoomSection() {
  const { room, services } = site;

  return (
    <section id="sala" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionLabel>La sala</SectionLabel>
            <SectionTitle>{room.name}</SectionTitle>
            <p className="mt-4 text-zinc-400 sm:text-lg">{room.description}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Equipamiento incluido
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {room.equipment.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-200">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(34,197,94,0.12)", color: COLORS.green }}
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tarifas a medida: sin precios, consulta por WhatsApp */}
        <div
          id="tarifas"
          className="relative mt-16 overflow-hidden rounded-3xl border p-6 sm:p-10"
          style={{
            borderColor: "rgba(168,85,247,0.35)",
            backgroundImage:
              "radial-gradient(ellipse at 0% 0%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(34,197,94,0.1), transparent 55%)",
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionLabel>Tarifas</SectionLabel>
              <SectionTitle>Consultar tarifa / presupuesto personalizado</SectionTitle>
              <p className="mt-4 text-zinc-400">
                Cada proyecto es distinto. Cuéntanos qué necesitas y te respondemos por WhatsApp con
                disponibilidad y un presupuesto a tu medida.
              </p>
            </div>
            <WhatsAppButton message={whatsappMessages.presupuesto} size="lg" className="shrink-0">
              Pedir presupuesto
            </WhatsAppButton>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.name}
                className="flex flex-col rounded-2xl border border-white/10 p-6"
                style={{ backgroundColor: "rgba(9,9,11,0.6)" }}
              >
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-400">{service.detail}</p>
                <WhatsAppButton
                  message={whatsappMessages.servicio(service.name)}
                  size="sm"
                  variant="outline"
                  className="mt-5 self-start"
                >
                  Consultar tarifa
                </WhatsAppButton>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9. GALERÍA DEL LOCAL
   ========================================================================== */

function GalleryCard({
  item,
  index,
  featured,
}: {
  item: (typeof gallery)[number];
  index: number;
  featured: boolean;
}) {
  // Alterna morado y verde en las tarjetas de reserva
  const tint = index % 2 === 0 ? "rgba(139,92,246,0.3)" : "rgba(34,197,94,0.2)";

  return (
    <figure
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10",
        featured ? "col-span-2 row-span-2 min-h-[18rem]" : "min-h-[10rem] sm:min-h-[12rem]",
      ].join(" ")}
      style={{ backgroundColor: "#111114" }}
    >
      <ImageWithFallback
        src={item.src}
        alt={`${item.title}: ${item.caption}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        fallback={
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${tint}, transparent 65%)`,
            }}
          >
            <CameraIcon className="h-8 w-8 text-white/25" />
          </div>
        }
      />
      <figcaption
        className="absolute inset-x-0 bottom-0 p-4"
        style={{ backgroundImage: "linear-gradient(to top, rgba(9,9,11,0.9), transparent)" }}
      >
        <p className="font-semibold text-white">{item.title}</p>
        <p className="text-xs text-zinc-400">{item.caption}</p>
      </figcaption>
    </figure>
  );
}

function GallerySection() {
  return (
    <section id="galeria" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Galería</SectionLabel>
        <SectionTitle>Conoce el local</SectionTitle>
        <p className="mt-4 max-w-2xl text-zinc-400 sm:text-lg">
          La sala, el equipo y el espacio donde suenan los ensayos y grabaciones.
        </p>

        <div className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <GalleryCard key={item.src} item={item} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   10. ARTISTAS Y PROYECTOS
   ========================================================================== */

function ArtistsSection() {
  const features = [
    {
      icon: <MicIcon className="h-6 w-6" />,
      color: COLORS.purple,
      bg: "rgba(168,85,247,0.12)",
      title: "Han pasado por el estudio",
      text: "Bandas y solistas que han ensayado y grabado sus maquetas, singles y EPs en Ziena Records. Te acompañamos desde la primera toma hasta la mezcla.",
      cta: "Grabar con mi banda",
      message: whatsappMessages.grabacion,
    },
    {
      icon: <SpeakerIcon className="h-6 w-6" />,
      color: COLORS.green,
      bg: "rgba(34,197,94,0.12)",
      title: "Sonorización en directo",
      text: "Llevamos equipo de PA y técnico de sonido a conciertos, festivales y eventos, para que tu banda suene igual de bien sobre el escenario que en el local.",
      cta: "Presupuesto de sonido",
      message: whatsappMessages.sonido,
    },
  ];

  return (
    <section id="artistas" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Artistas y proyectos</SectionLabel>
        <SectionTitle>Música hecha en Ourense</SectionTitle>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                {f.icon}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-3 flex-1 text-zinc-400">{f.text}</p>
              <WhatsAppButton message={f.message} size="sm" variant="outline" className="mt-6 self-start">
                {f.cta}
              </WhatsAppButton>
            </article>
          ))}
        </div>

        {artists.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {artists.map((a) => (
              <li
                key={a.name}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm"
              >
                <span className="font-semibold text-white">{a.name}</span>
                <span className="text-zinc-500"> · {a.project}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   11. RESEÑAS + UBICACIÓN Y MAPA
   ========================================================================== */

function ReviewsBlock() {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <Stars className="h-6 w-6" />
        <h3 className="mt-4 text-xl font-semibold text-white">Opiniones en Google</h3>
        <p className="mt-2 text-zinc-400">
          Lee lo que dicen los músicos que han pasado por la sala, o cuéntanos tu experiencia.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Ver reseñas en Google
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/40"
          >
            Dejar una reseña
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((r) => (
        <figure
          key={`${r.author}-${r.text.slice(0, 16)}`}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <Stars rating={r.rating} />
          <blockquote className="mt-3 text-zinc-200">“{r.text}”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3 text-sm">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              {r.author.charAt(0).toUpperCase()}
            </span>
            <span>
              <span className="font-semibold text-white">{r.author}</span>
              {r.role && <span className="text-zinc-500"> · {r.role}</span>}
            </span>
          </figcaption>
        </figure>
      ))}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold transition-colors hover:text-white"
        style={{ color: COLORS.green }}
      >
        Ver todas las reseñas en Google →
      </a>
    </div>
  );
}

function ReviewsAndLocationSection() {
  return (
    <section id="contacto" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Opiniones y ubicación</SectionLabel>
        <SectionTitle>Te esperamos en Ourense</SectionTitle>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Columna izquierda: reseñas + datos de contacto */}
          <div className="flex flex-col gap-8">
            <ReviewsBlock />

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(168,85,247,0.12)", color: COLORS.purple }}
                >
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{site.address.street}</p>
                  <p className="text-zinc-400">
                    {site.address.postalCode} {site.address.city}
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold transition-colors hover:text-white"
                    style={{ color: COLORS.green }}
                  >
                    Cómo llegar →
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(168,85,247,0.12)", color: COLORS.purple }}
                >
                  <ClockIcon className="h-5 w-5" />
                </span>
                <dl className="space-y-1">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-white">{h.days}:</dt>
                      <dd className="text-zinc-400">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </li>
              <li className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(37,211,102,0.12)", color: COLORS.whatsapp }}
                >
                  <WhatsAppIcon />
                </span>
                <div>
                  <p className="font-semibold text-white">{site.phoneDisplay}</p>
                  <p className="text-zinc-400">Respondemos rápido por WhatsApp</p>
                </div>
              </li>
            </ul>

            <WhatsAppButton message={whatsappMessages.general} size="lg" className="self-start">
              Escríbenos por WhatsApp
            </WhatsAppButton>
          </div>

          {/* Columna derecha: mapa interactivo */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={`Mapa: ${fullAddress}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-96 w-full lg:h-full lg:min-h-[32rem]"
              style={{ border: 0, filter: "grayscale(0.6) invert(0.92) hue-rotate(180deg)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   12. FOOTER Y BOTÓN FLOTANTE
   ========================================================================== */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
        <span>{fullAddress}</span>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{
        right: "1.25rem",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        backgroundColor: COLORS.whatsapp,
        boxShadow: "0 12px 30px -8px rgba(37,211,102,0.6)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          backgroundColor: "rgba(37,211,102,0.45)",
          animation: "zr-ping 2s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

/* ==========================================================================
   13. PÁGINA
   ========================================================================== */

export default function HomePage() {
  return (
    <div className="min-h-screen text-zinc-200 antialiased" style={{ backgroundColor: COLORS.ink }}>
      {/* Estilos globales y animaciones propias (no dependen de la config de Tailwind) */}
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 4.5rem; }
        body { background-color: ${COLORS.ink}; overflow-x: hidden; }
        ::selection { background: rgba(168,85,247,0.35); color: #fff; }
        @keyframes zr-pulse { 0%,100% { opacity: 1 } 50% { opacity: .4 } }
        @keyframes zr-ping { 0% { transform: scale(1); opacity: .7 } 75%,100% { transform: scale(2); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <Header />

      <main id="contenido">
        <PromoBanner />
        <Hero />
        <RoomSection />
        <GallerySection />
        <ArtistsSection />
        <ReviewsAndLocationSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
