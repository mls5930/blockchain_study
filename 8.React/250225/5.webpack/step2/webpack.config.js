const path = require("path");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.css$/, // 모든 .css 파일에 대해
                use: ['style-loader', 'css-loader'], // style-loader와 css-loader를 적용
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    }
}