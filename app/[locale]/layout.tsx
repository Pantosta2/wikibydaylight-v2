import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { pick } from "@/utility";
import "@/app/globals.css";

const locales = ["en", "es", "fr", "ru"];

export const metadata: Metadata = {
  title: "WikiByDaylight",
  description: "N/A",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, [
            "nav",
            "mainPage",
            "notFoundPage",
            "makeYourBuild",
          ])}
        >
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}