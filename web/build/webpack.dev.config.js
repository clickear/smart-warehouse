var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var config = require('../config');
var baseWebpackConfig = require('./webpack.base.config');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = [hotMiddlewareScript].concat(baseWebpackConfig.entry[name]);
});
const basePicUrl = config.app.project.replace('/', '');

module.exports = merge(baseWebpackConfig, {
    // https://doc.webpack-china.org/configuration/devtool/
    // 开发辅助调试工具(Devtool)
    devtool: 'source-map', // 原始源码
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    // {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader'},
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                basePicUrl: basePicUrl
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HRW 热重载
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
