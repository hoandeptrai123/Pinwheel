module.exports = {
  content: [
    './index.html',
    './public/js/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2.5rem',
        xl: '4rem',
      },
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1140px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        primary: '#FE6019',
        charcoal: '#222222',
        border: '#EBEBEB',
        'theme-light': '#E5E5E5',
        'theme-dark': '#1A202C',
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
        merriweather: ['Merriweather', 'serif'],
      },
      boxShadow: {
        brand: '0px 15px 34px rgba(0, 0, 0, 0.1)',
        cta: '0px 25px 60px rgba(250, 112, 154, 0.35)',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(184.78deg, #FA709A 7.64%, #FEE140 120.07%)',
      },
      borderRadius: {
        hero: '20px',
        cta: '80px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        swiper: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1.5rem))' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

