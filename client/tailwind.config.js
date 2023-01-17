/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                auth: 'url("src/assets/images/bg-auth.jpg")', // dùng src/ hoặc /src/ chứ k đc dùng ./src/
            },
        },
        fontFamily: {
            berkshireSwash: ['Berkshire Swash', 'cursive'],
            lobster: ['Lobster', 'cursive'],
        },
    },
    plugins: [],
};
