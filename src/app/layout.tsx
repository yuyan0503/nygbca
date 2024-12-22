import 'tailwindcss/tailwind.css'
import { ReactNode } from 'react';

export const metadata = {
  title: "nygbca",
  description: "nygbca application for school",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <>
          {children}
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