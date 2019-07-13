!'use strict';
let ItemController = require('../../../app/controller/back/base/ItemController');
ItemController = ModelProxy(ItemController);
let router = require('express').Router();


router.get('/page', ItemController.itemPage);
router.post('/list',ItemController.List);
router.post('/list2',ItemController.List2);
router.get('/add', ItemController.itemAddPage);
router.post('/save',ItemController.createItem);
router.post('/update',ItemController.updateItem);
router.post('/delete',ItemController.deleteItem);
router.post('/batch/list',ItemController.ItemBatchList);
router.post('/itemBatch/list',ItemController.batch);





module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
