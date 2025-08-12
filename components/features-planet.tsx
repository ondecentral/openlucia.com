"use client";

import React, { useState } from "react";

import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";
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
      img: "../images/Content.svg ",
      alt: "Feature 3",
      width: "100%",
      height: "100%",
      keyFeature: [3],
    },
  ];

  // Conditionally render the img element based on the selected keyFeature
  const currentFeature = keyFeatures.find((feature) =>
    feature.keyFeature.includes(keyFeature)
  );

  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-stone-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
            {/* Left Column: Content */}
            <div className="flex flex-col justify-start">
              <div className="-mx-0.5 flex -space-x-3 mb-4">
                <span className="rounded-full outline outline-stone-700 px-1.5 text-stone-300 text-sm">
                  Features
                </span>
              </div>
              <h2
                // className="text-3xl font-bold text-stone-200 md:text-4xl mb-4"
                className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.orange.500),theme(colors.orange.400),theme(colors.orange.500),theme(colors.orange.300))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
              >
                Web3-Centric Marketing Campaigns: Designed with KOLs, DOAs and Protocols in mind
              </h2>
              <span className="text-stone-400 text-lg mb-4">
                Our platform leverages next-level technology to deliver data-driven predictions and trends that keep you ahead of the curve.
              </span>

              {/* Button container */}
              <div className="flex flex-col gap-y-4 justify-center mt-8">
                {/* Button #1 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 1 ? "relative  bg-stone-800 outline outline-stone-700 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before: before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90 hover:bg-stone-800 hover:outline hover:outline-stone-700"}`}
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
                  <div className="flex flex-col ml-2 text-left w-full">
                    <span className="text-white text-lg font-semibold">
                      Seamless Integration
                    </span>
                    <span className="text-stone-500 break-words whitespace-normal">
                      Integration with major social media platforms (e.g. Twitter, Discord, Telegram, LinkedIn, and Google) for comprehensive data collection.
                    </span>
                  </div>
                </Button>

                {/* Button #2 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 2 ? "relative  bg-stone-800 outline outline-stone-700 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before: before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90 hover:bg-stone-800 hover:outline hover:outline-stone-700"}`}
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
                  <div className="flex flex-col ml-2 text-left w-full">
                    <span className="text-white text-lg font-semibold">
                      Real-time Metrics
                    </span>
                    <span className="text-stone-500 break-words whitespace-normal">
                      Comprehensive suite of insights derived from SDK, designed to enhance your understanding of user engagement and conversion metrics.
                    </span>
                  </div>
                </Button>

                {/* Button #3 */}
                <Button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-lg p-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${keyFeature === 3 ? "relative  bg-stone-800 outline outline-stone-700 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before: before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90 hover:bg-stone-800 hover:outline hover:outline-stone-700"}`}
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
                  <div className="flex flex-col ml-2 text-left w-full">
                    <span className="text-white text-lg font-semibold">
                      AI-Driven Insights
                    </span>
                    <span className="text-stone-500 break-words whitespace-normal">
                      Leverage AI for deeper understanding and optimization of ad campaigns.
                    </span>
                  </div>
                  </Button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full">
              <img
                src={currentFeature?.img}
                alt={currentFeature?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Planet */}
          {/* <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-orange-900 before:to-orange-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.orange.500),transparent)]">
                <Image
                  className="rounded-full"
                  src={PlanetImg}
                  width={400}
                  height={400}
                  alt="Planet"
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src={PlanetOverlayImg}
                    width={789}
                    height={755}
                    alt="Planet decoration"
                  />
                </div>
              </div>
            </div>
          </div> */}
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
                <span>Hybrid Ecosystems</span>
              </h3>
              <p className="text-[15px] text-stone-400">
                Bridging Web2 and Web3 for unified insights across all ecosystems.
              </p>
            </article>
            {/* <article>
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
                    d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>AI-Driven Growth</span>
              </h3>
              <p className="text-[15px] text-stone-400">
                Empowering retail and blockchain with intelligent data.
              </p>
            </article> */}
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
                <span>Innovator Support</span>
              </h3>
              <p className="text-[15px] text-stone-400">
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
                <span>24/7 Support</span>
              </h3>
              <p className="text-[15px] text-stone-400">
                Our dedicated support team is available around the clock,
                ensuring you get the help you need whenever you need it—day or
                night.
              </p>
            </article>
            {/* <article>
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
                    d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Web3 Credit</span>
                <div className="rounded-full p-px bg-gradient-to-r from-orange-300 to-orange-500">
                  <div className="bg-stone-900 rounded-full">
                    <div className="text-orange-50 text-xs px-1">
                      Coming soon
                    </div>
                  </div>
                </div>
              </h3>
              <p className="text-[15px] text-stone-400">
                Unlock decentralized credit solutions that leverage blockchain
                technology, providing fast, secure, and transparent access to
                financial resources without traditional barriers.
              </p>
            </article> */}
            {/* <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-stone-200">
                <svg
                  className="stroke-stone-400"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 9.00002V17M9.5 9.00002V17M14.5 9.00002V17M19 9.00002V17M3 18.6L3 19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7952 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7952 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.04 21 17.7599 20.891 17.546C20.7951 17.3579 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H4.6C4.03995 17 3.75992 17 3.54601 17.109C3.35785 17.2049 3.20487 17.3579 3.10899 17.546C3 17.7599 3 18.04 3 18.6ZM11.6529 3.07715L4.25291 4.7216C3.80585 4.82094 3.58232 4.87062 3.41546 4.99082C3.26829 5.09685 3.15273 5.24092 3.08115 5.40759C3 5.59654 3 5.82553 3 6.28349L3 7.40002C3 7.96007 3 8.2401 3.10899 8.45401C3.20487 8.64217 3.35785 8.79515 3.54601 8.89103C3.75992 9.00002 4.03995 9.00002 4.6 9.00002H19.4C19.9601 9.00002 20.2401 9.00002 20.454 8.89103C20.6422 8.79515 20.7951 8.64217 20.891 8.45401C21 8.2401 21 7.96007 21 7.40002V6.2835C21 5.82553 21 5.59655 20.9188 5.40759C20.8473 5.24092 20.7317 5.09685 20.5845 4.99082C20.4177 4.87062 20.1942 4.82094 19.7471 4.7216L12.3471 3.07715C12.2176 3.04837 12.1528 3.03398 12.0874 3.02824C12.0292 3.02314 11.9708 3.02314 11.9126 3.02824C11.8472 3.03398 11.7824 3.04837 11.6529 3.07715Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Decentralized Exchange</span>
                <div className="rounded-full p-px bg-gradient-to-r from-orange-300 to-orange-500">
                  <div className="bg-stone-900 rounded-full">
                    <div className="text-orange-50 text-xs px-1">
                      Coming soon
                    </div>
                  </div>
                </div>
              </h3>
              <p className="text-[15px] text-stone-400">
                Trade assets seamlessly and securely on a decentralized
                exchange, ensuring full control of your funds with transparent,
                peer-to-peer transactions powered by blockchain technology.
              </p>
            </article> */}
          </div>
        </div>
      </div>
    </section>
  );
}
