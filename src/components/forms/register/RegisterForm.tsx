"use client";

import React from "react";
import { useRegisterForm } from "./useRegisterForm";
import { RegisterStepOne } from "@/components/pages/register/RegisterStepOne";
import { RegisterStepTwo } from "@/components/pages/register/RegisterStepTwo";
import { RegisterStepThree } from "@/components/pages/register/RegisterStepThree";
import { StepIndicator } from "@/components/pages/register/StepIndicator";

interface Props {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onSuccess }) => {
  const {
    step,
    isLoading,
    errors,
    form,
    tempGame,
    handleChange,
    addGame,
    removeGame,
    handleNext,
    handleBack,
    handleSubmit,
    setTempGame,
  } = useRegisterForm();

  const onSubmit = () => {
    handleSubmit(onSuccess);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-4">
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-white/50 text-sm mt-1">
                  Join our gaming community
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/10">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Indicator */}
        <StepIndicator currentStep={step} />

        {/* Form Content */}
        <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
          {step === "one" && (
            <RegisterStepOne
              form={form}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === "two" && (
            <RegisterStepTwo
              form={form}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === "three" && (
            <RegisterStepThree
              form={form}
              errors={errors}
              tempGame={tempGame}
              onChange={handleChange}
              onTempGameChange={setTempGame}
              onAddGame={addGame}
              onRemoveGame={removeGame}
            />
          )}
        </div>

        {/* Buttons */}
        <div className="px-8 py-6 border-t border-white/10 bg-white/5">
          <div className="flex gap-3">
            {step !== "one" && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
              >
                Back
              </button>
            )}

            {step !== "three" ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Registering...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
};
