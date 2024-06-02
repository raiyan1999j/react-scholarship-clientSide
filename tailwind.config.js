/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-main':'url(https://i.postimg.cc/LshrHF6t/bg-main-img.jpg)',
        'login-supp':'url(https://i.postimg.cc/L8jVLyCc/wave-1.png)',
        'login-sup2':'url(https://i.postimg.cc/htrWWpQW/wave-2.png)'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["garden", "sunset"],
  },
}

