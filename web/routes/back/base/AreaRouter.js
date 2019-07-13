!'use strict';
let AreaController = require('../../../app/controller/back/base/AreaController');
AreaController = ModelProxy(AreaController);
let router = require('express').Router();


router.get('/page', AreaController.areaPage);
router.post('/list',AreaController.List);    //页面使用
router.post('/list2',AreaController.List2);  //下拉框使用
router.post('/list3',AreaController.List3);  //下拉框使用(获取areaItem)
router.get('/add',AreaController.addPage);
router.post('/getWare',AreaController.getWareHoseInfo);
router.post('/delete',AreaController.deleteArea);
router.post('/save',AreaController.createArea);
router.post('/update',AreaController.updateArea);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
