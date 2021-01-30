// next.config.js

// module.exports = {
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.svg$/,
//             // issuer: {
//             //     test: /\.(js|ts)x?$/,
//             // },
//             use: ['@svgr/webpack', 'file-loader'],
//             // options: {
//             //     name: '[name]_[hash].[ext]',
//             //     publicPath: `/_next/static/files`,
//             //     outputPath: 'static/files'
//             // }
//         });

//         return config;
//     },
// };


// // next.config.js
// const withImages = require('next-images')
// module.exports = withImages({
//     inlineImageLimit: false
// })