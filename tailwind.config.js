/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Sucht in der Haupt-HTML-Datei
    "./src/**/*.{js,ts,jsx,tsx}", // Sucht in allen JS/TS/JSX/TSX Dateien im src Ordner
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
