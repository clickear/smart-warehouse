!'use strict';
let homepageController = require('../../app/controller/back/HomepageController');
homepageController = ModelProxy(homepageController);
let router = require('express').Router();

router.get('/page', homepageController.homepage);

router.post('/backlog/confirm', homepageController.confirmReceipt);
router.post('/backlog/read', homepageController.readReceipt);

module.exports = router;
