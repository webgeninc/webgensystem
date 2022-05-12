module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      backgroundImage: {
        system: "url('../assets/systems.svg')",
      },
      spacing: {
        30: "7.5rem",
        76: "19rem",
        86: "22rem",
        "1/7": "14.2857%",
        "2/7": "28.571%",
        "2/9": "22.222%",
        "1/6": "16.666667%",
        110: "28rem",
        120: "40rem",
        "9/10": "90%",
        "98/100": "98%",
        0.75: "3px",
      },
      colors: {
        webgencol: "#39c684",
        fbbackground: "#F2F3F5",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      fontSize: {
        "2xs": "10px",
        "3xs": "8px",
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "spin-slow-twice": "spin 30s linear infinite",
        "spin-reverse": "spin-slow-reverse 10s linear infinite",
        "spin-reverse-twice": "spin-slow-reverse-twice 10s linear infinite",
        "header-on": "header-on 1s linear 1",
      },
      keyframes: {
        "header-on": {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        "spin-slow-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "spin-slow-reverse-twice": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      cursor: {
        grab: "grab",
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
