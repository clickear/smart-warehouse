'use strict';
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');
let CustomPageBean = require('../../model/CustomPageBean');
/**
 * demo-页面
 */
module.exports.demoPage = function () {
    let response = new Response();
    response.render('back/demo/demo');
    this.resolve(response);
};

/**
 * 列表
 */
module.exports.list = function () {
    let req = this.req;
    let restify = new RestifyProxy(this);
    let params = req.body;
    // restify.setUrl(StringUtil.formatGetRquestUri('/api/list', params))
    //     .setParameter(null)
    //     .get(function (result) {
    //         let response = new Response();
    //         response.send(new CustomPageBean(result));
    //         this.resolve(response);
    //     }.bind(this));

    var result = {
        data: {
            pageNum: 1,
            pageSize: 20,
            total: 50,
            pages: 5,
            code: 200,
            list: [
                {count: 41, address: '重庆1', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 72, address: '重庆2', datetime: '2017-11-11 12:11:10', money: '302'},
                {count: 13, address: '重庆3', datetime: '2017-11-11 12:11:10', money: '803'},
                {count: 14, address: '重庆4', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 15, address: '重庆5', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 16, address: '重庆6', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 21, address: '重庆7', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 12, address: '重庆8', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 11, address: '重庆9', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 13, address: '重庆0', datetime: '2017-11-11 12:11:10', money: '301'},
                {count: 91, address: '重庆1', datetime: '2017-11-11 12:11:10', money: '301'}
            ]
        }
    };

    let response = new Response();
    response.send(new CustomPageBean(result));
    this.resolve(response);
};
