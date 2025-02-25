const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.jsx", // ✅ entry 확인 필요
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["react-refresh/babel"], // ✅ Fast Refresh 플러그인 추가
                    },
                },
            },
            {
                test: /\.css$/, // ✅ CSS 파일 처리
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        hot: true, // ✅ HMR 활성화
        liveReload: false, // ❌ 전체 새로고침 방지
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html", // ✅ 정확한 HTML 템플릿 경로 지정
        }),
        new ReactRefreshWebpackPlugin(), // ✅ Fast Refresh 추가
    ],
    resolve: {
        extensions: [".js", ".jsx"], // ✅ import 시 확장자 생략 가능
    },
};
