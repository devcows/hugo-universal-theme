import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Amayara Solutions - Expert IT Solutions & Consulting",
  description: "Transform your business with cutting-edge technology solutions. Custom software development, cloud solutions, cybersecurity, and IT consulting services.",
  keywords: "IT Solutions, Software Development, Cloud Computing, Cybersecurity, Digital Transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
    