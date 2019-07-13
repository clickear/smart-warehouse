!'use strict';
let ItemMasterController = require('../../../app/controller/back/base/ItemMasterController');
ItemMasterController = ModelProxy(ItemMasterController);
let router = require('express').Router();


router.get('/page', ItemMasterController.itemMasterPage);
router.post('/list',ItemMasterController.List);
router.post('/save',ItemMasterController.create);

router.post('/update', ItemMasterController.update);
router.post('/delete', ItemMasterController.delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
