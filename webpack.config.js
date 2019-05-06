const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var PROD = (process.env.NODE_ENV === "production");
var WEB = (process.env.USE_ENV === "web");

module.exports = {
    entry: "./lib/big-decimal",
    target: WEB ? "web" : "node",
    output: {
        filename: "bundle.js",
        path: WEB ? path.resolve(__dirname, "dist/web") : path.resolve(__dirname, "dist/node"),
        library: "bigDecimal",
        libraryTarget: WEB ? "var" : "umd",
        filename: PROD ? "js-big-decimal.min.js" : "js-big-decimal.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    optimization: {
        minimizer: PROD ? [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 5,
                    warnings: false,
                    sourceMap: true,
                    keep_classnames: true
                },
                sourceMap: true
            })
        ] : []
    }
}