import React from "react";

export type StepStatus = "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";

export interface TransactionStep {
  id: string;
  label: string;
  status: StepStatus;
  description?: string;
}

export interface TransactionStepperProps {
  steps: TransactionStep[];
  className?: string;
}

// Helper component for the step icons/indicators
const StepIcon = ({ status, index }: { status: StepStatus; index: number }) => {
  const baseClasses =
    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 z-10 bg-white";

  switch (status) {
    case "SUCCESS":
      return (
        <div
          className={`${baseClasses} border-green-500 bg-green-50 text-green-600`}
        >
          ✓
        </div>
      );
    case "PROCESSING":
      return (
        <div
          className={`${baseClasses} border-blue-600 text-blue-600 animate-pulse ring-4 ring-blue-100`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
        </div>
      );
    case "FAILED":
      return (
        <div className={`${baseClasses} border-red-500 bg-red-50 text-red-600`}>
          ✕
        </div>
      );
    case "PENDING":
    default:
      return (
        <div className={`${baseClasses} border-gray-300 text-gray-400`}>
          {index + 1}
        </div>
      );
  }
};

export const TransactionStepper: React.FC<TransactionStepperProps> = ({
  steps,
  className = "",
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />

        {steps.map((step, index) => {
          // Dynamic text coloring based on status
          const isCompleted = step.status === "SUCCESS";
          const isProcessing = step.status === "PROCESSING";
          const isFailed = step.status === "FAILED";

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Connector line connecting previous step to this one */}
              {index > 0 && (
                <div
                  className={`absolute top-4 right-[50%] left-[-50%] h-0.5 transition-all duration-500 ${
                    steps[index - 1].status === "SUCCESS"
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

              {/* Step Bubble */}
              <StepIcon status={step.status} index={index} />

              {/* Labels */}
              <div className="mt-3 text-center px-2">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isProcessing
                      ? "text-blue-600 font-semibold"
                      : isCompleted
                        ? "text-gray-800"
                        : isFailed
                          ? "text-red-600"
                          : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 mt-0.5 max-w-[120px] mx-auto">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
