import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Alturas (%) y tiempos de las barras del ecualizador decorativo. */
const EQ_BARS = [
  { h: 35, d: "0.9s", delay: "0s" },
  { h: 70, d: "1.2s", delay: "0.15s" },
  { h: 50, d: "0.8s", delay: "0.3s" },
  { h: 90, d: "1.4s", delay: "0.05s" },
  { h: 60, d: "1.0s", delay: "0.45s" },
  { h: 80, d: "1.3s", delay: "0.2s" },
  { h: 40, d: "0.7s", delay: "0.35s" },
  { h: 65, d: "1.1s", delay: "0.1s" },
  { h: 85, d: "1.5s", delay: "0.5s" },
  { h: 45, d: "0.95s", delay: "0.25s" },
  { h: 75, d: "1.25s", delay: "0.4s" },
  { h: 30, d: "0.85s", delay: "0.12s" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#0a0a0b] pt-24"
    >
      {/* ---------- Fondo ---------- */}
      {/* Sustituye este bloque por <Image> / <video> con foto real del local cuando la tengas. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Resplandor ámbar (piloto de grabación) */}
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-orange-600/10 blur-[100px]" />
        {/* Rejilla sutil */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* Degradado inferior para fundir con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Etiqueta "REC" */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <span
            aria-hidden="true"
            className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"
          />
          {site.address.city} · {site.tagline}
        </div>

        {/* Frase gancho */}
        <h1 className="max-w-4xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Tu música suena mejor{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            aquí
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Salas de ensayo insonorizadas con backline incluido, estudio de
          grabación y producción, y alquiler de equipo de sonido e
          instrumentos. Reserva en un minuto por WhatsApp.
        </p>

        {/* CTAs */}
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
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-amber-500 hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:w-auto"
          >
            Ver tarifas
          </a>
        </div>

        {/* Ecualizador decorativo */}
        <div
          aria-hidden="true"
          className="mt-12 flex h-14 items-end gap-1.5 sm:h-20"
        >
          {EQ_BARS.map((bar, i) => (
            <span
              key={i}
              className="w-1.5 animate-pulse rounded-full bg-gradient-to-t from-amber-600 to-amber-300 sm:w-2"
              style={{
                height: `${bar.h}%`,
                animationDuration: bar.d,
                animationDelay: bar.delay,
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

      {/* Indicador de scroll */}
      <a
        href="#servicios"
        aria-label="Ir a servicios"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-zinc-500 transition-colors hover:text-amber-500 md:block"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 animate-bounce"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

export default Hero;
