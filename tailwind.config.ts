import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hex: {
          teal: "#00C4CC",
          "teal-dim": "#009AA0",
          dark: {
            900: "#0D1117",
            800: "#161B22",
            700: "#1E2530",
            600: "#252D3A",
            500: "#2E3847",
          },
          charcoal: "#2D3748",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 196, 204, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 196, 204, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
