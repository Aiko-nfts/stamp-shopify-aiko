/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '500px',
      md: {
        raw: '(min-width: 600px) and (max-width: 767px), (min-width: 868px)',
      },
      lg: '1024px',
      xl: '1280px',
      '2xl': {
        raw: '(min-width: 1600px) and (min-height: 900px)',
      },
      '3xl': {
        raw: '(min-width: 1680px) and (min-height: 1050px)',
      },
      '4xl': {
        raw: '(min-width: 1920px) and (min-height: 1050px)',
      },
      '5xl': {
        raw: '(min-width: 2560px) and (min-height: 1440px)',
      },
    },
    extend: {
      width: {
        '4/5': '80%',
        '9/10': '90%',
        '1/8': '10%',
      },
      height: {
        '4/5': '80%',
        '9/10': '90%',
      },
      keyframes: {
        slide: {
          '0%': {transform: 'translate(35.5%, -35.5%)  scale(2)'},
          '100%': {transform: 'translate(-48%, 48%)  scale(2)'},
        },
        slideRight: {
          '0%': {opacity: '0%'},
          '40%': {width: '10%'},
          '100%': {width: '100%'},
        },
        backSlideRight: {
          '0%': {width: '100%'},
          '60%': {width: '0%', opacity: '0%'},
          '100%': {position: 'absolute', opacity: '0%', visibility: 'hidden'},
        },
        slideWidth: {
          '0%': {opacity: '0%'},
          '40%': {height: '10%'},
          '100%': {height: '100%'},
        },
        slideUp: {
          '0%': {transform: 'translate(0px, 3rem)', opacity: '0'},
          '90%': {transform: 'translate(0px, 3rem)', opacity: '0'},
          '100%': {transform: 'translate(0px, 0px)', opacity: '1'},
        },
        backSlideUp: {
          '0%': {transform: 'translate(0px, 0px)', opacity: '1'},
          '90%': {transform: 'translate(0px, 3rem)', opacity: '0'},
          '100%': {
            position: 'absolute',
            transform: 'translate(0px, 3rem)',
            opacity: '0',
            visibility: 'hidden',
          },
        },
        blink: {
          '0%': {opacity: '0'},
          '75%': {opacity: '0.5'},
          '85%': {opacity: '1'},
          '95%': {opacity: '0.5'},
          '100%': {opacity: '1'},
        },
        backBlink: {
          '0%': {opacity: '1'},
          '5%': {opacity: '0.5'},
          '15%': {opacity: '1'},
          '25%': {opacity: '0.5'},
          '35%': {opacity: '0'},
          '100%': {position: 'absolute', opacity: '0', visibility: 'hidden'},
        },
      },
      animation: {
        slide: 'slide 3s linear infinite',
        slideRight: 'slideRight 1.2s cubic-bezier(1,0,0,1) forwards',
        backSlideRight: 'backSlideRight 1.2s cubic-bezier(1,0,0,1) forwards',
        slideWidth: 'slideWidth 1.2s cubic-bezier(1,0,0,1) forwards',
        blink: 'blink 1.2s cubic-bezier(1,0,0,1)',
        backBlink: 'backBlink 1.2s cubic-bezier(1,0,0,1) forwards',
        slideUp: 'slideUp 1.35s cubic-bezier(1,0,0,1)',
        backSlideUp: 'backSlideUp 1.35s cubic-bezier(1,0,0,1) forwards',
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
        formDarkBlue: '#54688c',
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      opacity: ['group-hover'],
      backgroundColor: ['hover'],
    },
  },
  plugins: [],
};
