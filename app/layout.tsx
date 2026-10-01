import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matemática do Saber | Professor Raul Novak",
  description: "Seu filho trava na hora de fazer a conta? Conheça o combo Matemática + Tabuada, com aulas gravadas do professor Raul Novak para fortalecer a base e praticar.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/falcao-novak-invertido.png", shortcut: "/assets/falcao-novak-invertido.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
