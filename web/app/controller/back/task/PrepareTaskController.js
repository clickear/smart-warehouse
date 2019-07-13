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

let prepareTaskService = require('../../../service/task/prepareTaskService');
let logger = require('../../../util/LoggerUtil').logger('PrepareTaskService.js');

/**
 * -页面
 */
module.exports.page = function () {
    let response = new Response();
    response.render('back/task/prepare-task/prepare-task');
    this.resolve(response);
};

/**
 * 列表
 */
module.exports.list = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await prepareTaskService.list(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 列表
 */
module.exports.insert = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await prepareTaskService.insert(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};





