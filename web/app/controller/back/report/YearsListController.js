'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let YearsListService = require('../../../service/report/YearsListService');
let logger = require('../../../util/LoggerUtil').logger('YearsListController.js');
/**
 *  页面
 */
module.exports.Page = function () {
    let response = new Response();
    response.render('back/report/years-list/years-list');
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
        let result = await YearsListService.List(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

