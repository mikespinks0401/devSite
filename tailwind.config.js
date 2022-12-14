module.exports = {
  darkMode: 'class',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  theme: {
    extend: {
      animation: {
        'spin-loading': 'spin 1s ease infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primaryLight: '#C2DEDE',
        primaryDark: '#1C2230',
        primaryAccent: '#EA652C',
        primaryAccent2: 'rgb(32, 178, 170)',
        primaryAccent2Hover: 'rgb(19, 110, 105)',
        primaryAccentDark: '#FCA47C',
        primaryText: 'rgb(17, 24, 39)',
        primaryTextDark: 'rgb(243, 244, 246)',
        danger: 'rgb(220, 38, 38)',
        dangerDark: 'rgb(239 68 68)',
        success: '#2563EB',
        successHover: '#1D4ED8',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
