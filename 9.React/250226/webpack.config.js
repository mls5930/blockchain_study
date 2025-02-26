const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    plugin: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html"
        })
    ]
}