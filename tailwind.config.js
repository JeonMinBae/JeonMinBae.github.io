/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
    corePlugins: {
        preflight: false
    },
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {
        extend: {
            colors: {},
            keyframes: {
                out: {
                    "0%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                    "100%": { opacity: "0" }
                }
            },
            animation: {
                "tracking-in": "out 0.4s reverse",
                "tracking-out": "out 0.4s linear"
            }
        }
    },
    variants: {},
    plugins: []

}

