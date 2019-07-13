!'use strict';
let homeController = require('../app/controller/HomeController');
homeController = ModelProxy(homeController);

let consultController = require('../app/controller/ConsultController');
consultController = ModelProxy(consultController);

let router = require('express').Router();

router.get('/', homeController.homePage);
router.get('/index', homeController.homePage);

router.get('/product', homeController.productPage);

router.get('/discounts', homeController.discountsPage);

router.get('/discounts/:id', homeController.discountsDetailPage);

// 新增咨询
router.post('/consult/create/save', consultController.createConsult);

module.exports = router;
