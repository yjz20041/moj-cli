const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SOURCE_PATH = path.join(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, './dist');
const CleanPlugin = require('clean-webpack-plugin');


// eslint-disable-next-line no-unused-vars
module.exports = (env = {}, argv) => {
    const mode = argv.mode || 'development';
    const PRODUCTION = mode === 'production';
    const config = {
        entry: {
            index: [path.resolve(SOURCE_PATH, 'index.js')]
        },
        output: {
            path: DIST_PATH,
            filename: PRODUCTION ? 'bbb.min.js' : 'bbb.js',
            publicPath: '',
            library: 'bbb',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.jsx', '.js', '.css', '.less'],
            alias: {
            }
        },
        module: {},
        mode,
        devtool: PRODUCTION ? false : 'inline-source-map',
        externals: {
            react: 'react',
            'prop-types': 'prop-types',
            regularjs: 'regularjs'
        }
    };
    // 规则
    const rules = [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        }
    ];
    // 插件
    const plugins = [
        new CleanPlugin()
    ];

    // css 相关
    const cssLoaders = [
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader'
        }
    ];

    if (!PRODUCTION) {
        cssLoaders.unshift({
            loader: 'style-loader'
        });
    } else {
        cssLoaders.unshift({
            loader: MiniCssExtractPlugin.loader
        });
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'bbb.min.css',
                chunkFilename: '[id][hash:8].css'
            })
        );
    }
    rules.push({
        test: /\.css$/,
        use: cssLoaders
    });

    // tree shaking in developmemt mode
    config.optimization = {
        usedExports: true,
        sideEffects: true,
        nodeEnv: 'development'
    };

    // optimization
    if (PRODUCTION) {
        config.optimization = {
            nodeEnv: 'production',
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        };
    }

    // 设置 rules
    config.module.rules = rules;
    // 设置 插件
    config.plugins = plugins;
    return config;
};
