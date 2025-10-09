import heroUINativePlugin from 'heroui-native/tailwind-plugin'

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },

  presets: [require('nativewind/preset')],
  plugins: [heroUINativePlugin],
}
