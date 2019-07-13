'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let SupplierService = require('../../../service/agency/SupplierService');
let logger = require('../../../util/LoggerUtil').logger('SupplierController.js');
/**
 * 客户页面
 */
module.exports.supplierPage = function () {
    let response = new Response();
    response.render('back/agency/supplier/supplier');
    this.resolve(response);
};
/**
 * 客户列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await SupplierService.getSupplier(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/*
 * 保存
 */
module.exports.Save = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await SupplierService.createSupplier(this, params);
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
        let result = await SupplierService.updateSupplier(this, params);
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
        let result = await SupplierService.deleteSupplier(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
