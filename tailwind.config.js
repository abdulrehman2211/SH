extend: {
  animation: {
    fadeIn: 'fadeIn 1s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
},
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your existing brand colors for Zardozi80
        'brand-primary': '#86198F', // Example: Rich magenta/purple
        'button-primary-hover': '#6b21a8', // Darker purple
        'text-primary': '#1F2937',
        'text-secondary': '#4B5563',
        // Colors for this login page design
        'login-bg-start': '#1e3a8a', // Darker blue (blue-800)
        'login-bg-mid': '#1e40af',   // (blue-700)
        'login-bg-end': '#3730a3',   // Darker indigo (indigo-800)
        'login-accent': '#38bdf8', // Sky blue for highlights (sky-400)
        'login-accent-hover': '#0ea5e9', // (sky-500)
        'login-form-bg': 'rgba(17, 24, 39, 0.6)', // Darker, more translucent (gray-900 with opacity)
        'login-input-bg': 'rgba(31, 41, 55, 0.7)', // (gray-800 with opacity)
        'login-input-border': 'rgb(55 65 81)',     // (gray-700)
        'login-text-light': '#d1d5db', // (gray-300)
        'login-text-dim': '#9ca3af',   // (gray-400)
      },
      keyframes: {
        // Existing keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(15deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(25px) rotate(-15deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.95)' },
          '50%': { opacity: '0.3', transform: 'scale(1.05)' },
        },
        // Added fadeIn keyframes
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        // Existing animations
        float: 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 5s ease-in-out infinite',
        // Added fadeIn animation
        fadeIn: 'fadeIn 1s ease-out', // You can adjust duration and timing function
      },
      animationDelay: { // For custom utility if needed via plugin
         '1000': '1000ms',
         '2000': '2000ms',
         '3000': '3000ms',
         '4000': '4000ms',
         // You can add more specific delays if needed for fadeIn variations
         '500': '500ms',
         '700': '700ms',
         '900': '900ms',
      },
    },
  },
  plugins: [
    // Plugin to add animation-delay utilities (optional, can use inline style)
    function ({ addUtilities, theme, e }) {
      const newUtilities = {};
      const delays = theme('animationDelay');
      if (delays) {
        Object.entries(delays).forEach(([key, value]) => {
          newUtilities[`.${e(`animation-delay-${key}`)}`] = {
            'animation-delay': value,
          };
        });
        addUtilities(newUtilities, ['responsive', 'hover']);
      }
    },
    // Add other plugins you might be using, e.g.,
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/line-clamp'),
  ],
};