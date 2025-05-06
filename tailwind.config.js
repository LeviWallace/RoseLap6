import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    light: {
      colors: {
        background: "#EDEDDE",
        foreground: "#000000",
        primary: "#AD0B14",
        secondary: "#C87474",
        radius: "0",
        danger: "#FF0000",
        black: "#000000",
      }
    },
    dark: {
      colors: {
        background: "#EDEDDE",
        foreground: "#000000",
        primary: "#AD0B14",
        secondary: "#C87474",
        radius: "0",
        danger: "#FF0000",
        black: "#000000",
      }
    },
    extend: {
	  fontFamily: {
		  geist: "'Geist', sans-serif",
		  italianno: "'Italianno', cursive",
	  },
      colors: {
        background: "#000000",
        foreground: "#EDEDDE",
        primary: "#AD0B14",
        secondary: "#C87474",
        radius: "0",
        danger: "#FF0000",
        black: "#000000",
      }
    },
  },

  darkMode: "class",
  plugins: [
    heroui(),
  ]
}