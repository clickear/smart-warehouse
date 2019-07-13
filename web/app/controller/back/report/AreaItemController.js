'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let AreaItemService = require('../../../service/report/AreaItemService');
let logger = require('../../../util/LoggerUtil').logger('AreaItemController.js');
/**
 * 库存查询页面
 */
module.exports.Page = function () {
    let response = new Response();
    response.render('back/report/area-item/area_item');
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
        let result = await AreaItemService.getAreaItem(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


