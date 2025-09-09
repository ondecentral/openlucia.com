"use client";

import PageIllustration from "@/components/page-illustration";
import LogoSection from "@/components/logoSection";
import Link from "@/components/tracked-link";

import DashboardDemo from "./dashboard-demo";

export default function HeroHome() {
  const sectionStyle = {
    backgroundImage: `url('../images/bg_img.png')`,
    backgroundSize: "cover", // Adjust background size
    backgroundPosition: "center", // Adjust position
    backgroundRepeat: "repeat", // Ensure it doesn't repeat
  };

  return (
    <section className="relative" style={sectionStyle}>
      <PageIllustration />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="mx-auto max-w-6xl">
          {/* Hero content */}
          <div className="pt-32 md:pt-40">
            {/* Section header */}
            <div className="text-center md:pb-4">
              <div
                className="mb-3 border-t [border-image:linear-gradient(to_right,transparent,theme(colors.blue.300/.8),transparent)1]"
                data-aos="zoom-y-out"
              >
                <div className="mt-3 flex justify-center py-1">
                  <span className="rounded-full bg-blue-400 px-2 text-white">
                    AI model coming soon!
                  </span>
                </div>
              </div>
              <h1
                className="mb-6 border-y px-4 py-2 font-space-grotesk text-3xl font-bold text-black [border-image:linear-gradient(to_right,transparent,theme(colors.blue.300/.8),transparent)1] sm:px-0 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                Behavioral Intelligence
                <br />
                <span className="font-light">Powered by AI</span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <div className="relative py-1 before:absolute before:inset-0 before:border-b before:[border-image:linear-gradient(to_right,transparent,theme(colors.blue.300/.8),transparent)1]">
                  <p
                    className="mb-4 font-space-grotesk text-xl font-light"
                    data-aos="zoom-y-out"
                    data-aos-delay={300}
                  >
                    Know where your users came from, what they&apos;re doing,
                    and why.
                  </p>
                  <div
                    className="mx-auto mb-3 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay={450}
                  >
                    <Link
                      className="btn group mb-4 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 bg-[length:100%_100%] bg-[bottom] font-inter font-semibold leading-7 text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                      href="https://ads.clickinsights.xyz/contact"
                      aria-label="Request Demo Hero"
                    >
                      <span className="relative inline-flex items-center">
                        Request Demo{" "}
                        <span className="ml-1 tracking-normal transition-transform group-hover:translate-x-0.5">
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
                    <Link
                      className="btn w-full rounded-lg bg-white/75 font-inter font-semibold leading-7 text-slate-700 shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-blue-400 hover:outline-2 hover:drop-shadow-lg sm:ml-4 sm:w-auto"
                      href="https://ads.clickinsights.xyz"
                      target="_blank"
                      aria-label="Learn More Hero"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Hero image */}

            {/* Dashboard Demo Section */}
            <div>
              <DashboardDemo />
            </div>
            {/* Read docs button */}
            <div className="relative mt-4 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.blue.300/.8),transparent)1] before:absolute before:inset-0">
              <div
                className="mx-auto max-w-xs pb-3 sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay={450}
              >
                <a
                  className="btn w-full bg-white/75 text-slate-700 shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-blue-400 hover:outline-2 hover:drop-shadow-lg sm:ml-4 sm:w-auto"
                  href="https://docs.luciaprotocol.com/"
                  target="_blank"
                >
                  Read Docs
                </a>
              </div>
            </div>
          </div>
        </div>
        <LogoSection />
      </div>
      {/* </div> */}
    </section>
  );
}
