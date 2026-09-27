import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const title = "Check Imóvel — checklist para comprar, manter e construir";
const description =
  "Checklist completo e gratuito para comprar imóvel, manter um imóvel e construir uma casa: vistoria, documentação, custos, financiamento, manutenção, reforma e projeto/obra. Marque o que já verificou e o progresso fica salvo no navegador.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Check Imóvel",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Q1VmQemgPPenEFqms367cx7-oNHGsMldXIrYSrQSoBg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorantGaramond.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
