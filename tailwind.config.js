/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      }

    }
  },

  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui"),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar")({ nocompatible: true }), // Enable tailwind-scrollbar
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"),

  ],
};
