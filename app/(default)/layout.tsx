"use client";

import { useEffect } from "react";
import LuciaSDK from "lucia-sdk";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import TwitterPixel from "@/components/TwitterPixel";
import { trackTwitterConversion } from "@/utils/twitter-tracking";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });

    // Track a page view
    LuciaSDK.pageView(window.location.pathname);
  }, []);

  return (
    <>
      <TwitterPixel />
      <Header />

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
