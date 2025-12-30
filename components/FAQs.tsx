import Accordion from "./accordion";

export default function FAQs() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      {/* Header section */}
      <div className="mx-auto max-w-5xl pb-12 text-center">
        <h2
          data-aos="zoom-y-out"
          data-aos-delay={150}
          className="pb-4 font-space-grotesk text-5xl font-medium text-black md:text-5xl"
        >
          We&apos;re here to answer all your questions.
        </h2>
      </div>
      <div className="md:px-48">
        <Accordion
          title="How can I get started with a demo of your platform?"
          content="Contact us to schedule a personalized walkthrough of features, use cases, and integrations."
        />
        <Accordion
          title="What is Web3 attribution?"
          content="Track ad performance using blockchain for greater transparency, immutability, and data control."
        />
        <Accordion
          title="What are the benefits of decentralized attribution?"
          content="Increased transparency, better security, and tamper-proof, verifiable metrics without third-party intermediaries."
        />
        <Accordion
          title="Can I integrate your platform with my existing tech stack?"
          content="Yes, our platform is designed to integrate seamlessly with most ad tech stacks. We support a range of APIs and provide flexible options for incorporating your existing tools, ensuring that you can leverage our technology without disrupting your current workflow."
        />
        <Accordion
          title="How does AI enhance Web3 attribution?"
          content="AI enhances Web3 ad attribution by analyzing vast amounts of decentralized data to identify trends, optimize ad spend, and deliver deeper insights. Our AI-powered platform automates data analysis, offering real-time campaign insights, audience segmentation, and predictive analytics to maximize the efficiency of your ad strategies."
        />
      </div>
    </div>
  );
}
