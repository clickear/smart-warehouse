!'use strict';
let UpShelfController = require('../../../app/controller/back/task/UpShelfController');
UpShelfController = ModelProxy(UpShelfController);
let router = require('express').Router();


router.get('/page', UpShelfController.UpShelfPage);

router.post('/list', UpShelfController.UpShelfList);





module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */