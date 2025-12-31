import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./css/style.css";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm_sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/luica-icon.png" type="image/png" />
        <link
          rel="shortcut icon"
          href="/images/luica-icon.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/images/luica-icon.png" />
        <Script
          src="https://cdn.luciaprotocol.com/lucia-sdk-latest.min.js"
          data-api-key={process.env.NEXT_PUBLIC_API_KEY}
          data-debug-url={process.env.NEXT_PUBLIC_API_URL}
          strategy="beforeInteractive"
        />
      </head>
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
