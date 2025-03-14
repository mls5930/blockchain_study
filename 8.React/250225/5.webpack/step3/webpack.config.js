const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 모든 .js 또는 .jsx 파일에 대해
                exclude: /node_modules/,
                use: ["babel-loader"] // 바벨 적용
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    }
}