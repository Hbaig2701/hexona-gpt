"use client";

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => onSelect(prompt)}
          className="px-3 py-2 text-sm text-hex-text-secondary bg-hex-dark-700 border border-hex-dark-500 rounded-lg hover:border-hex-teal/30 hover:text-hex-teal transition-all text-left"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
