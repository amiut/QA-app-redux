const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    outline: false,
  },
  jit: true,
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        primary: {
          300: '#ff2e63',
          400: '#ed2f59',
        },
        blue: {
          100: '#f7f9fb',
        },
        red: {
          500: '#ed305a',
        },
        dark: {
          400: '#7b87a0',
          700: '#373435',
          900: '#262626',
        },
        neutral: {
          100: '#f5f5f5',
          200: '#d4d3d3',
          300: '#eaeaea',
          400: '#c0c0c0',
        },
      },
      fontFamily: {
        ybakh: ['ybakh', ...defaultTheme.fontFamily.sans],
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      padding: {
        7.5: '1.875rem',
        12.5: '3.125rem',
      },
      margin: {
        7.5: '1.875rem',
        12.5: '3.125rem',
      },
      width: {
        7.5: '1.875rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        15: '3.75rem',
        21: '5.25rem',
        30: '7.5rem',
        75: '18.75rem',
      },
      height: {
        7.5: '1.875rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        15: '3.75rem',
        21: '5.25rem',
        30: '7.5rem',
        75: '18.75rem',
      },
      borderRadius: {
        20: '20px',
        23: '23px',
        30: '30px',
      },
      boxShadow: {
        dropdown: '3px 4px 18px rgba(0, 0, 0, 0.3)',
        droplight: '0 5px 10px rgba(0, 0, 0, 0.1)',
      },
      zIndex: {
        '-3': '-3',
        '-2': '-2',
        '-1': '-1',
        1: '1',
        2: '2',
        3: '3',
        high: '9999999',
        max: '9999999999',
      },
      maxWidth: {
        410: '410px',
      },
      blur: {
        1: '1px',
        2: '2px',
      },
      minWidth: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
