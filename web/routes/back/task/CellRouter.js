!'use strict';
let CellController = require('../../../app/controller/back/task/CellController');
CellController = ModelProxy(CellController);
let router = require('express').Router();


router.get('/page', CellController.CellPage);

router.get('/bar/page', CellController.BarPage);





module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */