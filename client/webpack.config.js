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
            path: path.resolve(__dirname, '..', 'server', 'src', 'MyCompany.MyStack.MyRestApp', 'wwwroot'),
            filename: ifDev('[name].js', '[hash].js')
        },
        devtool: ifDev('source-maps', false),
        optimization: {
            nodeEnv: ifDev('development', 'production'),
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
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        devServer: {
            inline: false
        }
    };
};
