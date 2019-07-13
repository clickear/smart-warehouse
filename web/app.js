'use strict';
let express = require('express');
let path = require('path');
let compress = require('compression'); // GZIP压缩
let cookieParser = require('cookie-parser'); // 解析cookie
let bodyParser = require('body-parser'); // body参数解析
let session = require('express-session'); // session存储
let passport = require('passport'); // 登录认证
let ejs = require('ejs'); // ejs
let config = require('./config'); // 自定义配置信息
let util = require('util');
let ueditor = require('ueditor');
let fsExtra = require('fs-extra');

let registerGlobal = function () {
    let logger = require('./app/util/LoggerUtil').logger('app.js');
    let Response = require('./app/model/Response');
    let _ = require('lodash/collection');
    let _slice = Array.prototype.slice;
    global.ModelProxy = function (Controller) {
        let model = {};
        _.each(Controller, function (handler, prop) {
            model[prop] = function (req, res, next) {
                let args = _slice.call(arguments, 0);
                let promise = new Promise((resolve, reject) => {
                    let ctx = {
                        resolve: resolve,
                        reject: reject,
                        req: args[0],
                        res: args[1],
                        next: args[2]
                    };
                    let params = _slice.call(args, 3);
                    handler.apply(ctx, params);
                });
                promise.then(function (response) { // resolve
                    if (response instanceof Response) {
                        let method = response.getMethod();
                        let headers = response.getHeaders() || {};
                        let data = response.getData();
                        _.forEach(headers, function (val, key) {
                            res.setHeader(key, val);
                        });
                        res.status(response.getStatusCode());
                        res[method].apply(res, data);
                    } else {
                        throw new Error('The response that given is not an instance of Response!');
                    }
                }, function (msg) { // reject, it will go to error page
                    throw msg;
                }).catch(function (err) {
                    logger.error(err);
                    !res.headersSent && next(err instanceof Error ? err : new Error(err));
                });
            };
        });
        return model;
    };
};

/**
 * 配置session策略 支持：redis|mysql|memory
 * @param config
 * @param session
 */
let configureSessionStrategy = function (config, session) {
    let cSesssion = config.app.session;
    cSesssion.store = require('./config/strategy/session')(session, cSesssion.storeStrategy);
};
/**
 * 配置登录策略 支持：local|microblog
 * @param config
 * @param passport
 */
let configurePassportStrategy = function (config, passport) {
    require('./config/strategy/passport')(passport);
};

registerGlobal();
configureSessionStrategy(config, session);
configurePassportStrategy(config, passport);

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');

// 基础中间件
app.use(compress(), bodyParser.json(), bodyParser.json({limit: '50mb'}), bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}), cookieParser());

let UPLOAD_PATH = '';
if (process.env.NODE_ENV === 'production') {
    UPLOAD_PATH = config.app.staticResources;
} else {
    UPLOAD_PATH = 'static';
}

let listImages = path.join(__dirname, UPLOAD_PATH, '/upload/images/');
fsExtra.ensureDirSync(listImages);

//编辑器上传图片
app.use(config.app.project + '/lib/ueditor/ue', ueditor(path.join(__dirname, UPLOAD_PATH), function (req, res, next) {
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = `upload/images/`;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = `upload/otherFile/`; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = `upload/video/`; // 视频保存地址
        }
        res.ue_up(file_url); // 你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage') {
        var dir_url = `/upload/images/`;
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        //定制 nodejs 的配置文件
        res.setHeader('Content-Type', 'application/json');
        res.redirect('nodejs/config.json');
    }
}));

// 正式环境用这个静态路由
if (process.env.NODE_ENV === 'production') {
    // 静态文件路由
    app.use(
        config.app.project,
        express.static(path.join(__dirname, config.app.staticResources)),
        (req, res, next) => {
            let flag = /\.(js|html|htm|css|less|png|jpg|jpeg|gif|ico){1}$/i.test(req.originalUrl);
            !flag && next();
            flag && res.sendStatus(404); // Gone
        });
} else {
    app.use(config.app.project, express.static(path.join(__dirname, 'static')));
}

app.use(session(config.app.session)); // 添加 session 中间件
app.use(passport.initialize({userProperty: 'user'})); // 初始化passport中间件，定义将登录成功之后的对象缓存到 req.user
app.use(passport.session());

// 业务路由
let router = require('./router');
router(app);

// 正式环境才用，不然页面会报错；(reload/reload.js 404 Not Found)
if (process.env.NODE_ENV === 'production') {
    // 处理404
    app.use((req, res) => {
        res.status(404).render('error', {code: 404});
    });

    // 处理异常
    app.use((err, req, res) => {
        res.status(err.status || 500).render('error', {
            msg: err.message,
            error: err
        });
    });
}

module.exports = app;
