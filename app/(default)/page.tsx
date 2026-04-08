export const metadata = {
  title: "The Web3 Intelligence Layer",
  description: "Ultimate attribution Platform",
};

import Hero from "@/components/hero-home";
import AutonomousHero from "@/components/autonomous-hero";
import FeaturesPlanet from "@/components/features-planet";
import Cta from "@/components/cta";
import FAQs from "@/components/FAQs";
import CaseStudies from "@/components/case-studies";

export default function Home() {
  return (
    <>
      <AutonomousHero />
      <Hero />
      <FeaturesPlanet />
      <CaseStudies />
      {/* <UseCases /> */}
      <FAQs />
      <Cta />
    </>
  );
}
