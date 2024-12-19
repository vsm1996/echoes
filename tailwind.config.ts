import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'copper': '#B87333',
        'warmGray': '#D9D2C4',
      },
      keyframes: {
        glowAnimation: {
          '0%': {
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.6)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 0, 255, 1), 0 0 40px rgba(255, 0, 255, 1)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.6)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeInAndOut: {
          '0%': {
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-35px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.9s ease-in-out infinite',
        fadeIn: 'fadeIn 0.9s ease-out forwards',
        fadeInUp: 'fadeInUp 0.9s ease-out forwards',
        fadeInRight: 'fadeInRight 0.9s ease-out forwards',
        glow: 'glowAnimation 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui"), addVariablesForColors],
  daisyui: {
    themes: ["nord", "synthwave",
      {
        'true-indigo': {
          'base-300': '#ebf3ff',
          'base-200': '#dae9ff',
          'base-100': '#bcd4ff',
          'neutral-content': '#94b6ff',
          'neutral': '#6a8cff',
          'accent-content': '#4863ff',
          'accent': '#2735ff',
          'secondary-content': '#1c26e6',
          'secondary': '#1a25b9',
          'primary-content': '#1a237e',
          'primary': '#121654',
        },
      },
    ],
  },
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
