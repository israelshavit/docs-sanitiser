// Tailwind settings used to build tailwind.css. Rebuild after adding new Tailwind classes:
//   npx tailwindcss@3.4.19 -i tailwind.input.css -o tailwind.css --minify
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
