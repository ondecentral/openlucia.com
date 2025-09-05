import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import Link from "@/components/tracked-link";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,theme(colors.blue.200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div className="flex items-center justify-start">
              {/* Site branding */}
              <div className="flex flex-col items-center p-2">
                <Image src={Logo} width={125} alt="Lucia Protocol Logo" />
                <span className="font-asap-condensed text-sm">
                  The Web3 Intelligence Layer
                </span>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              &copy; Luciaprotocol.com - All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="#0"
                  aria-label="Features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="#0"
                  aria-label="Integrations"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://ads.clickinsights.xyz/contact"
                  target="_blank"
                  aria-label="Request Demo Footer"
                >
                  Request demo
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.medium.com/"
                  target="_blank"
                  aria-label="Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://docsend.com/view/ymm3s5mpnrg9m6mu"
                  target="_blank"
                  aria-label="Whitepaper"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://docs.luciaprotocol.com/"
                  target="_blank"
                  aria-label="Docs"
                >
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.notion.site/Terms-of-Service-1226136c5cc880399dd1c02521aa8226?pvs=25"
                  target="_blank"
                  aria-label="Terms of service"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.notion.site/Privacy-Policy-1226136c5cc880c4b5dbe12c10042924"
                  target="_blank"
                  aria-label="Privacy policy"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 transition hover:text-gray-900"
                  href="#"
                  aria-label="Opt-out"
                >
                  Opt-out
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold">Social</h3>
            <div className="flex items-center justify-start">
              {/* X link */}
              <div className="flex items-center justify-start gap-4">
                <Link
                  className="flex items-center justify-center text-orange-500 transition hover:text-orange-700"
                  href="https://x.com/luciaprotocol"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <Image
                    src="/images/blue-x.svg"
                    alt="X Logo"
                    width={16}
                    height={16}
                  />
                </Link>

                <Link
                  className="flex items-center justify-center transition"
                  href="https://www.linkedin.com/company/luciaprotocol/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/images/blue-linkedin.svg"
                    alt="LinkedIn Logo"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div
        className="relative mt-0 h-24 w-full md:-mt-16 md:h-60"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-9xl font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Lucia'] after:absolute after:inset-0 after:bg-slate-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Lucia'] after:[text-shadow:0_1px_0_white] md:text-[348px]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          {/* <div className="h-56 w-56 rounded-full border-[20px] border-blue-500 blur-[80px]"></div> */}
        </div>
      </div>
    </footer>
  );
}
