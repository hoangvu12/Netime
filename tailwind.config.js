module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
      },
      fontSize: {
        ti: ["0.5rem", "0.75rem"],
      },
    },
    minHeight: {
      11: "11rem",
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
