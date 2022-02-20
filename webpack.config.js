const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
    },
    entry: {
        popup: path.resolve(__dirname, './src/js/index-popup.js'),
        options: path.resolve(__dirname, './src/js/index-options.js'),
        custom_button: path.resolve(__dirname, './src/js/index-custom-button.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/pages/popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            template: 'src/pages/options.html',
            chunks: ['options']
        }),
        new HtmlWebpackPlugin({
            filename: 'custom-button.html',
            template: 'src/pages/custom-button.html',
            chunks: ['custom_button']
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/manifest.json', to: '[name].[ext]'},
                {from: 'src/background.js', to: '[name].[ext]'},
                {from: 'src/inject_script.js', to: '[name].[ext]'},
                {from: 'src/images/*.png', to: '[name].[ext]'}
            ]
        }),
        new CleanWebpackPlugin()
    ]
}
