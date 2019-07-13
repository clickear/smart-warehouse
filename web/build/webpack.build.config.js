let fs = require('fs');
let path = require('path');
let archiver = require('archiver');
let webpack = require('webpack');
let merge = require('webpack-merge');
let config = require('../config');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

const projectName = config.app.project;
const basePicUrl = config.app.project.replace('/', '');

var baseWebpackConfig = require('./webpack.base.config');
var buildConfig = merge(baseWebpackConfig, {
    // performance: {
    //     hints: "error"
    // },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        {loader: 'resolve-url-loader'},
                        {loader: 'postcss-loader'}, // 自动添加浏览器前缀
                        {
                            loader: 'less-loader',
                            options: {
                                // sourceMap: true, // 添加了 postcss-loader 插件就不能用 sourceMap
                                globalVars: {
                                    basePicUrl: basePicUrl
                                }
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('[name].css').replace('js', 'css');
            },
            allChunks: true
        })
    ]
});

// 生产模式
if (process.env.NODE_ENV === 'production') {
    buildConfig.module.rules.push(
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }
            ]
        }
    );
    buildConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    );
    buildConfig.plugins.push(
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    );
    buildConfig.plugins.push(new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../views'),
            to: path.join(__dirname, '..', config.app.staticResources, 'views'),
            ignore: ['.*']
        },
        {
            from: path.resolve(__dirname, '../static'),
            to: path.join(__dirname, '..', config.app.staticResources),
            ignore: ['.*']
        }
    ]));
    buildConfig.plugins.push(new webpack.ProgressPlugin(function (percentage, msg) {
        if (percentage === 1) {
            let targetPath = path.resolve(__dirname, '..', 'target');
            fs.mkdirSync(targetPath, 777);
            let output = fs.createWriteStream(`${targetPath}/${projectName}.zip`);
            output.on('close', function () {
                console.log(`总大小：${archive.pointer()}`);
            });
            let archive = archiver('zip', {
                zlib: {level: 9}
            });
            archive.on('warning', function (err) {
                if (err.code === 'ENOENT') {
                    // log warning
                    console.log(err);
                } else {
                    // throw error
                    throw err;
                }
            });
            archive.on('error', function (err) {
                throw err;
            });

            archive.pipe(output);
            archive.directory(path.join(__dirname, '../app'), 'app');
            archive.directory(path.join(__dirname, '../config'), 'config');
            archive.directory(path.join(__dirname, '../routes'), 'routes');
            archive.directory(path.join(__dirname, '../dist'), 'dist');
            archive.directory(path.join(__dirname, '../views'), 'views');
            archive.file(path.join(__dirname, '../build/startup.js'), {name: 'build/startup.js'});
            archive.file(path.join(__dirname, '../app.js'), {name: 'app.js'});
            archive.file(path.join(__dirname, '../gulpfile.js'), {name: 'gulpfile.js'});
            archive.file(path.join(__dirname, '../package.json'), {name: 'package.json'});
            archive.file(path.join(__dirname, '../pm2.json'), {name: 'pm2.json'});
            archive.file(path.join(__dirname, '../router.js'), {name: 'router.js'});
            archive.finalize();
        }
    }));
}

module.exports = buildConfig;
