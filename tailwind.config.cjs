/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            "red": "var(--red)",
            "black": "var(--black)",
            "off-white": "var(--off-white)",
            "white": "var(--white)"
        },
        screens: {
            "phone": {"max": "820px"},
            "small": {"min": "821px", "max": "1500px"},
            "lg": {"min": "1500px"}
        },
        extend: {},
    },
    plugins: [],
}
