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
    label: "Unify visitor and customer data with accurate cross-device identity resolution.",
    className: "left-1/2 top-0 -translate-x-1/2",
    icon: DatabaseZap,
  },
  {
    label: "Launch autonomous campaigns and track channel-level ROI in real time.",
    className: "right-[18%] top-[17%]",
    icon: Megaphone,
  },
  {
    label: "Map every user journey back to campaign touchpoints and conversion impact.",
    className: "right-0 top-1/2 -translate-y-1/2",
    icon: GitBranch,
  },
  {
    label: "AI surfaces weak campaigns, recommends fixes, and scales top performers.",
    className: "right-[18%] bottom-[17%]",
    icon: Bot,
  },
  {
    label: "Maximize conversion, ROI, and customer lifetime value across every growth loop.",
    className: "left-1/2 bottom-0 -translate-x-1/2",
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

      <div className="relative mx-auto h-[540px] w-full max-w-4xl">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/60" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70" />

        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
          Trigger: New qualified growth opportunity
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
              <div className="flex w-[190px] flex-col items-center text-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all ${
                    isActive
                      ? "scale-105 border-blue-600 text-blue-700"
                      : "border-blue-400 text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm leading-snug text-slate-700">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
