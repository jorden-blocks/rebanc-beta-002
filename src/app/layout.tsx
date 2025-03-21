import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from '@/context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebanc - Blockchain bankieren voor iedereen",
  description: "Veilig en gebruiksvriendelijk bankieren op de blockchain",
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#5046e5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Voor nu, laten we de cookies aanpak vereenvoudigen
  // en alleen de children doorgeven zonder cookies
  return (
    <html lang="nl">
      <body className={inter.className}>
        <ContextProvider cookies={null}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
