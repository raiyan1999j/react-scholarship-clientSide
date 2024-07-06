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
        'login-sup2':'url(https://i.postimg.cc/htrWWpQW/wave-2.png)',
        'dashNav' : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 1) 100%), url(https://i.postimg.cc/59TxtPqQ/dashboard-Nav.png)',
        'homeBg':'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 1) 100%),url(https://i.postimg.cc/x1NWPtLx/study-abroad.jpg)',
        'appliedBg':'url(https://i.postimg.cc/6qCfbfr1/blob-scatter-haikei.png)'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["garden", "sunset"],
  },
}

