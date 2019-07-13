!'use strict';
let GoodsTypeController = require('../../../app/controller/back/base/GoodsTypeController');
GoodsTypeController = ModelProxy(GoodsTypeController);
let router = require('express').Router();


router.get('/page', GoodsTypeController.Page);
router.post('/list',GoodsTypeController.List);
router.post('/list2',GoodsTypeController.List2);  //下拉框使用
router.get('/add', GoodsTypeController.typeAddPage);
router.post('/save',GoodsTypeController.createType);
router.post('/update',GoodsTypeController.update);
router.post('/delete',GoodsTypeController.delete);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
