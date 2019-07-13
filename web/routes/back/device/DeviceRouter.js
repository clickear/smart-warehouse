!'use strict';
 
let router = require('express').Router();






// 设备
let DeviceInfoRouter = require('./DeviceInfoRouter');
router.use('/info', DeviceInfoRouter);

// 单品
let DeviceSingleRouter = require('./DeviceSingleRouter');
router.use('/single', DeviceSingleRouter);


// 检查项目
let CheckProjectRouter = require('./CheckProjectRouter');
router.use('/project', CheckProjectRouter);

// 检查内容
let CheckContentRouter = require('./CheckContentRouter');
router.use('/content', CheckContentRouter);

// 检查结果
let CheckResultRouter = require('./CheckResultRouter');
router.use('/result', CheckResultRouter);

// 检查
let CheckMasterRouter = require('./CheckMasterRouter');
router.use('/master', CheckMasterRouter);

// 检查
let CheckDetailRouter = require('./CheckDetailRouter');
router.use('/detail', CheckDetailRouter);
 

module.exports = router;
