'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let MoonListService = require('../../../service/report/MoonListService');
let logger = require('../../../util/LoggerUtil').logger('MoonListController.js');
/**
 *  页面
 */
module.exports.Page = function () {
    let response = new Response();
    response.render('back/report/moon-list/moon-list');
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
        let result = await MoonListService.List(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

