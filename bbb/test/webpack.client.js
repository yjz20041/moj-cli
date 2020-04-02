const path = require('path');
const webpack = require('webpack');

const SOURCE_PATH = path.join(__dirname, '.');
const DIST_PATH = path.resolve(__dirname, './dist');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');


module.exports = (env = {}, argv) => {
    const mode = 'development';
    const config = {
        entry: {
            index: [path.resolve(SOURCE_PATH, 'index')]
        },
        output: {
            path: DIST_PATH,
            filename: '[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.jsx', '.js', '.css', '.less'],
            alias: {
            }
        },
        module: {},
        mode,
        devtool: 'source-map'
    };
    // 规则
    const rules = [
        {
            test: /\.(js|jsx)$/,
            include: [
                SOURCE_PATH
            ],
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        },
        {
            test: /\.(html)$/,
            loader: 'raw-loader'
        },
        {
            test: /\.(gif|jpg|png|svg|eot|ttf|woff|pdf)$/,
            loader: 'file-loader'
        }
    ];
    // 插件
    const plugins = [
        new CleanPlugin()
    ];


    plugins.push(new webpack.HotModuleReplacementPlugin());
    const proxy = require('./proxy.config');
    const proxyTarget = argv.proxyTarget;
    if (proxyTarget) {
        proxy.forEach(p => {
            p.target = p.target.replace(/qa-\w+/, `qa-${proxyTarget}`)
        })
    }
    config.devServer = {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 6188,
        hot: false,
        hotOnly: true,
        historyApiFallback: true,
        proxy,
        open: true
    };

    // html
    plugins.push(
        new HtmlPlugin({
            template: path.join(__dirname, './index.ejs'),
            filename: 'index.html'
        })
    );

    // css 相关
    const cssLoaders = [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                modules: false,
                importLoaders: 1
            }
        },
        {
            loader: 'postcss-loader'
        }
    ];
    
    rules.push({
        resource: {
            test: /\.(css|less)$/,
            exclude: /node_modules/
        },
        use: cssLoaders
    });


    // 设置 rules
    config.module.rules = rules;
    // 设置 插件
    config.plugins = plugins;
    return config;
};
