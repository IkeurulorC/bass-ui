import { motion } from "framer-motion";
import { Check, AlertTriangle, Clock, X } from "lucide-react";

export type StepNodeState =
  | "done"
  | "pending"
  | "undone"
  | "failed"
  | "warning";

export const StepperNode = ({
  isActive,
  state,
}: {
  isActive: boolean;
  state: StepNodeState;
}) => {
  return (
    <div className="w-10 h-10 relative flex items-center justify-center">
      <svg className="w-full h-full transform rotate-180" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="transparent"
          stroke="#d1d5db"
          strokeWidth="3"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="16"
          fill="transparent"
          stroke={
            state === "done"
              ? "var(--color-emerald-500)"
              : state === "failed"
                ? "var(--color-red-200)"
                : state === "warning"
                  ? "var(--color-amber-200)"
                  : state === "pending"
                    ? "var(--color-indigo-600)"
                    : "#d1d5db"
          }
          strokeWidth="4"
          strokeLinecap="round" // Keep it clean and rounded
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: isActive ? 1 : 0, // The opacity snaps to 1 instantly ONLY when it's active,
            // but it will wait for the transition delay below!
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: "easeInOut",
          }}
        />
      </svg>
      <motion.div
        className="absolute flex items-center justify-center text-blue-500"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          // Pop in if active; instantly vanish if going backward
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.7,
        }}
        transition={{
          // Waits 0.9 seconds total (0.4s initial delay + 0.5s ring fill duration)
          duration: isActive ? 0.3 : 0.1,
          delay: isActive ? 0.9 : 0,
          ease: "easeOut",
        }}
      >
        {state === "done" && (
          <Check className="w-8 h-8 p-1 stroke-[3] items-center justify-center rounded-full text-white shrink-0 bg-emerald-500" />
        )}
        {state === "pending" && (
          <Clock className="w-8 h-8 p-1 stroke-[3] items-center justify-center rounded-full text-white shrink-0 bg-indigo-600" />
        )}
        {state === "warning" && (
          <AlertTriangle className="w-8 h-8 p-1.5 stroke-2 items-center justify-center rounded-full text-amber-800 shrink-0 bg-amber-200" />
        )}
        {state === "failed" && (
          <X className="w-8 h-8 p-1.5 stroke-2 items-center justify-center rounded-full text-red-800 shrink-0 bg-red-200" />
        )}
      </motion.div>
    </div>
  );
};
