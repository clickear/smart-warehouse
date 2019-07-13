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

let InService = require('../../../service/finance/InService');
let logger = require('../../../util/LoggerUtil').logger('InController.js');

/**
 * 应收-页面
 */
module.exports.InPage = function () {
    let response = new Response();
    response.render('back/finance/in/in');
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
        let result = await InService.getList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 修改
 */
module.exports.Update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InService.update(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 删除
 */
module.exports.Delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InService.delete(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 保存
 */
module.exports.Insert = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InService.save(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

