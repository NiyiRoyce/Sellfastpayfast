/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        trust: "url('/src/assets/img/trust.jpg')",
        coins: "url('/src/assets/img/coins.webp')",
        review:
          "url('https://ik.imagekit.io/shiga/sfpf/MacBook%20Air%20-%205.png?updatedAt=1713649400738')",
        coins:
          "url('https://ik.imagekit.io/shiga/sfpf/6258275%201.png?updatedAt=1713658872946')",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        outfitbold: ["Outfit-Bold", "sans-serif"],
        outfitregular: ["Outfit-Regular", "sans-serif"],
        times: ["Kaisei Opti", "serif"],
        engry: ["Prada", "sans-serif"],
      },
    },
  },
  plugins: [],
};
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
