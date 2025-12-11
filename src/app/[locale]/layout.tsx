import type { Metadata } from "next";
import fonts from "@/fonts";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import LoaderHost from "@/components/loader-host";
import QueryProvider from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    metadataBase: new URL("https://sme-portal.afreximbank.net"),
    title: {
      default: "Afreximbank SME Portal - Empowering African SMEs",
      template: "%s | Afreximbank SME Portal",
    },
    description:
      "Afreximbank SME Portal: Empowering African Small and Medium Enterprises across Africa. Access banking services, finance solutions, and business support all in one place.",
    keywords: [
      "Afreximbank",
      "SME Portal",
      "Banking",
      "Finance",
      "African Export-Import Bank",
      "Small Medium Enterprises",
      "African Business",
      "Trade Finance",
      "Business Loans",
      "SME Support",
    ],
    authors: [
      {
        name: "Afreximbank",
        url: "https://www.afreximbank.com",
      },
    ],
    creator: "Afreximbank",
    publisher: "Afreximbank",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
        ar: "/ar",
        pt: "/pt",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://sme-portal.afreximbank.net",
      title: "Afreximbank SME Portal - Empowering African SMEs",
      description:
        "Afreximbank SME Portal: Empowering African Small and Medium Enterprises across Africa. Access banking services, finance solutions, and business support all in one place.",
      siteName: "Afreximbank SME Portal",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Afreximbank SME Portal",
        },
        {
          url: "/og-image-square.png",
          width: 1200,
          height: 1200,
          alt: "Afreximbank SME Portal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Afreximbank SME Portal - Empowering African SMEs",
      description:
        "Empowering African Small and Medium Enterprises across Africa. Access banking services, finance solutions, and business support all in one place.",
      images: ["/twitter-image.png"],
      creator: "@afreximbank",
      site: "@afreximbank",
    },
    verification: {
      google: "your-google-verification-code",
    },
    category: "Banking",
    classification: "Banking and Financial Services",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Afreximbank SME Portal",
    url: "https://sme-portal.afreximbank.net",
    logo: "https://sme-portal.afreximbank.net/logo.png",
    description:
      "Afreximbank SME Portal: Empowering African Small and Medium Enterprises across Africa.",
    sameAs: [
      "https://www.afreximbank.com",
      "https://twitter.com/afreximbank",
      "https://linkedin.com/company/afreximbank",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "African Export-Import Bank",
      url: "https://www.afreximbank.com",
    },
  };

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="scroll-smooth"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={cn(
          fonts.geistSans.variable,
          fonts.geistMono.variable,
          fonts.inter.variable,
          "antialiased relative min-h-svh grid grid-rows-[1fr_auto]"
        )}
      >
        <NextIntlClientProvider locale={locale}>
          <QueryProvider>
            <LoaderHost />
            <Toaster richColors position="top-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
