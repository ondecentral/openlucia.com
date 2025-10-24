import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import Link from "@/components/tracked-link";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white px-3 shadow-lg shadow-black/[0.03]">
          {/* Site branding */}
          <div className="flex flex-col items-center p-2">
            <Image src={Logo} width={125} alt="Lucia Protocol Logo" />
            <span className="hidden font-asap-condensed text-sm sm:block">
              The Web3 Intelligence Layer
            </span>
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href={appUrl}
                target="_blank"
                className="btn-sm bg-white text-gray-800 outline-offset-[-1px] hover:bg-gray-50 hover:outline hover:outline-1 hover:outline-blue-400"
                aria-label="Login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href={`${appUrl}/contact`}
                target="_blank"
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
                aria-label="Request Demo Header"
              >
                Request Demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
