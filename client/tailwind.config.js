/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                auth: 'url("src/assets/images/bg-auth.jpg")', // dùng src/ hoặc /src/ chứ k đc dùng ./src/
                home: 'url("src/assets/images/h1_hero.png")',
            },
            spacing: {
                headerH: '5rem', // 80px
            },
            colors: {
                toLearn: '#f44f4f',
                learning: '#e6cd84',
                learned: '#4fe121',
            },
        },
        fontFamily: {
            berkshireSwash: ['Berkshire Swash', 'cursive'],
            lobster: ['Lobster', 'cursive'],
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /(bg|text|border)-(toLearn|learning|learned)/,
        },
        // {
        //     pattern: /(mt|mb|mr|ml|my|mx|px|py|pt|pb|pl|pr)-[0-9]+/,
        // },
        // {
        //     pattern: /flex-.*/,
        // },
        // {
        //     pattern: /(bottom|right|top|left)-[0-9]+/,
        // },
        // {
        //     pattern: /(w|h)-[0-9]+/,
        // },
    ],
};
