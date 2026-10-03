import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

// URL pública del sitio (canonical, Open Graph y datos estructurados)
const siteUrl = site.url;

const fullTitle = "Ziena Records | Estudio de Grabación y local de ensayo en Ourense";
const description =
  "Estudio de grabación y local de ensayo en Ourense (Av. Portugal, 133, sótano). Equipamiento profesional y reserva directa por WhatsApp.";

// Imagen al compartir en redes (WhatsApp, Facebook, X...): el banner del logo sobre negro
const ogImage = {
  url: "/banner.png",
  width: 1754,
  height: 1240,
  alt: `${site.name} - ${site.tagline} en ${site.address.city}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: fullTitle,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "estudio de grabación Ourense",
    "local de ensayo Ourense",
    "sala de ensayo Ourense",
    "alquiler sala de ensayo",
    "grabación de maquetas",
    "producción musical",
    "sonido en directo",
    "Ziena Records",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "music",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: site.name,
    title: fullTitle,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Iconos: Next.js usa automáticamente src/app/favicon.ico, icon.png y apple-icon.png
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Datos estructurados para Google (negocio local)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#negocio`,
  name: site.name,
  description,
  url: siteUrl,
  telephone: `+${site.whatsappNumber}`,
  ...(site.email ? { email: site.email } : {}),
  image: `${siteUrl}/banner.png`,
  logo: `${siteUrl}/logo.png`,
  hasMap: site.mapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    addressCountry: "ES",
  },
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body>
        {/* Enlace para saltar la navegación (accesibilidad) */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Saltar al contenido
        </a>

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
