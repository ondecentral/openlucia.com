import Image from "next/image";

import Link from "@/components/tracked-link";

export default function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl bg-slate-900 text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-700 blur-3xl" />
          </div>

          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="text-space-grotesk mb-6 text-3xl font-medium text-white [border-image:linear-gradient(to_right,transparent,theme(colors.blue.700/.7),transparent)1] md:mb-12 md:text-4xl">
              Get started with Lucia Protocol
            </h2>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <Link
                className="btn group mb-4 w-full bg-[#F6E490] shadow sm:mb-0 sm:w-auto"
                href="https://ads.clickinsights.xyz/contact"
                target="_blank"
                aria-label="Request Demo CTA"
              >
                <span className="relative inline-flex items-center text-[#0F172A]">
                  Request Demo{" "}
                  <span className="ml-1 tracking-normal text-[#0F172A] transition-transform group-hover:translate-x-0.5">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
