'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let AreaService = require('../../../service/base/AreaService');
let logger = require('../../../util/LoggerUtil').logger('AreaController.js');
/**
 * 货区页面
 */
module.exports.areaPage = function () {
    let response = new Response();
    response.render('back/base/area/area');
    this.resolve(response);
};
/**
 * 货区列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.getArea(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 查找货区，下拉框使用
 */
module.exports.List2 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.getArea(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 查找areaItem列表，下拉框使用
 */
module.exports.List3 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.getAreaItem(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 新建货区页
 */
module.exports.addPage = function () {
    let response = new Response();
    response.render('back/base/area/create-area');
    this.resolve(response);
};

/**
 * 获取货区所属仓库信息
 */
module.exports.getWareHoseInfo = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.getWare(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/* 新建货区*/
module.exports.createArea = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.createArea(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/* 删除货区*/
module.exports.deleteArea = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.deleteArea(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/* 更新货区*/
module.exports.updateArea = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await AreaService.updateArea(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
