import 'tailwindcss/tailwind.css'
import { ReactNode } from 'react';
import Script from 'next/script';
import SwInstall from '@/components/SwInstall';

export const metadata = {
  title: "nygbca",
  description: "nygbca application for school",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Nygbca" />

        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)" />
        <meta
          name="theme-color"
          content="#1d232a"
          media="(prefers-color-scheme: dark)" />

        <Script
          src="https://cdn.tailwindcss.com"
          strategy="afterInteractive" // Loads the script after the page is interactive
        />
      </head>
      <body>
        <>
          {children}
          <SwInstall />
        </>
      </body>
    </html>
  );
}

/*
import localFont from "next/font/local";
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

*/