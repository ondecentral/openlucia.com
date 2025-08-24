"use client";

import PageIllustration from "@/components/page-illustration";
import LogoSection from "@/components/logoSection";
import Link from "@/components/tracked-link";

import DashboardDemo from "./dashboard-demo";

export default function HeroHome() {
  const sectionStyle = {
    backgroundImage: `url('../images/bg_img.svg')`,
    backgroundSize: "cover", // Adjust background size
    backgroundPosition: "center", // Adjust position
    backgroundRepeat: "no-repeat", // Ensure it doesn't repeat
  };

  return (
    <section className="relative" style={sectionStyle}>
      <PageIllustration />
      {/* <div
        style={{ position: "relative", height: "100vh", overflow: "hidden", pointerEvents: "auto" }}
        onPointerMove={handlePointerMove}
      > */}
      {/* 3D Logo Container */}
      {/* <div className="absolute z-1 h-1/5 w-6/12 left-0 top-20">
          <Spline
            scene="https://prod.spline.design/jZ9pmRNBxzmrlmYH/scene.splinecode"
          />
        </div> */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="mx-auto max-w-6xl">
          {/* Hero content */}
          <div className="pt-32 md:pt-40">
            {/* Section header */}
            <div className="text-center md:pb-4">
              <div
                className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1]"
                data-aos="zoom-y-out"
              >
                <div className="-mx-0.5 flex justify-center -space-x-3 py-1">
                  <span className="rounded-full bg-gradient-to-r from-orange-400/80 to-orange-600/80 px-2 text-white">
                    AI model coming soon!
                  </span>
                </div>
              </div>
              <h1
                className="mb-6 border-y py-2 text-5xl font-semibold [border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1] md:text-6xl"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                Web3 Attribution
                <br className="max-lg:hidden" />
                <span className="font-light">Powered by AI</span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <p
                  className="mb-8 text-lg font-light text-gray-700"
                  data-aos="zoom-y-out"
                  data-aos-delay={300}
                >
                  Know where your users came from, what they&apos;re doing, and
                  why.
                </p>
                <div className="relative py-1 before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.stone.300/.8),transparent)1]">
                  <div
                    className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay={450}
                  >
                    <Link
                      className="btn group mb-4 w-full bg-gradient-to-r from-orange-400 to-orange-600 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                      href="https://ads.clickinsights.xyz/contact"
                      aria-label="Request Demo Hero"
                    >
                      <span className="relative inline-flex items-center">
                        Request Demo{" "}
                        <span className="ml-1 tracking-normal text-orange-100 transition-transform group-hover:translate-x-0.5">
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
                      className="btn w-full bg-transparent text-stone-800 shadow outline outline-1 outline-slate-300 hover:bg-orange-50 hover:outline-2 hover:outline-orange-500 hover:drop-shadow-lg sm:ml-4 sm:w-auto"
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
            <div className="relative mt-4 before:absolute before:inset-0">
              <div
                className="mx-auto max-w-xs pb-3 sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay={450}
              >
                <a
                  className="btn w-full bg-transparent text-stone-800 shadow outline outline-1 outline-slate-300 hover:bg-orange-50 hover:outline-2 hover:outline-orange-500 hover:drop-shadow-lg sm:ml-4 sm:w-auto"
                  href="https://docs.luciaprotocol.com/"
                  target="_blank"
                >
                  {/* btn w-full bg-white text-stone-800 shadow hover:bg-stone-50 sm:ml-4 sm:w-auto
                      className="btn w-full outline outline-offset-2 outline-1 outline-slate-300 bg-transparent text-stone-800 shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 sm:ml-4 sm:w-auto"
                    */}
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
