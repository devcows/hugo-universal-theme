import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { i18nConfig, Locale } from "@/i18n/config";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Amayara Solutions - Expert IT Solutions & Consulting",
  description: "Transform your business with cutting-edge technology solutions. Custom software development, cloud solutions, cybersecurity, and IT consulting services.",
  keywords: "IT Solutions, Software Development, Cloud Computing, Cybersecurity, Digital Transformation",
  metadataBase: new URL('https://amayara.com'),
  icons: null,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amayara.com',
    title: 'Amayara Solutions - Expert IT Solutions & Consulting',
    description: 'Transform your business with cutting-edge technology solutions.',
    siteName: 'Amayara Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amayara Solutions - Expert IT Solutions & Consulting',
    description: 'Transform your business with cutting-edge technology solutions.',
  },
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={locale} className="h-full scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FXQ94TKRBT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXQ94TKRBT');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
    