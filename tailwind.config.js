/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "note-img": "url('../assets/images/note-img/note-background.jpg')",
      },
    },
  },
  plugins: [],
};
