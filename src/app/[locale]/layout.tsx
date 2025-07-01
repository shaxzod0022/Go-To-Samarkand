import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Go To Samarkand",
  description: "You can use our services through this site",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const messages = await getMessages();

  return (
    <html lang={params.locale} suppressHydrationWarning className="hydrate">
      <body className="antialiased mx-auto w-full max-w-[1800px]">
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
