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
        // Bundle dosyaları olarak kullanacağımız componentleri ayrı ayrı olarak tanımlıyoruz. webpack bu dosyaları'daki react componentleri js dosyasına dönüştürecek
        popup: path.resolve(__dirname, './src/js/index-popup.js'),
        options: path.resolve(__dirname, './src/js/index-options.js'),
        custom_button: path.resolve(__dirname, './src/js/index-custom-button.js')
    },
    output: {
        // entry da belirlediğimiz tüm copnenetlerin isimlendirmesini  [compenent_adı].bundle.js'
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'), // webpack oluşturduğu dosyaları dist klasörünün iöerisini taşıyacak
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/, //webpack bu uzantıları babel ile js olarak dönüştürecek
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react', // uygulamanın react olduğunu belirtiyoruz
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
                use: ['style-loader','css-loader'], //csslerimin de webpack tarafında yorumlanması için loaderları tanımlıyoruz. çalışma şekli sağdan sola doğrudur.
                // önce css-loader sonra style loader çalışacak
            },
        ]
    },
    plugins: [
        // aşağıdaki dosyları extensiona taşıyoruz. ilemin sonunda yukarıda oluşturduğumuz bundle dosyalar bu sayfalar script olarak ekelenecek.
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
        // aşağıdaki dosyalarda herhangi bir işlem yapmadan olduğu gibi dist dosyasına copyalıyoruzz
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/images/*.png', to: '[name].[ext]'},
                {from: 'src/manifest.json', to: '[name].[ext]'},
                {from: 'src/background.js', to: '[name].[ext]'},
                {from: 'src/inject_script.js', to: '[name].[ext]'}
            ]
        }),
        new CleanWebpackPlugin()
    ]
}
