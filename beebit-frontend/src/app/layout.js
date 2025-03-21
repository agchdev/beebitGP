import Plantilla from "@/components/layout/Plantilla"; // ✅ Usa alias @ para evitar errores de rutas
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Beebit App",
  description: "Plataforma de gestión de proyectos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Plantilla />
        <main>{children}</main>
      </body>
    </html>
  );
}
