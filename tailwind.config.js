module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: ["w-1/5", "w-1/4", "w-1/3", "w-1/2"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        secondary: "#FF4D00",
        background: {
          DEFAULT: "#181818",
          lighter: "#262626",
          darker: "#0d0d0d",
        },
      },
      spacing: {
        in: "inherit",
        "32rem": "32rem",
      },
      fontSize: {
        ti: ["0.5rem", "0.75rem"],
      },
      minHeight: {
        4: "4rem",
      },
      maxHeight: {
        60: "15rem",
      },
      minWidth: {
        "1/4": "25%",
      },
      maxWidth: {
        "1/4": "25%",
        36: "9rem",
        24: "6rem",
      },
      zIndex: {
        1: 1,
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      borderRadius: ["group-hover"],
      visibility: ["group-hover"],
      zIndex: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
