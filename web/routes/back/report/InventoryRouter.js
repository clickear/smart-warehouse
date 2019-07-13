!'use strict';
let InventoryController = require('../../../app/controller/back/report/InventoryController');
InventoryController = ModelProxy(InventoryController);
let router = require('express').Router();


router.get('/page', InventoryController.inventoryPage);
router.get('/batch/page', InventoryController.batchInventoryPage);
router.get('/wanning/page', InventoryController.batchInventoryPage);
router.post('/list',InventoryController.inventoryList);
router.post('/batch/list',InventoryController.inventoryBatchList);
router.post('/warning/list',InventoryController.inventoryWarningList);
router.post('/report/list',InventoryController.inventoryReportList);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
