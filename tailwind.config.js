/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5046e4",
          dark: "#3f37b3",
        },
        secondary: "#171717",
        tertiary: "#f6c90e",
        success: "#00cc88",
        warning: "#ffaa00",
        danger: "#ff5050",
        light: "#f8fafc",
        dark: "#121212",
      },
    },
  },
  plugins: [],
}
