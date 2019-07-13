!'use strict';
let PrepareTaskController = require('../../../app/controller/back/task/PrepareTaskController');
PrepareTaskController = ModelProxy(PrepareTaskController);
let router = require('express').Router();


router.get('/page', PrepareTaskController.page);

router.post('/list', PrepareTaskController.list);
router.post('/insert', PrepareTaskController.insert);





module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */