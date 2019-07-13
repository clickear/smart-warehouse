!'use strict';
let CellController = require('../../../app/controller/back/base/CellController');
CellController = ModelProxy(CellController);
let router = require('express').Router();


router.get('/page', CellController.cellPage);
router.post('/list',CellController.List);
router.post('/list2',CellController.List2);
router.get('/add', CellController.addPage);
router.get('/addAll', CellController.addAllPage);
router.post('/save', CellController.createCell);
router.post('/saveAll', CellController.createCellAll);
router.post('/update', CellController.update);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
