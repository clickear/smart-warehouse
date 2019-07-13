!'use strict';
let backController = require('../../app/controller/back/BackController');
backController = ModelProxy(backController);
let router = require('express').Router();

// 首页（注意：是后台-首页）
let homepageRouter = require('./HomepageRouter');
router.use('/homepage', homepageRouter);



// 单据详情查询
let billDetailRouter = require('./bill/BillDetailRouter');
router.use('/billDetail', billDetailRouter);

// 入库单据查询
let billInRouter = require('./bill/BillInRouter');
router.use('/billIn', billInRouter);
// 出库单据查询
let billOutRouter = require('./bill/BillOutRouter');
router.use('/billOut', billOutRouter);
// 移库单据查询
let billRemoveRouter = require('./bill/BillRemoveRouter');
router.use('/billRemove', billRemoveRouter);
// 报损库单据查询
let billDamageRouter = require('./bill/BillDamageRouter');
router.use('/billDamage', billDamageRouter);
// 调拨库单据查询
let billAllotRouter = require('./bill/BillAllotRouter');
router.use('/billAllot', billAllotRouter);
// 盘点库单据查询
let billCheckRouter = require('./bill/BillCheckRouter');
router.use('/billCheck', billCheckRouter);

// 货主
let itemMasterRouter = require('./base/ItemMasterRouter');
router.use('/itemMaster', itemMasterRouter);
// 仓库
let warehouseRouter = require('./base/WarehouseRouter');
router.use('/warehouse', warehouseRouter);
// 货位
let areaRouter = require('./base/AreaRouter');
router.use('/area', areaRouter);
// 货架
let shelfRouter = require('./base/ShelfRouter');
router.use('/shelf', shelfRouter);
// 货位
let cellRouter = require('./base/CellRouter');
router.use('/cell', cellRouter);
// 物料
let itemRouter = require('./base/ItemRouter');
router.use('/item', itemRouter);
// 物料种类
let GoodsTypeRouter = require('./base/GoodsTypeRouter');
router.use('/goodsType', GoodsTypeRouter);
// 托盘管理
let PlletRouter = require('./base/PlletRouter');
router.use('/pllet', PlletRouter);
// 单位设置
let UnitRouter = require('./base/UnitRouter');
router.use('/unit', UnitRouter);
// 客户管理
let ClientRouter = require('./agency/ClientRouter');
router.use('/agency/client', ClientRouter);
// 供应商管理
let SupplierRouter = require('./agency/SupplierRouter');
router.use('/agency/supplier', SupplierRouter);

// 财务类型
let TypeRouter = require('./finance/TypeRouter');
router.use('/financeType', TypeRouter);
// 财务收
let InRouter = require('./finance/InRouter');
router.use('/financeIn', InRouter);
// 财务付
let OutRouter = require('./finance/OutRouter');
router.use('/financeOut', OutRouter);
// 财务报表
let ReportRouter = require('./finance/ReportRouter');
router.use('/financeReport', ReportRouter);





// // 采购入库
// let BuyRouter = require('./business/BuyRouter');
// router.use('/buy',BuyRouter);
// // 采购退货
// let BuyReturnRouter = require('./business/BuyReturnRouter');
// router.use('/buyReturn', BuyReturnRouter);
// // 销售
// let SellRouter = require('./business/SellRouter');
// router.use('/sell', SellRouter);
// // 销售退货
// let SellReturnRouter = require('./business/SellReturnRouter');
// router.use('/sellReturn', SellReturnRouter);


// 库存查询
let InventoryRouter = require('./report/InventoryRouter');
router.use('/inventory', InventoryRouter);
// 货区信息
let AreaItemRouter = require('./report/AreaItemRouter');
router.use('/areaItem', AreaItemRouter);

// 货位一览
let CellRouter = require('./task/CellRouter');
router.use('/task/cell', CellRouter);

// 上架
let UpShelfRouter = require('./task/UpShelfRouter');
router.use('/upShelf', UpShelfRouter);


// 日报表信息
let DayListRouter = require('./report/DayListRouter');
router.use('/report/dayList', DayListRouter);
// 年报表信息
let YearsListRouter = require('./report/YearsListRouter');
router.use('/report/yearsList', YearsListRouter);
// 月报表信息
let MoonListRouter = require('./report/MoonListRouter');
router.use('/report/moonList', MoonListRouter);


// 拣货
let PrepareTaskRouter = require('./task/PrepareTaskRouter');
router.use('/task/prepareTask', PrepareTaskRouter);



// 设备管理
let deviceRouter = require('./device/DeviceRouter');
router.use('/device', deviceRouter);





// 运营管理
let runRouter = require('./run/RunRouter');
router.use('/run', runRouter);

// 组织机构
let organizationRouter = require('./organization/OrganizationRouter');
router.use('/organization', organizationRouter);

// 系统参数
let systemRouter = require('./system/SystemRouter');
router.use('/system', systemRouter);

// demo
let demoRouter = require('./DemoRouter');
router.use('/demo', demoRouter);

// 个人信息
let memberCenterRouter = require('./MemberCenterRouter');
router.use('/memberCenter', memberCenterRouter);

// 消息管理
let MessageBacklogRouter = require('./MessageBacklogRouter');
router.use('/messageBacklog', MessageBacklogRouter);
// 咨询管理
let CustomerServiceRouter = require('./CustomerServiceRouter');
router.use('/customerService', CustomerServiceRouter);
// 在线客服
let AverageUserController = require('./AverageUserRouter');
router.use('/averageUser',AverageUserController);
// 帮助中心
let helpRouter = require('./helpRouter');
router.use('/help', helpRouter);
// 后台主页
router.get('/', backController.backPage);

module.exports = router;
