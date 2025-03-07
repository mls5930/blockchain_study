const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { _ } = require("ajv");
const MiniCssEstractPlugin = require("mini-css-extract-plugin")
module.exports = {
    name: "styled-Component",
    mode: "development",
    entry: "./src/index.jsx",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test:/\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env" , "@babel/preset-react"]
                }
            },
            // {
            //     test:/\.css/,
            //     use:[MiniCssEstractPlugin.loader, "css-loader"]
            // }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
        // new MiniCssEstractPlugin({filename: "bundle.css"})
    ],
    output: {
        path: path.join(__dirname,"dist"),
        filename: "bundle.js"
    },
    devServer:{
        static:{
            directory: path.join(__dirname, "dist")
        },
        compress:true,
        port: 3000,
        hot: true,
        historyApiFallback:true
    }
}