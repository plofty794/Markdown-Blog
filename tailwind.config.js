/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/layouts/*"],
    theme: {
        extend: {},
    },
    plugins: [require("tailwindcss"), require("autoprefixer")],
};

// npx tailwindcss -i ./public/styles/input.css -o ./public/output.css --watch
