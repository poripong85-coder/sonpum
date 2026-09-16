import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1a17",
          soft: "#5c5b55",
          faint: "#8a8880",
        },
        paper: {
          DEFAULT: "#fbfaf7",
          card: "#ffffff",
          line: "#e8e5dd",
        },
        brand: {
          DEFAULT: "#b4531f",
          soft: "#f4e9e0",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
