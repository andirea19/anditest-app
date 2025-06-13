/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Passe ggf. an, je nachdem ob du Pages- oder App-Router nutzt:
    "./app/**/*.{js,ts,jsx,tsx}",      // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",    // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}"
    // Füge hier weitere Pfade hinzu, falls du Komponenten in anderen Verzeichnissen hast
    // "./src/**/*.{js,ts,jsx,tsx}", // z.B. falls du src-Verzeichnis nutzt
  ],
  theme: {
    extend: {
      // Hier kannst du deine eigene Farben, Abstände, Schriftgrößen o. Ä. definieren
      colors: {
        primary: "#1E40AF",
        secondary: "#F59E0B",
        accent: "#10B981",
        background: "#F3F4F6",
        text: "#111827",
        border: "#D1D5DB",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    // z.B. forms, typography, aspect-ratio…
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
};
// Du kannst auch weitere Plugins hinzufügen, z.B.:         