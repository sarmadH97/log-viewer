/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'logs': "url('/betterstudio-bg.png')",
        },
      },
    },
    plugins: [],
  }
  