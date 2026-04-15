"use client";

import React from "react";
import { Steps } from "@/types/register.type";

interface Props {
  currentStep: Steps;
}

export const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  const steps = [
    { id: "one", label: "Basic" },
    { id: "two", label: "Profile" },
    { id: "three", label: "Gaming" },
  ];

  return (
    <div className="px-8 py-4 border-b border-white/10">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
                    : (currentStep === "two" && step.id === "one") ||
                        (currentStep === "three" &&
                          (step.id === "one" || step.id === "two"))
                      ? "bg-purple-500/40"
                      : "bg-white/10"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    currentStep === step.id ? "text-white" : "text-white/60"
                  }`}
                >
                  {idx + 1}
                </span>
              </div>
              <span
                className={`ml-2 text-xs font-medium hidden sm:inline ${
                  currentStep === step.id ? "text-white" : "text-white/40"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                  (currentStep === "two" && idx === 0) ||
                  currentStep === "three"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "bg-white/10"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
