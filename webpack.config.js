var path = require("path");
var webpack = require('webpack');

var PROD = (process.env.NODE_ENV === "production");
var WEB = (process.env.USE_ENV === "web");

module.exports = {
    entry: "./lib/big-decimal",
    target: WEB? "web" : "node",
    output: {
        filename: "bundle.js",
        path: WEB? path.resolve(__dirname, "dist/web") : path.resolve(__dirname, "dist/node"),
        library: "bigDecimal",
        libraryTarget: WEB? "var" : "umd",
        filename: PROD ? "js-big-decimal.min.js" : "js-big-decimal.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : []
}