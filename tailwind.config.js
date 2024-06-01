/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#043725',
                primarytint: {
                    100: '#1d4b3b',
                    200: '#365f51',
                    300: '#4f7366',
                    400: '#68877c',
                    500: '#829b92',
                    600: '#9bafa8',
                    700: '#b4c3be',
                    800: '#cdd7d3',
                    900: '#e6ebe9',
                },
                primaryshade: {
                    100: '#043221',
                    200: '#032c1e',
                    300: '#03271a',
                    400: '#022116',
                    500: '#021c13',
                    600: '#02160f',
                    700: '#01100b',
                    800: '#010b07',
                    900: '#000504',
                },
                secondary: {
                    DEFAULT: '#Ffd858',
                    100: '#e6c24f',
                    200: '#ccad46',
                },
                tertiary: {
                    DEFAULT: '#E29728',
                },
                lightgreen: {
                    DEFAULT: '#EEFCC5',
                },
                black: {
                    DEFAULT: '#000',
                    100: '#1E1E2D',
                    200: '#232533',
                },
                gray: {
                    100: '#CDCDE0',
                },
            },
            fontFamily: {
                pthin: ['Poppins-Thin', 'sans-serif'],
                pextralight: ['Poppins-ExtraLight', 'sans-serif'],
                plight: ['Poppins-Light', 'sans-serif'],
                pregular: ['Poppins-Regular', 'sans-serif'],
                pmedium: ['Poppins-Medium', 'sans-serif'],
                psemibold: ['Poppins-SemiBold', 'sans-serif'],
                pbold: ['Poppins-Bold', 'sans-serif'],
                pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
                pblack: ['Poppins-Black', 'sans-serif'],
                hbold: ['Hind-Bold', 'sans-serif'],
                hlight: ['Hind-Light', 'sans-serif'],
                hmedium: ['Hind-Medium', 'sans-serif'],
                hregular: ['Hind-Regular', 'sans-serif'],
                hsemibold: ['Hind-Semibold', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
