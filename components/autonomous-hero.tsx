import Link from "@/components/tracked-link";
import GrowthOrbit from "@/components/growth-orbit";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

export default function AutonomousHero() {
  return (
    <section className="relative overflow-hidden bg-stone-50 pt-28 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -right-44 top-8 h-[440px] w-[440px] rounded-full border-[36px] border-slate-300/40" />
        <div className="absolute -left-32 bottom-4 h-[260px] w-[260px] rounded-full border-[24px] border-slate-300/35" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Beyond Data Collection
            </span>
            <h1 className="mt-4 font-space-grotesk text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Your Autonomous Growth OS
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 md:text-xl">
              Lucia AI does more than collect user data. It continuously turns
              intent into action across your channels to increase distribution,
              qualified traffic, and growth outcomes.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-700">
              Unified Customer Signal Graph
            </span>
            <span className="rounded-full border border-blue-300 bg-blue-50 px-4 py-1.5 text-blue-700">
              Autonomous Execution Engine
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-700">
              Journey-to-Revenue Attribution
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-700">
              Continuous AI Optimization
            </span>
          </div>

          <GrowthOrbit />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              className="btn group w-full bg-[#F6E490] shadow sm:w-auto"
              href="https://app.luciaprotocol.com/contact"
              target="_blank"
              aria-label="Request Growth OS Demo"
            >
              <span className="relative inline-flex items-center text-[#0F172A]">
                Request Growth OS Demo
              </span>
            </Link>
            <a
              className="btn w-full rounded-lg bg-white/75 text-slate-700 shadow outline outline-1 outline-blue-400 hover:outline-2 sm:w-auto"
              href="#features"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
