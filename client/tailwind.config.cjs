/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "open-sans": ["'Open Sans'", "sans-serif"],
            },
            keyframes: {
                "catching-rotate": {
                    "0%, 100%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(45deg)" },
                },
                jump: {
                    "0%:": { transform: "translateY(0)" },
                    "30%": { transform: "translateY(-15px)" },
                    "50%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                "catching-rotate": "catching-rotate 0.7s ease infinite",
                jump: "jump 1s ease forwards",
                fadeIn: "fadeIn 0.7s ease forwards",
            },
        },
    },
    plugins: [],
};
