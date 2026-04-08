import Accordion from "./accordion";

export default function ComplianceFaqMini() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
        <div className="mb-4 px-2 text-center sm:mb-6">
          <h3 className="font-space-grotesk text-2xl font-semibold text-slate-900 sm:text-3xl">
            Compliance FAQ
          </h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Built to support responsible growth with legal guardrails from day
            one.
          </p>
        </div>

        <Accordion
          title="Will using Lucia make my company SOC 2 compliant?"
          content="Lucia does not reduce or invalidate your existing SOC 2 posture. If you are already SOC 2 compliant, using Lucia is designed to preserve that posture through enterprise-grade security architecture: strong encryption, robust role-based access controls, MFA-backed administrative workflows, audit logging, and strict environment isolation. SOC 2 remains an organization-level responsibility, but Lucia is built to fit into mature control frameworks rather than weaken them."
        />
        <Accordion
          title="How will my user data be stored, and can it fall into the wrong hands?"
          content="Your customer data is protected by design. On enterprise plans, data is stored in a dedicated environment under your control, and Lucia does not have default access to your raw customer records. If you want Lucia support for troubleshooting or model tuning, you can grant time-gated tokens with scoped permissions and revoke them at any time. Data enrichment is appended from approved public-source intelligence to improve profile quality while keeping your core first-party data governed by your policies."
        />
        <Accordion
          title="Is Lucia a data processor or a data broker?"
          content="Lucia is designed and contracted as a data processor, not a data broker. Even with identity graph capabilities, the operating model is processor-first: data is handled to provide contracted services under customer instruction, with contractual restrictions, governance controls, and clear processing boundaries. This aligns with how enterprise identity and risk platforms commonly operate while maintaining a processor classification."
        />
        <Accordion
          title="Can Lucia help us keep a healthy CAC:LTV without increasing compliance risk?"
          content="Yes. Lucia is built to improve campaign efficiency and measurement while enforcing governance disciplines such as retention, minimization, access controls, and traceable decisioning."
        />
      </div>
    </section>
  );
}
