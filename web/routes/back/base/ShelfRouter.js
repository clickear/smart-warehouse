!'use strict';
let ShelfController = require('../../../app/controller/back/base/ShelfController');
ShelfController = ModelProxy(ShelfController);
let router = require('express').Router();


router.get('/page', ShelfController.shelfPage);
router.post('/list',ShelfController.List);  //页面使用
router.post('/list2',ShelfController.List2);  //下拉框使用
router.get('/add', ShelfController.addPage);
router.post('/save',ShelfController.createShelf);
router.post('/delete',ShelfController.deleteShelf);
router.post('/update',ShelfController.updateShelf);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
