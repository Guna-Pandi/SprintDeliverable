/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'lg':{'max':'991px'},
      'xl':{'max':'1200px'},
      'md':{'max':'767px'},
      'sm':{'max':'550px'},
      'xsm':{'max':'375px'},
    }
  },
  plugins: [],
}