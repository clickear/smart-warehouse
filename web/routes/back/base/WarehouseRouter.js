!'use strict';
let WarehouseController = require('../../../app/controller/back/base/WarehouseController');
WarehouseController = ModelProxy(WarehouseController);
let router = require('express').Router();


router.get('/page', WarehouseController.warehousePage);
router.post('/list',WarehouseController.List);
router.post('/save',WarehouseController.createWare);
router.get('/add', WarehouseController.wareAddPage);
router.post('/update', WarehouseController.updateWare);
router.post('/delete', WarehouseController.deleteWare);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
