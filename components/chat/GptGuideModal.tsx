"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GptGuideModalProps {
  gptName: string;
  guide: string[];
  onClose: () => void;
}

export default function GptGuideModal({ gptName, guide, onClose }: GptGuideModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-md bg-[var(--hex-dark-700)] border border-[var(--hex-dark-500)] rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] hover:bg-[var(--hex-dark-600)] transition-colors"
          >
            <X size={16} />
          </button>

          <div className="p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-1">
              {gptName}
            </h3>
            <p className="text-sm text-[var(--hex-text-muted)] mb-4">
              Best practices &amp; use cases
            </p>

            <ul className="space-y-3">
              {guide.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--hex-text-secondary)]">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-hex-teal/15 text-hex-teal flex items-center justify-center text-xs font-medium">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
