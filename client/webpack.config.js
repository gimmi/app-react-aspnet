const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const ifDev = (val, other) => env !== 'production' ? val : other;

    return {
        mode: 'none',
        entry: {
            main: [
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
            nodeEnv: ifDev('development', 'production'),
            minimize: ifDev(false, true)
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [ 'babel-loader' ]
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
