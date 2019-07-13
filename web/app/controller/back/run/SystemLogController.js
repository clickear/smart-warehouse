/**
 * Created by Administrator on 2017/11/16.
 */
'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let PoliciesService = require('../../../service/PoliciesService');
let logger = require('../../../util/LoggerUtil').logger('SystemLogController.js');

/**
 * 系统日志-页面
 */
module.exports.systemLogPage = function () {
    let response = new Response();
    response.render('back/run/system-log/system-log');
    this.resolve(response);
};
/**
 * 系统日志-列表
 */
module.exports.systemLogList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.getPolicies(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};