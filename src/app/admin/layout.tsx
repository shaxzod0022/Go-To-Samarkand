import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Go To Samarkand Admin",
  description: "You can use our services through this site",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="hydrate">
      <body className={`antialiased mx-auto w-full max-w-[1800px]`}>
        {children}
      </body>
    </html>
  );
}
