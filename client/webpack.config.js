const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const ifDev = (val, other) => env !== 'production' ? val : other;

    return {
        mode: 'none',
        entry: {
            main: './src/index'
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
