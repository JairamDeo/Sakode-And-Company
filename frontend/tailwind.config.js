/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your setup
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        comic: ["Comic Sans MS", "cursive"], 
        // Add Poppins as a custom font
      },
    },
  },
  plugins: [],
};
