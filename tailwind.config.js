/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aura-black': '#0A0A0A',
        'aura-azure': '#00D4FF', 
        'aura-purple': '#7B61FF',
        'aura-green': '#00F5A0',
        'aura-amber': '#FFB224',
      },
    },
  },
  plugins: [],
}