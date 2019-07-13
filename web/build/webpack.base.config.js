let webpack = require('webpack');
let path = require('path');
let config = require('../config');
let glob = require('glob');
let CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    let _path = path.join(__dirname, '..', dir);
    return _path;
}

let entryPoint = process.env.NODE_ENV ? false : true;
// 公用模块,第三方库;
const VENDOR_PATH = 'js/common';
var vendors = [];

// 遍历入口文件
function getEntry(globPath) {
    let entries = {}, basename;
    if (typeof (globPath) !== 'object') {
        globPath = [globPath];
    }
    if (entryPoint) {
        for (var x in globPath) {
            globPath[x] = `.${globPath[x]}`;
        }
    }
    globPath.forEach((itemPath) => {
        glob
        let files  = glob.sync(itemPath);
        files.forEach(function (entry) {
            if (entry.indexOf('../') > -1) {
                entry = entry.substr(1);
            }
            basename = entry.substring(6, entry.indexOf(path.extname(entry))).replace('module', 'js');
            if (/^js\/common/.test(basename)) {
                vendors.push(basename);
            }
            entries[basename] = path.join(__dirname, '..', entry);
        });
    });
  return entries;
     

}

// 获得入口js文件
var entries = getEntry([
    './src/module/**/*.js'
]);

console.log('======================================================================');
console.log('webpack.base.config  entry');
console.log(JSON.stringify(entries));
console.log('----------------------------------------------------------------------');
console.log('webpack.base.config  commons ');
console.log(JSON.stringify(vendors));
console.log('======================================================================');

let baseConfig = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', config.app.staticResources),
        publicPath: config.app.publicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': resolve('src'),
            'common': resolve('src/module/common'),
            'less': resolve('src/less')
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.(js)$/,  // 代码检查
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [ // 推荐这样配置
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 限制大小
                            // prefix:'img',
                            name: 'img/url/[name]-[hash:10].[ext]' // 目录生成路径及文件名和扩展名
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 99999999, // 设置小了会出现 xxx.ttf CROF 问题
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                query: {
                    presets: ['es2015']
                },
                exclude: /(node_modules)/
            }
        ]
    },
    externals: {
        jQuery: 'jQuery',
        MapUtils: 'MapUtils',
        URI: 'URI',
        BMap: 'BMap' // 地图工具类
    },
    plugins: [
        new CleanWebpackPlugin(['target', 'dist', config.app.staticResources], {
            root: path.resolve(__dirname, '..')
        }),
        new webpack.optimize.CommonsChunkPlugin({ // JS 代码公用分离
            // name: 'vendor',
            // name:['m']         输出到：public/m.js
            // name:['common/m']  输出到：public/common/m.js
            name: `${VENDOR_PATH}/manifest`,
            // filename: "commons.js",
            chunks: vendors
        }),

    ],
    node: {
        fs: 'empty'
    },
};
module.exports = baseConfig;
