/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          baloo: ['"Baloo 2"', 'cursive'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],
  };
  