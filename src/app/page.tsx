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
 */

import { useState } from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   1. DATOS DEL ESTUDIO (revisa teléfono, tarifas y equipo)
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
    specs: [
      { label: "Superficie", value: "25 m²" },
      { label: "Capacidad", value: "Hasta 6 músicos" },
      { label: "Climatización", value: "Sí" },
    ],
    equipment: [
      "Batería completa con platos",
      "Amplificadores de guitarra y bajo",
      "Equipo de voces con PA",
      "Micrófonos de estudio",
      "Mesa de mezclas digital",
      "Grabación multipista",
    ],
  },

  rates: [
    {
      name: "Ensayo",
      price: "10 €",
      unit: "/ hora",
      detail: "Backline incluido. Mínimo 2 horas.",
      featured: false,
    },
    {
      name: "Grabación",
      price: "25 €",
      unit: "/ hora",
      detail: "Técnico de sonido incluido. Grabación multipista.",
      featured: true,
    },
    {
      name: "Cuota mensual",
      price: "Consultar",
      unit: "",
      detail: "Horario fijo semanal para tu banda.",
      featured: false,
    },
  ],
} as const;

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

function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber.replace(/\D/g, "")}`;
  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

const whatsappMessages = {
  general: "Hola, me gustaría pedir información sobre Ziena Records.",
  reservar: "Hola, quiero reservar la Sala Principal. ¿Qué disponibilidad tenéis?",
  tarifa: (rate: string) => `Hola, me interesa la tarifa de ${rate}. ¿Qué disponibilidad tenéis?`,
};

/* ==========================================================================
   3. ICONOS Y BOTÓN DE WHATSAPP
   ========================================================================== */

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

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
  className = "",
}: {
  message?: string;
  children?: ReactNode;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold text-zinc-950",
        "transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]",
        buttonSizes[size],
        className,
      ].join(" ")}
      style={{
        backgroundColor: COLORS.whatsapp,
        boxShadow: "0 10px 30px -10px rgba(37,211,102,0.55)",
      }}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

/* ==========================================================================
   4. LOGO (usa /logo.png; si no existe, muestra un monograma "Z")
   ========================================================================== */

function Logo({ size = 40 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center rounded-xl font-black text-white"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.5,
          backgroundImage: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.violet} 55%, ${COLORS.green})`,
        }}
      >
        Z
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="rounded-xl object-contain"
      style={{ width: size, height: size }}
    />
  );
}

/* ==========================================================================
   5. HEADER (logo + nombre + botón de reserva)
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

/* ==========================================================================
   6. HERO
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
            boxShadow: `0 0 10px 2px rgba(34,197,94,0.7)`,
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
    <section
      id="inicio"
      className="relative isolate flex flex-col justify-center overflow-hidden pb-20 pt-32 sm:pt-40"
      style={{ minHeight: "100svh" }}
    >
      {/* Fondo: resplandores morado y verde */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-12rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "rgba(139,92,246,0.22)", filter: "blur(130px)" }}
        />
        <div
          className="absolute bottom-[-6rem] right-[-6rem] h-80 w-80 rounded-full"
          style={{ backgroundColor: "rgba(34,197,94,0.12)", filter: "blur(110px)" }}
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
          Una sala insonorizada con todo el equipo listo para tocar. Ensaya con tu banda o graba
          tu música. Reserva en un minuto por WhatsApp.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <WhatsAppButton message={whatsappMessages.reservar} size="lg">
            Reservar por WhatsApp
          </WhatsAppButton>
          <a
            href="#sala"
            className="text-sm font-semibold text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Ver sala y tarifas ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. FICHA DE LA SALA PRINCIPAL + TARIFAS
   ========================================================================== */

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

function RoomSection() {
  const { room, rates } = site;

  return (
    <section id="sala" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>La sala</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {room.name}
          </h2>
          <p className="mt-4 text-zinc-400 sm:text-lg">{room.description}</p>
        </div>

        {/* Ficha: datos + equipamiento */}
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:col-span-2 lg:grid-cols-1">
            {room.specs.map((spec) => (
              <div key={spec.label} className="p-5 sm:p-6" style={{ backgroundColor: COLORS.ink }}>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{spec.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-white sm:text-xl">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3">
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

        {/* Tarifas */}
        <div id="tarifas" className="mt-20">
          <SectionLabel>Tarifas</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Precios claros, sin sorpresas
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rates.map((rate) => (
              <article
                key={rate.name}
                className="relative flex flex-col rounded-2xl border p-6 sm:p-8"
                style={{
                  borderColor: rate.featured ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.1)",
                  backgroundColor: rate.featured ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
                  boxShadow: rate.featured ? "0 20px 60px -30px rgba(168,85,247,0.6)" : "none",
                }}
              >
                {rate.featured && (
                  <span
                    className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: COLORS.violet }}
                  >
                    Más popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{rate.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {rate.price}
                  </span>
                  {rate.unit && <span className="text-zinc-400">{rate.unit}</span>}
                </p>
                <p className="mt-3 flex-1 text-sm text-zinc-400">{rate.detail}</p>
                <a
                  href={getWhatsAppLink(whatsappMessages.tarifa(rate.name.toLowerCase()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    borderColor: rate.featured ? COLORS.whatsapp : "rgba(255,255,255,0.15)",
                    backgroundColor: rate.featured ? COLORS.whatsapp : "transparent",
                    color: rate.featured ? "#09090b" : "#e4e4e7",
                  }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Reservar
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   8. UBICACIÓN Y CONTACTO
   ========================================================================== */

function ContactSection() {
  return (
    <section id="contacto" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col">
          <SectionLabel>Ubicación y contacto</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Te esperamos en Ourense
          </h2>

          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(168,85,247,0.12)", color: COLORS.purple }}
              >
                <PinIcon />
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
                <ClockIcon />
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

          <div className="mt-10">
            <WhatsAppButton message={whatsappMessages.general} size="lg">
              Escríbenos por WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title={`Mapa: ${fullAddress}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full lg:h-full lg:min-h-[28rem]"
            style={{ border: 0, filter: "grayscale(0.6) invert(0.92) hue-rotate(180deg)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9. FOOTER Y BOTÓN FLOTANTE
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
   10. PÁGINA
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
        <Hero />
        <RoomSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
