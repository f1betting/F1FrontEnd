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
        extend: {
            screens: {
                "phone": {"max": "500px"}
            },
        },
    },
    plugins: [],
}
