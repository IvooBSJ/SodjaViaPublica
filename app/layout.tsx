import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sodja Via Publica - Publicidad Exterior",
  description: "Especialistas en publicidad en vía pública: vallas, pantallas digitales y más",
  generator: "Ivo Sodja",
  keywords: [
    "Comercio",
    "carteles",
    "Sodja Via Publica",
    "sodja via publica",
    "sodja via publica pagina",
    "sodja via publica pagina web",
    "sodja via publica ubicacion",
  ],
  icons: {
    icon: "/images/logo.png", // Actualizado a la nueva imagen
  },
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
