import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paroisse Saint Pierre-Le-Jeune catholique",
  description:
    "Vie de la paroisse, horaires des messes, confession, chapelet, rosaire, adoration, vie de quartier | Paroisse Saint Pierre le Jeune Catholique à Strasbourg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="grow bg-splj-creme">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
