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
            <div>
              <Image
                src={Logo}
                width={40}
                height={40}
                alt="Lucia Protocol Logo"
              />
            </div>
            <div className="text-sm text-stone-600">
              &copy; Luciaprotocol.com - All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="#0"
                  aria-label="Features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="#0"
                  aria-label="Integrations"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
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
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.medium.com/"
                  target="_blank"
                  aria-label="Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="https://docsend.com/view/ymm3s5mpnrg9m6mu"
                  target="_blank"
                  aria-label="Whitepaper"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
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
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.notion.site/Terms-of-Service-1226136c5cc880399dd1c02521aa8226?pvs=25"
                  target="_blank"
                  aria-label="Terms of service"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
                  href="https://lucia-protocol.notion.site/Privacy-Policy-1226136c5cc880c4b5dbe12c10042924"
                  target="_blank"
                  aria-label="Privacy policy"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-stone-600 transition hover:text-gray-900"
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
            <h3 className="text-sm font-medium">Social</h3>
            <ul className="flex gap-2">
              <li>
                <Link
                  className="flex items-center justify-center text-orange-500 transition hover:text-orange-700"
                  href="https://x.com/luciaprotocol"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <svg
                    className="fill-current"
                    width={16}
                    height={16}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-orange-500 transition hover:text-orange-600"
                  href="https://t.me/+ktxyuIoFAuVhNTMx"
                  target="_blank"
                  aria-label="Telegram"
                >
                  <svg
                    className="fill-current"
                    width={16}
                    height={16}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-orange-500 transition hover:text-orange-600"
                  href="https://discord.gg/ECuzSyshbv"
                  target="_blank"
                  aria-label="Discord"
                >
                  <svg
                    className="fill-current"
                    width={18}
                    height={18}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-orange-500 transition hover:text-orange-600"
                  href="https://www.linkedin.com/company/luciaprotocol/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="fill-current"
                    width={16}
                    height={16}
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div
        className="relative mt-0 h-24 w-full md:-mt-16 md:h-60"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-9xl font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Lucia'] after:absolute after:inset-0 after:bg-stone-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Lucia'] after:[text-shadow:0_1px_0_white] md:text-[348px]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-orange-500 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
