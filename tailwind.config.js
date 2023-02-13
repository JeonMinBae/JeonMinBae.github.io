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
            gridTemplateColumns: {
                "post-1": 'repeat(1, minmax(20rem, 1fr))',
                "post-2": 'repeat(2, minmax(20rem, 1fr))',
                "post-3": 'repeat(3, minmax(20rem, 1fr))',
                "post-4": 'repeat(4, minmax(20rem, 1fr))',
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

