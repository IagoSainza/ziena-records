"use client";

/**
 * page.tsx STANDALONE
 * Todo el Bloque 1 + Bloque 2 en un solo archivo, sin imports de
 * carpetas externas (@/components, @/lib, @/data).
 *
 * Solo depende de React y de las clases de Tailwind (v3 o v4):
 * no usa colores ni utilidades personalizadas del tema, todo va con
 * valores directos (#0a0a0b, #25D366, amber-*) y estilos en línea.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   1. DATOS DEL LOCAL (datos de EJEMPLO: sustitúyelos por los reales)
   ========================================================================== */

const site = {
  name: "Overdrive Studio",
  shortName: "Overdrive",
  tagline: "Salas de ensayo y estudio de grabación",

  // Número internacional SIN "+" ni espacios (34 = España)
  whatsappNumber: "34600123456",
  phoneDisplay: "600 123 456",
  email: "hola@overdrivestudio.es",

  address: {
    street: "Calle de la Música, 12 (nave 3)",
    postalCode: "28000",
    city: "Madrid",
  },

  hours: [
    { days: "Lunes a viernes", time: "10:00 – 23:00" },
    { days: "Sábados", time: "11:00 – 23:00" },
    { days: "Domingos", time: "12:00 – 21:00" },
  ],

  nav: [
    { label: "Salas", href: "#salas" },
    { label: "Tarifas", href: "#tarifas" },
    { label: "Estudio", href: "#estudio" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
  ],

  trustPoints: [
    { value: "3", label: "Salas insonorizadas" },
    { value: "Backline", label: "Incluido en cada sala" },
    { value: "7 días", label: "Abierto toda la semana" },
    { value: "< 1 h", label: "Respuesta por WhatsApp" },
  ],

  legal: {
    companyName: "Overdrive Studio S.L.",
    taxId: "B-12345678",
    registeredAddress: "Calle de la Música, 12 (nave 3), 28000 Madrid",
    email: "legal@overdrivestudio.es",
    notice:
      "En cumplimiento de la Ley 34/2002 (LSSI-CE), este sitio web es titular de Overdrive Studio S.L., con NIF B-12345678 y domicilio en Calle de la Música, 12 (nave 3), 28000 Madrid.",
  },
};

/* ==========================================================================
   2. HELPERS DE WHATSAPP
   ========================================================================== */

function getWhatsAppLink(message?: string, phone: string = site.whatsappNumber) {
  const cleanPhone = phone.replace(/\D/g, "");
  const base = `https://wa.me/${cleanPhone}`;
  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

const whatsappMessages = {
  general: "Hola, me gustaría pedir información sobre el local.",
  reservarSala: (roomName?: string) =>
    roomName
      ? `Hola, quiero reservar la ${roomName}. ¿Qué disponibilidad tenéis?`
      : "Hola, quiero reservar una sala de ensayo. ¿Qué disponibilidad tenéis?",
};

/* ==========================================================================
   3. COMPONENTES DE INTERFAZ: ICONO Y BOTÓN DE WHATSAPP
   ========================================================================== */

const COLORS = {
  ink: "#0a0a0b",
  whatsapp: "#25D366",
  whatsappDark: "#1ebe5a",
};

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
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
  fullWidth = false,
  className = "",
}: {
  message?: string;
  children?: ReactNode;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold text-zinc-950",
        "transition-all duration-200 active:scale-[0.98]",
        buttonSizes[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundColor: hover ? COLORS.whatsappDark : COLORS.whatsapp,
        boxShadow: hover
          ? "0 10px 30px -8px rgba(37,211,102,0.6)"
          : "0 8px 24px -10px rgba(37,211,102,0.45)",
      }}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

/* ==========================================================================
   4. HEADER (fijo, con menú hamburguesa en móvil)
   ========================================================================== */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fondo del header al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll con el menú abierto y cierra con Escape
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: solid ? "rgba(10,10,11,0.92)" : "transparent",
        borderColor: solid ? "rgba(255,255,255,0.1)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        WebkitBackdropFilter: solid ? "blur(12px)" : "none",
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-white"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500"
            style={{
              boxShadow: "0 0 12px 2px rgba(245,158,11,0.7)",
              animation: "od-pulse 1.6s ease-in-out infinite",
            }}
          />
          {site.shortName}
          <span className="text-amber-500">.</span>
        </a>

        {/* Navegación escritorio */}
        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-amber-500"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA escritorio */}
        <div className="hidden md:block">
          <WhatsAppButton message={whatsappMessages.reservarSala()} size="sm">
            Reservar
          </WhatsAppButton>
        </div>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300 ease-out md:hidden"
        style={{
          maxHeight: menuOpen ? "32rem" : "0",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-white/5">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block py-4 text-lg font-semibold text-zinc-200 transition-colors hover:text-amber-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <WhatsAppButton message={whatsappMessages.reservarSala()} fullWidth size="lg">
              Reservar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   5. HERO (portada)
   ========================================================================== */

// Barras del ecualizador decorativo: altura máxima (%), duración y retardo
const EQ_BARS = [
  { h: 35, d: 0.9, delay: 0 },
  { h: 70, d: 1.2, delay: 0.15 },
  { h: 50, d: 0.8, delay: 0.3 },
  { h: 90, d: 1.4, delay: 0.05 },
  { h: 60, d: 1.0, delay: 0.45 },
  { h: 80, d: 1.3, delay: 0.2 },
  { h: 40, d: 0.7, delay: 0.35 },
  { h: 65, d: 1.1, delay: 0.1 },
  { h: 85, d: 1.5, delay: 0.5 },
  { h: 45, d: 0.95, delay: 0.25 },
  { h: 75, d: 1.25, delay: 0.4 },
  { h: 30, d: 0.85, delay: 0.12 },
];

function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden pt-24"
      style={{ backgroundColor: COLORS.ink, minHeight: "100svh" }}
    >
      {/* Fondo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Resplandores ámbar */}
        <div
          className="absolute left-1/2 -top-40 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full"
          style={{ backgroundColor: "rgba(245,158,11,0.2)", filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 rounded-full"
          style={{ backgroundColor: "rgba(234,88,12,0.12)", filter: "blur(100px)" }}
        />
        {/* Rejilla sutil */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* Fundido inferior */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ backgroundImage: `linear-gradient(to top, ${COLORS.ink}, transparent)` }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Etiqueta REC */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400"
          style={{
            borderColor: "rgba(245,158,11,0.3)",
            backgroundColor: "rgba(245,158,11,0.1)",
          }}
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: "#ef4444",
              boxShadow: "0 0 8px 2px rgba(239,68,68,0.7)",
              animation: "od-pulse 1.2s ease-in-out infinite",
            }}
          />
          REC · {site.address.city} · {site.tagline}
        </div>

        {/* Título */}
        <h1 className="max-w-4xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Tu música suena mejor{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(to right, #fbbf24, #ea580c)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            aquí
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Salas de ensayo insonorizadas con backline incluido, estudio de grabación y
          producción, y alquiler de equipo de sonido e instrumentos. Reserva en un minuto por
          WhatsApp.
        </p>

        {/* Botones */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppButton
            message={whatsappMessages.reservarSala()}
            size="lg"
            className="sm:w-auto"
            fullWidth
          >
            Reservar sala
          </WhatsAppButton>
          <a
            href="#tarifas"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-amber-500 hover:text-amber-500 sm:w-auto"
          >
            Ver tarifas
          </a>
        </div>

        {/* Ecualizador decorativo */}
        <div aria-hidden="true" className="mt-12 flex h-14 items-end gap-1.5 sm:h-20">
          {EQ_BARS.map((bar, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full sm:w-2"
              style={{
                height: `${bar.h}%`,
                backgroundImage: "linear-gradient(to top, #d97706, #fcd34d)",
                transformOrigin: "bottom",
                animation: `od-eq ${bar.d}s ease-in-out ${bar.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Datos de confianza */}
        <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-8">
          {site.trustPoints.map((point) => (
            <div key={point.label}>
              <dt className="text-2xl font-extrabold text-amber-500 sm:text-3xl">
                {point.value}
              </dt>
              <dd className="mt-1 text-sm text-zinc-400">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. BOTÓN FLOTANTE DE WHATSAPP
   ========================================================================== */

function FloatingWhatsApp({
  message = whatsappMessages.general,
  showAfter = 320,
}: {
  message?: string;
  showAfter?: number;
}) {
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
      className="fixed z-40 flex items-center gap-2 rounded-full p-4 text-zinc-950 transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        right: "1rem",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        backgroundColor: COLORS.whatsapp,
        boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(1rem)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Onda de aviso */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          backgroundColor: "rgba(37,211,102,0.4)",
          animation: "od-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:inline">¿Hablamos?</span>
    </a>
  );
}

/* ==========================================================================
   7. PÁGINA
   ========================================================================== */

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-zinc-200"
      style={{ backgroundColor: COLORS.ink, scrollBehavior: "smooth" }}
    >
      {/* Animaciones propias (no dependen de la configuración de Tailwind) */}
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 4.5rem; }
        body { background-color: ${COLORS.ink}; }
        @keyframes od-pulse { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
        @keyframes od-eq { 0%,100% { transform: scaleY(.35) } 50% { transform: scaleY(1) } }
        @keyframes od-ping { 0% { transform: scale(1); opacity: .7 } 75%,100% { transform: scale(1.8); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <Header />

      <main id="contenido">
        <Hero />
        {/* Próximos bloques: Servicios, Salas, Tarifas, Estudio, Equipo, Contacto... */}
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
