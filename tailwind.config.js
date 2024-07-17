/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Update this based on your file types
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-blue": "linear-gradient(to right, #38b2a0, #2c7a7b)", // Adjust colors as needed
      },
      boxShadow: {
        "dark-grey": "6px 4px 20px 1px rgba(0, 0, 0, 0.5)", // Customize the values as needed
      },
    },
  },
  plugins: [],
};
