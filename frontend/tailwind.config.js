/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lbyed: "#F8F6F3", 
        zre9: {
          1: "#89AFD2",
          2: "#4299E1",
          3: "#3D5681"
        }
      }
    },
  },
  plugins: [],
}