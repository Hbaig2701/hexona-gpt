"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--hex-text-secondary)] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-2 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-[var(--hex-teal)] focus:ring-1 focus:ring-[var(--hex-teal)]/50 transition-colors duration-200 ${
            error ? "border-[var(--hex-error)]" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--hex-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
