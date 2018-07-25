const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const ifDev = (val, other) => env !== 'production' ? val : other;

    return {
        mode: 'none',
        entry: {
            main: [
                './src/index.scss',
                'babel-polyfill',
                './src/index'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: ifDev('[name].js', '[hash].js')
        },
        devtool: ifDev('source-maps', false),
        optimization: {
            minimize: ifDev(false, true)
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [ 'babel-loader', 'eslint-loader' ]
            }, {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ifDev('development', 'production')),
                'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
                'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        devServer: {
            inline: false
        }
    };
};
