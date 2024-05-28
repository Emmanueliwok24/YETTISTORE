import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { Toaster } from "sonner";
import QueryProviderContext from "@/contexts/reactquery";
import Footer from "@/components/route_components/footer";

import "../globals.css";

export const metadata: Metadata = {
  title: "Yetti Store Front",
  description: "Shop with YETTI STORE-FRONT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} flex flex-col min-h-screen`}>
        <Toaster richColors position="top-center" />
        <QueryProviderContext>
          <main className="py-10">
            {children}
          </main>
          <Footer />
        </QueryProviderContext>
      </body>
    </html>
  );
}
