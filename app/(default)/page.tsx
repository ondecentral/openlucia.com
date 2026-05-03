export const metadata = {
  title: "The Autonomous Growth OS",
  description: "Ultimate User Acquisition Platform",
};

import Hero from "@/components/hero-home";
import AutonomousHero from "@/components/autonomous-hero";
import ComplianceFaqMini from "@/components/compliance-faq-mini";
import FeaturesPlanet from "@/components/features-planet";
import Cta from "@/components/cta";
import FAQs from "@/components/FAQs";
import CaseStudies from "@/components/case-studies";
import SocialProofWall from "@/components/social-proof-wall";

export default function Home() {
  return (
    <>
      <AutonomousHero />
      <ComplianceFaqMini />
      <Hero />
      <FeaturesPlanet />
      <CaseStudies />
      <SocialProofWall />
      {/* <UseCases /> */}
      <FAQs />
      <Cta />
    </>
  );
}
