/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from '@tailwindcss/typography';


export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "blue-500": "#3b82f6",
      "blue-600": "#2563eb",
      "blue-700": "#1d4ed8",
      "lime-400": "#a3e635",
      "lime-600": "#65a30d",
      "slate-50": "#f8fafc",
      "red-600": "#dc2626",
      "red-700": "#b91c1c",
      "red-500": "#dc2626",
      "gray-900": "#111827",
      "gray-800": "#1F2937",
      "gray-700": "#374151",
      "gray-600": "#4B5563",
      "gray-300": "#D1D5DB",
      "gray-100": "#F3F4F6",
      black: "#000000",
      white: "#FFFFFF",
      "green-500": "#22c55e",
      "blue-900": "#1E3A8A",
      "purple-600": "#7C3AED",
      "purple-700": "#6B2D92",
      "green-100": "#D1FAE5", // Light green
      "green-800": "#065F46", // Dark green
      "red-100": "#FEE2E2", // Light red
      "red-800": "#991B1B", // Dark red
      "yellow-300": "#FCD34D", // Soft yellow - great for borders or highlights
      "yellow-600": "#CA8A04", // Mustard yellow - deeper, used for contrast
      "yellow-500": "#EAB308",

      "orange-400": "#FB923C",

      // Corrected missing value
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.sans],
      },
      colors: {
        // Add green colors here
        "green-500": "#22c55e", // Green color
        "green-600": "#16a34a", // Darker green color
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        // background: "#F7F3FA",
        // background: "#E2D4EC ",
        // background: "#F3F4F6  ",
        background: "#FFFFFF",

        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [typography,tailwindcssAnimate],
};
