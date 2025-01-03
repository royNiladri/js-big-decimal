const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


var PROD = (process.env.NODE_ENV === "production");
var WEB = (process.env.USE_ENV === "web");

module.exports = {
    entry: "./lib/big-decimal",
    target: [WEB ? "web" : "node", "es5"],
    output: {
        filename: "bundle.js",
        path: WEB ? path.resolve(__dirname, "dist/web") : path.resolve(__dirname, "dist/node"),
        library: {
            name: "bigDecimal",
            type: WEB ? "var" : "umd",
            export: "default"
        },
        filename: PROD ? "js-big-decimal.min.js" : "js-big-decimal.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    optimization: {
        minimizer: PROD ? [
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    sourceMap: true,
                    mangle: true,
                    keep_classnames: true
                },
            })
        ] : []
    }
}
