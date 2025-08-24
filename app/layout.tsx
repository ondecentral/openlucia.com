"use client";

import "./css/style.css";
import { DM_Sans } from "next/font/google";
import LuciaSDK from "lucia-sdk";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm_sans",
  display: "swap",
});

if (typeof window !== "undefined") {
  LuciaSDK.init({
    debugURL: process.env.NEXT_PUBLIC_BASE_URL || "",
    apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dm_sans.variable} font-dm_sans bg-stone-50 tracking-tight text-stone-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
