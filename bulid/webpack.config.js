var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry:  ROOT_PATH + 'app/main.js',//已多次提及的唯一入口文件
    output: {
        path: ROOT_PATH + 'dist',//打包后的文件存放的地方
        filename: '[name]-bundle.js'//打包后输出文件的文件名
    },
    module: {
        // 配置loader
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'                
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    'presets': ['react', 'es2015'],
                    'env': {
                        'development': {
                            'plugins': [['react-transform', {
                                'transforms': [{
                                    'transform': 'react-transform-hmr',
                                    'imports': ['react'],
                                    'locals': ['module']
                                }]
                            }]]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                // 感叹号的作用在于使同一文件能够使用不同类型的loader，
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
        ]
    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: ROOT_PATH + 'app/index.tmpl.html'   //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ],

    // 本地服务器
    devServer: {
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
}