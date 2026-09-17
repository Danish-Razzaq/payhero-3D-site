import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/layout/Providers";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { site } from "@/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: site.defaultTitle,
    template: "%s | PAYHERO",
  },
  description: site.defaultDescription,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
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
  openGraph: {
    title: site.defaultTitle,
    description: site.ogDescription,
    url: site.origin,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: site.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: site.social.twitterHandle,
    title: site.defaultTitle,
    description: site.twitterDescription,
    images: ["/twitter-image"],
  },
  other: {
    "geo.region": site.geo.region,
    "geo.placename": site.geo.placename,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <SkipLink />
          <Navbar />
          {children}
          <Footer />
          <StickyMobileCta />
        </Providers>
        <OrganizationSchema />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${site.ga4Id}');`}
        </Script>
      </body>
    </html>
  );
}
