'use strict';
var restify = require('restify'),
    StatusCode = require('../model/StatusCode'),
    logger = require('./LoggerUtil').logger('Restify'),
    DateUtil = require('./DateUtil'),
    StringUtil = require('./StringUtil'),
    webservice = require('../../config').app.webservice,
    client = restify.createJSONClient(webservice),
    request = require('request');

function Restify () {
    this._url = null;
    this._token = null;
    this._params = null;
    this._formData = null;
    this._headers = null;
}

Restify.prototype = {
    setUrl: function (url, override) {
        this._url = !!override ? url : webservice.ver + url;
        return this;
    },
    setToken: function (token) {
        this._token = token;
        return this;
    },
    setHeaders: function (headers) {
        this._headers = StringUtil.extend(true, {}, this._headers, headers);
        return this;
    },
    /**
     * 向headers中添加指定属性
     * @param key
     * @param value
     * @returns {Restify}
     */
    setHeader: function (key, value) {
        var temp = {};
        temp[key] = value;
        this._headers = StringUtil.extend(true, {}, this._headers, temp);
        return this;
    },
    /**
     * 移除headers中的指定属性
     * @param key
     * @returns {Restify}
     */
    removeHeader: function (key) {
        this._headers && (delete this._headers[key]);
        return this;
    },
    setParameter: function (params) {
        this._params = params;
        return this;
    },
    /**
     * 文件上传 - 文件表单
     * @param formData
     * @returns {Restify}
     */
    setFormData: function (formData) {
        this._formData = formData;
        return this;
    },
    _request: function (method, cb) {
        var host = webservice.url;
        var thiz = this,
            args = [];
        logger.debug([
            'RESTful API request',
            'Method: ' + method.toUpperCase(),
            `Path: ${host}${thiz._url}`,
            'Params: ' + JSON.stringify(thiz._params),
            'Token: ' + thiz._token
        ].join(' | '));
        var watch = DateUtil.getStopWatch((thiz._url || '').split('?')[0]);
        var _cb = function (err, req, res, data) {
            logger.info(watch.stop().toString());
            if (err) {
                thiz._onError(method, thiz._url, err, cb);
            } else {
                res.headers['session-token'] && (data['access-token'] = res.headers['session-token']);
                thiz._onSuccess(data, cb);
            }
        };
        var option = {
            method: method,
            headers: StringUtil.extend(true, this._headers, {'access-token': thiz._token}),
            path: encodeURI(thiz._url)
        };
        args.push(option);
        !!(thiz._params) && args.push(thiz._params);
        args.push(_cb);
        client[method].apply(client, args);
    },
    _onError: function (method, uri, err, cb) {
        if (err.statusCode) {
            var msg = err.msg || err.message || (err.body && err.body.msg);
            logger.error('Error happened when excute %s method - code: %d. Error message: %s', method, err.statusCode, msg);
            cb({code: StatusCode.API_ERROR.code, msg: '远程服务器发生错误，数据操作失败！', statusCode: err.statusCode});
        } else if (err.code) {
            logger.error('[%s] - %s - problem with request: %s', method, uri, err.message);
            var ret = {code: StatusCode.API_ERROR.code, msg: err.message};
            if (err.code === 'ECONNREFUSED' || err.code === 'read ECONNRESET') {
                ret.errmsg = ret.msg;
                ret.msg = '远程服务器连接错误！';
            }
            cb(ret);
        }
    },
    _onSuccess: function (data, cb) {
        logger.debug('Response data: %s', JSON.stringify(data));
        cb(data);
    },
    get: function (cb) {
        this._request('get', cb);
    },
    post: function (cb) {
        this._request('post', cb);
    },
    del: function (cb) {
        this._request('del', cb);
    },
    put: function (cb) {
        this._request('put', cb);
    },
    /**
     * 上传文件
     * @param cb
     */
    uploadFile: function (callback) {
        var host = webservice.url;
        logger.debug([
            'RESTful API request',
            'FileUpload',
            `Path: ${host}${this._url}`,
            'FormData: ' + JSON.stringify(this._formData),
            'Token: ' + this._token
        ].join(' | '));
        var stopWatch = DateUtil.getStopWatch(this._url || '');
        var options = {
            url: host + this._url,
            formData: this._formData,
            headers: {
                'Accept': 'application/json',
                'access-token': this._token
            }
        };
        request.post(options, function (err, httpResponse, data) {
            logger.info(stopWatch.stop().toString());
            if (err || httpResponse.statusCode !== 200) {
                logger.error('文件上传失败！%s', (err && err.message) || httpResponse.statusCode);
                logger.error('data:', data);
                callback({code: StatusCode.API_ERROR.code, msg: '文件上传失败！'});
            } else {
                callback(JSON.parse(data));
                logger.info('data:', data);
            }
        });

    }
};

module.exports = Restify;