'use strict';
var Restify = require('./Restify'),
    logger = require('./LoggerUtil').logger('RestifyProxy'),
    _ = require('lodash/lang'),
    Response = require('../model/Response');

class RestifyProxy {
    constructor (ctx) {
        this._restify = new Restify();
        this._context = ctx;
        this._beforeRequest = null;
    }

    setContext (ctx) {
        this._context = ctx;
        return this;
    }

    setUrl (url, override) {
        this._restify.setUrl(url, override);
        return this;
    }

    setToken (token) {
        this._restify.setToken(token);
        return this;
    }

    setParameter (params) {
        this._restify.setParameter(params);
        return this;
    }

    setFormData (formData) {
        this._restify.setFormData(formData);
        return this;
    }

    setBeforeRequest (handler) {
        if (!(_.isFunction(handler))) {
            throw 'handle should be a Function!';
        }
        this._beforeRequest = handler;
        return this;
    }

    get (cb) {
        this._request('get', cb);
    }

    post (cb) {
        this._request('post', cb);
    }

    put (cb) {
        this._request('put', cb);
    }

    del (cb) {
        this._request('del', cb);
    }

    uploadFile (cb) {
        this._request('uploadFile', cb);
    }

    promiseGet (url, params) {
        let me = this;
        return new Promise(function (resolve) {
            try {
                me.setUrl(url).setParameter(params || null)
                    .get(function (rData) {
                        resolve(rData);
                    }.bind(me));
            } catch (err) {
                console.error(err);
                resolve(err);
            }
        });
    }

    _request (method, cb) {
        _.isFunction(this._beforeRequest) && this._beforeRequest();
        let ctx = this._context;
        ctx && ctx.req && ctx.req.user && (this._restify.setToken(ctx.req.user.token));
        this._restify[method].call(this._restify, function (ret) {
            this._callback(ret, cb);
        }.bind(this));
    }

    _callback (ret, cb) {
        switch (ret.code) {
            case 10007: { // token 失效
                let ctx = this._context;
                let isXHR = ctx.req.xhr;
                logger.error(ret);
                // ajax 请求，则返回 json
                isXHR && ctx.resolve(new Response('send', {msg: '登录超时，请重新登录！', url: '/logout'}).status(401));
                // 非 ajax 请求，直接调整到登录页面
                !isXHR && ctx.resolve(new Response('redirect', '/login'));
                break;
            }
            default: {
                cb(ret);
                break;
            }
        }
    }
}

module.exports = RestifyProxy;