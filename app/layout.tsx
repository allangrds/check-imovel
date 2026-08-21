import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";

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

const siteUrl = "https://check-imovel.vercel.app";
const title = "Check Imóvel — checklist para avaliar antes de comprar";
const description =
  "Checklist completo e gratuito para avaliar a compra de casas e apartamentos: vistoria, documentação, custos, financiamento, manutenção e reforma. Marque o que já verificou e o progresso fica salvo no navegador.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorantGaramond.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
