import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ConvexClientProvider } from "../ConvexClientProvider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movix - Fast, Reliable Local Delivery",
  description: "Movix helps you deliver packages across the city quickly, safely, and with full visibility.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<any>;
}) {
  const { lang } = await params;
  const isRtl = lang === "ar";
  const dir = isRtl ? "rtl" : "ltr";



  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`
    ${geistSans.variable}
    ${geistMono.variable}
    antialiased
    bg-background
    text-foreground
  `}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
