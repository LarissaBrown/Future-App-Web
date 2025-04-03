// tailwind.config.js
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Primary colors
          primary: {
            DEFAULT: '#140226',
            light: '#230343',
            dark: '#0f0116',
          },
          secondary: {
            DEFAULT: '#ff0276',
            light: '#ff298e',
            dark: '#d60063',
          },
          accent: {
            DEFAULT: '#eba80c',
            light: '#ffc224',
            dark: '#d69600',
          },
          highlight: {
            DEFAULT: '#ebd40c',
            light: '#fff024',
            dark: '#d6bf00',
          },
          // Extended palette for UI elements
          purple: {
            100: '#c48ff9',
            200: '#b26df7',
            300: '#a04bf5',
            400: '#8e29f3',
            500: '#7c0ced',
            600: '#6b0acb',
            700: '#5908a9',
            800: '#470787',
            900: '#350565',
          },
          pink: {
            100: '#ff89bf',
            200: '#ff66ac',
            300: '#ff4298',
            400: '#ff1e85',
            500: '#ff0276',
            600: '#d60063',
            700: '#ad0050',
            800: '#84003c',
            900: '#5b0029',
          },
        },
        gradientColorStops: theme => ({
          ...theme('colors'),
        }),
        backgroundImage: {
          'gradient-primary': 'linear-gradient(to right, #140226, #ff0276)',
          'gradient-secondary': 'linear-gradient(to right, #ff0276, #eba80c)',
          'gradient-accent': 'linear-gradient(to right, #eba80c, #ebd40c)',
        },
      },
    },
    plugins: [
      import('@tailwindcss/forms'),
      import('@tailwindcss/typography'),
    ],
  }