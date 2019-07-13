!'use strict';
let SupplierController = require('../../../app/controller/back/agency/SupplierController');
SupplierController = ModelProxy(SupplierController);
let router = require('express').Router();


router.get('/page', SupplierController.supplierPage);
router.post('/list',SupplierController.List);
router.post('/save', SupplierController.Save);
router.post('/update',SupplierController.Update);
router.post('/delete',SupplierController.Delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
