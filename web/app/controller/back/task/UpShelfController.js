/**
 * Created by Administrator on 2017/11/20.
 */
/**
 * Created by Administrator on 2017/11/16.
 */
'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');

let upShelfService = require('../../../service/task/upShelfService');
let logger = require('../../../util/LoggerUtil').logger('UpShelfController.js');

/**
 * -页面
 */
module.exports.UpShelfPage = function () {
    let response = new Response();
    response.render('back/task/up-shelf/up-shelf');
    this.resolve(response);
};

/**
 * 列表
 */
module.exports.UpShelfList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await upShelfService.getList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};





