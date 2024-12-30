import type { Metadata } from "next";
import localFont from "next/font/local";
import { getRandomValues } from 'crypto';
import { IV_SIZE } from './utils';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Message drop",
  description: "Send a message to a friend, encrypted in the url. Only readable with your password and the url.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const iv = getRandomValues(new Uint8Array(IV_SIZE));

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
      </body>
    </html>
  );
}
