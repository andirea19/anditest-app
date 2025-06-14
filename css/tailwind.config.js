// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:         '#1E40AF',
        secondary:       '#F59E0B',
        accent:          '#10B981',
        background:      '#F3F4F6',
        'background-dark':'#1F2937',
        text:            '#111827',
        'text-dark':     '#F9FAFB',
        border:          '#D1D5DB',
        'border-dark':   '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
// This configuration file sets up Tailwind CSS with custom colors, dark mode support, and includes plugins for forms and typography.
// Make sure to install the necessary packages: