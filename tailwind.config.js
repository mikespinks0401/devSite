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
      colors: {
        primaryLight: '#C2DEDE',
        primaryDark: '#1C2230',
        primaryAccent: '#EA652C',
        primaryAccentDark: '#FCA47C',
        primaryText: 'rgb(17, 24, 39)',
        primaryTextDark: 'rgb(243, 244, 246)'
      },
    },
  },
}
