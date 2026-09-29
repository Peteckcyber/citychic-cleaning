import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { company } from "@/data/company";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { serializeJsonLd, siteJsonLd, siteName } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const defaultDescription =
  "Post-construction, deep cleaning and fogging disinfection for Lagos homes, offices and new builds. Vetted crews since 2019. Get a free quote on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${siteName} | Post-Construction and Deep Cleaning in Lagos`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  creator: company.legalName,
  publisher: company.legalName,
  category: "Cleaning Services",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#232D84",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={jakarta.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
