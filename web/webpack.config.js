const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                    'style-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html"
        })
    ],
    devServer: {
        hot: true
    }, resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.styles', '.sass', '.css'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

}