'use strict';
var util = require('util');

class Response {
    constructor(method, data, headers) {
        this._method = method;
        this._data = util.isNullOrUndefined(data) || util.isArray(data) ? data : [data];
        this._headers = headers || {};
        this._statusCode = 200;
    }

    setMethod(method) {
        this._method = method;
        return this;
    }

    getMethod() {
        return this._method;
    }

    setHeaders(key, value) {
        let headers = {};
        if (util.isObject(key)) {
            headers = key;
        } else {
            headers[key] = value;
        }
        this._headers = util._extend(this._headers, headers);
        return this;
    }

    getHeaders() {
        return this._headers;
    }

    setData(data) {
        this._data = data;
        return this;
    }

    getData() {
        return this._data;
    }

    getStatusCode() {
        return this._statusCode;
    }

    status(code) {
        this._statusCode = parseInt(code);
        return this;
    }

    /**
     * 发送数据
     * 参考express - res.send
     */
        send() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('send');
    }

    /**
     * 发送数据
     * 参考express - res.json
     */
        json() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('json');
    }

    /**
     * 渲染数据
     * 参考express - res.render
     */
        render() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('render');
    }

    /**
     * 渲染数据
     * 参考express - res.redirect
     */
        redirect() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('redirect');
    }

    /**
     * 下载数据
     * 参考express - res.download
     */
    download() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('download');
    }

    /**
     * 结束
     * 参考express - res.end
     */
    end() {
        var args = Array.prototype.slice.call(arguments, 0);
        this.setData(args);
        this.setMethod('end');
    }
}

module.exports = Response;