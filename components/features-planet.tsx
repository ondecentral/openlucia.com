"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/tracked-button";

export default function FeaturesPlanet() {
  const [keyFeature, setKeyFeature] = useState<number>(1);

  const keyFeatures = [
    {
      img: "../images/Supported Platforms.svg",
      alt: "Feature 1",
      width: "100%",
      height: "100%",
      keyFeature: [1],
    },
    {
      img: "../images/Metrics-cropped.svg",
      alt: "Feature 2",
      width: "100%",
      height: "100%",
      keyFeature: [2],
    },
    {
      img: "../images/Metrics-cropped.svg",
      alt: "Feature 3",
      width: "100%",
      height: "100%",
      keyFeature: [3],
    },
  ];

  // Conditionally render the img element based on the selected keyFeature
  const currentFeature = keyFeatures.find((feature) =>
    feature.keyFeature.includes(keyFeature),
  );

  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-[#0F172A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mb-20 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left Column: Content */}
            <div className="flex flex-col justify-start">
              <div className="-mx-0.5 mb-4 flex -space-x-3">
                <span className="rounded-full bg-gradient-to-l from-amber-200/50 to-blue-700/50 px-1.5 text-sm text-white outline outline-1 outline-white">
                  Features
                </span>
              </div>
              <h2
                // className="text-3xl font-bold text-stone-200 md:text-4xl mb-4"
                className="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#F4E292,#0E34F9)] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
              >
                Web3-Centric Marketing Campaigns: Designed with KOLs, DAOs and
                Protocols in mind
              </h2>
              <span className="mb-4 text-lg font-normal text-slate-400">
                Our platform leverages next-level technology to deliver
                data-driven predictions and trends that keep you ahead of the
                curve.
              </span>

              {/* Button container */}
              <div className="mt-8 flex flex-col justify-center gap-y-4">
                {/* Button #1 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 1 ? "bg-[#FFFFFF0D] outline outline-[#F6E490]" : "opacity-65 transition-opacity hover:bg-[#FFFFFF0D] hover:opacity-90 hover:outline hover:outline-[#F6E490]"}`}
                  aria-pressed={keyFeature === 1}
                  aria-label="Supported Platforms"
                  onClick={() => setKeyFeature(1)}
                >
                  {/* Icon */}
                  <svg
                    className="fill-current text-stone-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path d="M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001Z" />
                  </svg>
                  <div className="ml-2 flex w-full flex-col text-left">
                    <span className="text-lg font-semibold text-white">
                      Seamless Integration
                    </span>
                    <span className="whitespace-normal break-words font-normal text-slate-400">
                      Integration with major social media platforms (e.g.
                      Twitter, Discord, Telegram, LinkedIn, and Google) for
                      comprehensive data collection.
                    </span>
                  </div>
                </Button>

                {/* Button #2 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 2 ? "bg-[#FFFFFF0D] outline outline-[#F6E490]" : "opacity-65 transition-opacity hover:bg-[#FFFFFF0D] hover:opacity-90 hover:outline hover:outline-[#F6E490]"}`}
                  aria-pressed={keyFeature === 2}
                  aria-label="Real-time Metrics"
                  onClick={() => setKeyFeature(2)}
                >
                  {/* Icon */}
                  <svg
                    className="fill-current text-stone-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path d="M6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855Z" />
                  </svg>
                  <div className="ml-2 flex w-full flex-col text-left">
                    <span className="text-lg font-semibold text-white">
                      Real-time Metrics
                    </span>
                    <span className="whitespace-normal break-words font-normal text-slate-400">
                      Comprehensive suite of insights derived from SDK, designed
                      to enhance your understanding of user engagement and
                      conversion metrics.
                    </span>
                  </div>
                </Button>

                {/* Button #3 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 3 ? "bg-[#FFFFFF0D] outline outline-[#F6E490]" : "opacity-65 transition-opacity hover:bg-[#FFFFFF0D] hover:opacity-90 hover:outline hover:outline-[#F6E490]"}`}
                  aria-pressed={keyFeature === 3}
                  aria-label="AI-Driven Insights"
                  onClick={() => setKeyFeature(3)}
                >
                  {/* Icon */}
                  <svg
                    className="fill-current text-stone-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path d="M2.428 10c.665-1.815 1.98-3.604 3.44-4.802-.6-1.807-1.443-3.079-2.29-3.18-1.91-.227-2.246 2.04-.174 2.962a1 1 0 1 1-.813 1.827C-1.407 5.028-.589-.491 3.815.032c1.605.191 2.925 1.811 3.79 4.07.979-.427 1.937-.51 2.735-.092.818.429 1.143 1.123 1.294 2.148.015.1.022.149.043.32.542-.537 1.003-.797 1.693-.622.64.162.894.493 1.195 1.147l.018.04a1 1 0 0 1 1.133 1.61c-.46.47-1.12.574-1.744.398a1.661 1.661 0 0 1-.87-.592 2.127 2.127 0 0 1-.224-.349 3.225 3.225 0 0 1-.55.477c-.377.253-.8.368-1.259.267-.993-.218-1.21-.779-1.367-2.05-.027-.22-.033-.262-.046-.353-.067-.452-.144-.617-.244-.67-.225-.118-.665-.013-1.206.278.297 1.243.475 2.587.516 3.941H15a1 1 0 0 1 0 2H8.68l-.025.285c-.173 1.918-.906 3.381-2.654 3.668-1.5.246-3.013-.47-3.677-1.858-.29-.637-.39-1.35-.342-2.095H1a1 1 0 0 1 0-2h1.428Zm2.11 0h2.175a18.602 18.602 0 0 0-.284-2.577c-.205.202-.408.42-.606.654A9.596 9.596 0 0 0 4.537 10Z" />
                  </svg>
                  <div className="ml-2 flex w-full flex-col text-left">
                    <span className="text-lg font-semibold text-white">
                      AI-Driven Insights
                    </span>
                    <span className="whitespace-normal break-words font-normal text-slate-400">
                      Leverage AI for deeper understanding and optimization of
                      ad campaigns.
                    </span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full">
              <Image
                src={currentFeature?.img || ""}
                alt={currentFeature?.alt || ""}
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 [&>*]:relative [&>*]:p-6 [&>*]:before:absolute [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] md:[&>*]:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-stone-200">
                <svg
                  className="stroke-stone-400"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.6 5.6C18 -0.7 24.7 6 18.4 8.4L22 12L18.4 15.6C16 9.3 9.3 16 15.6 18.4L12 22L8.4 18.4C6 24.7 -0.7 18 5.6 15.6L2 12L5.6 8.4C8 14.7 14.7 8 8.4 5.6L12 2Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg font-semibold text-white">
                  Hybrid Ecosystems
                </span>
              </h3>
              <p className="text-[15px] font-normal text-slate-400">
                Bridging Web2 and Web3 for unified insights across all
                ecosystems.
              </p>
            </article>

            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-stone-200">
                <svg
                  className="stroke-stone-400"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg font-semibold text-white">
                  Innovator Support
                </span>
              </h3>
              <p className="text-[15px] font-normal text-slate-400">
                From startups to leading exchanges, we scale with you.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-stone-200">
                <svg
                  className="stroke-stone-400"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.46445 8.46448L4.92893 4.92896M4.92893 19.0711L8.46448 15.5355M15.5355 15.5355L19.0711 19.071M19.0711 4.92891L15.5355 8.46445M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-lg font-semibold text-white">
                  24/7 Support
                </span>
              </h3>
              <p className="text-[15px] font-normal text-slate-400">
                Our dedicated support team is available around the clock,
                ensuring you get the help you need whenever you need it—day or
                night.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
