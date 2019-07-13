!'use strict';
let demoController = require('../../app/controller/back/DemoController');
demoController = ModelProxy(demoController);
let router = require('express').Router();

router.get('/', demoController.demoPage);

router.post('/list', demoController.list);

module.exports = router;
