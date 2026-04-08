"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  ChartNoAxesCombined,
  DatabaseZap,
  GitBranch,
  Megaphone,
  Target,
} from "lucide-react";

type OrbitStep = {
  label: string;
  className: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: OrbitStep[] = [
  {
    label: "Unify visitor + customer data across devices.",
    className:
      "left-1/2 top-[10%] -translate-x-1/2 md:left-1/2 md:top-0 md:-translate-x-1/2",
    icon: DatabaseZap,
  },
  {
    label: "Auto-launch campaigns and track ROI live.",
    className:
      "left-[72%] top-[27%] -translate-x-1/2 -translate-y-1/2 md:right-[18%] md:top-[17%] md:translate-x-0 md:translate-y-0",
    icon: Megaphone,
  },
  {
    label: "Map journeys to campaigns and conversions.",
    className:
      "left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2 md:right-[2%] md:top-[calc(50%-28px)] md:translate-x-0 md:translate-y-0",
    icon: GitBranch,
  },
  {
    label: "AI fixes weak campaigns and scales winners.",
    className:
      "left-[72%] top-[73%] -translate-x-1/2 -translate-y-1/2 md:right-[18%] md:bottom-[17%] md:top-auto md:translate-x-0 md:translate-y-0",
    icon: Bot,
  },
  {
    label: "Maximize conversion, ROI, and lifetime value.",
    className:
      "left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2 md:left-1/2 md:bottom-0 md:top-auto md:-translate-x-1/2 md:translate-y-0",
    icon: ChartNoAxesCombined,
  },
];

export default function GrowthOrbit() {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setActiveStep(index);
        }, 1000 * (index + 1)),
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
        <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-600">
          Ingestion
        </span>
        <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-600">
          Campaign Creation
        </span>
        <span className="rounded-full border border-blue-300 bg-blue-50 px-4 py-1.5 font-semibold text-blue-700">
          Journey Intelligence
        </span>
        <span className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-slate-600">
          AI Optimization
        </span>
      </div>

      <div className="relative mx-auto h-[620px] w-full max-w-4xl md:h-[540px]">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/60" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70" />

        <div className="mx-auto mb-5 w-fit rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm md:absolute md:left-[3%] md:top-1/2 md:mb-0 md:-translate-y-1/2 md:px-4 md:py-2 md:text-sm">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
          Trigger: Qualified growth signal
        </div>

        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-blue-600 bg-white text-center shadow-sm">
          <Target className="h-5 w-5 text-blue-600" />
          <span className="mt-1 text-sm font-semibold leading-tight text-slate-800">
            Lucia AI
          </span>
          <span className="text-xs text-slate-500">Growth OS</span>
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isVisible = index <= activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={step.label}
              className={`absolute ${step.className} transition-all duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <div className="flex w-[96px] flex-col items-center text-center md:w-[190px]">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all ${
                    isActive
                      ? "scale-105 border-blue-600 text-blue-700"
                      : "border-blue-400 text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-[11px] leading-snug text-slate-700 md:mt-3 md:text-sm">
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
