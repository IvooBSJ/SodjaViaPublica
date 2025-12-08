import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SODJA Vía Pública | Publicidad Exterior en Chaco - Vallas, Pantallas LED",
  description:
    "Empresa líder en publicidad exterior en Resistencia, Chaco. Vallas publicitarias, pantallas LED, carteleras ruteras. +15 años de experiencia, 200+ ubicaciones.",
  keywords:
    "publicidad exterior chaco, vallas publicitarias resistencia, pantallas led, cartelería chaco, publicidad vía pública",
  authors: [{ name: "SODJA Vía Pública" }],
  openGraph: {
    title: "SODJA Vía Pública - Publicidad Exterior en Chaco",
    description: "Vallas, pantallas LED y cartelería en ubicaciones estratégicas",
    url: "https://www.sodjaviapublica.com",
    siteName: "SODJA Vía Pública",
    images: [{ url: "/images/logo.png", width: 800, height: 600 }],
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Esquema JSON-LD para SEO avanzado
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SODJA Vía Pública",
  image: "/images/logo.png",
  "@id": "https://www.sodjaviapublica.com",
  url: "https://www.sodjaviapublica.com",
  telephone: "+54-362-4531414",
  email: "sodjaletreros@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Castelli 175",
    addressLocality: "Resistencia",
    addressRegion: "Chaco",
    postalCode: "H3500",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -27.4586,
    longitude: -58.9920,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.facebook.com/people/SODJA-Via-Publica/100063490182954/",
    "https://www.instagram.com/sodjaviapublica/",
  ],
  priceRange: "$$",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        {/* Favicon y metadatos adicionales */}
        <link rel="icon" href="/images/logo.jpg" />

        {/* Metadatos para redes sociales (opcional) */}
        <meta property="og:title" content="Sodja Via Publica" />
        <meta property="og:description" content="Especialistas en publicidad exterior" />
        <meta property="og:image" content="/images/logo.png" />
      </Head>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="hidden md:block fixed top-4 left-4 z-50">
            <Image
              src="/images/logo.png"
              alt="Logo Sodja Via Publica"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}