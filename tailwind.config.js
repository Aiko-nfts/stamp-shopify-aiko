/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': {transform: 'translate(35.5%, -35.5%)  scale(2)'},
          '100%': {transform: 'translate(-48%, 48%)  scale(2)'},
        },
      },
      animation: {
        slide: 'slide 3s linear infinite',
      },
      fontFamily: {
        video: ['video', 'system-ui', 'sans-serif'],
      },
      colors: {
        price: '#FFD067',
        primary: '#E1E6F2',
        secondary: '#BFD2F7',
        tertiary: '#333333',
        shadow: '#A1AEC9',
        darkerblue: '#54688C',
        tab: '#8CA9DD',
        span: '#9BA9C1',
        formDarkBlue: '#54688c',
        black: '#333333',
        red: '#ac6458',
        pDetailsUnselectedBlue: '#dcecff',
        formLightBlue: '#94afdf',
        yellow: '#ffd067',
        gradientLightestBlue: '#a8bbed',
        gradientDarkestBlue: '#697ba8',
      },
      backgroundColor: {
        primary: '#E1E6F2',
        secondary: '#BFD2F7',
        tertiary: '#4E4E4E',
        tab: '#8CA9DD',
        gradientLightestBlue: '#a8bbed',
        gradientDarkestBlue: '#697ba8',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
};
