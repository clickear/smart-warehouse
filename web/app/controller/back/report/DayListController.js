'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let DayListService = require('../../../service/report/DayListService');
let logger = require('../../../util/LoggerUtil').logger('DayListController.js');
/**
 *  页面
 */
module.exports.Page = function () {
    let response = new Response();
    response.render('back/report/day-list/day-list');
    this.resolve(response);
};
/**
 * 列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await DayListService.List(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

