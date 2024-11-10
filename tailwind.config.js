/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bagel: ["Bagel Fat One", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        fruits:
          "url('https://res.cloudinary.com/dxsr7tutn/image/upload/v1731264982/4520453_93597_wamrcu.jpg')",
      },
    },
  },
  plugins: [],
};
