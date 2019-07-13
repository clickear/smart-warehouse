/**
 * Created by Administrator on 2017/10/26.
 */
/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
// import $ from 'jQuery';
// (function () {
//     let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.ALLOCATION.DETAIL.SUREORDER.PAGE));
//     let $vue = null;
//     Vue.filter('formatPrice', function(value) {
//         if(isNaN(value)||value ==null){
//             return '';
//         }else{
//             return "￥"+value+"元" ;
//         }
//     });
//     let $tree = null;
//     $vue = new Vue({
//         el: '.next-sure-order-hook',
//         data: {
//             info:{
//                 'orderNo': '',         //订单号
//                 'placeOrderUser': '',//下单人
//                 'confirmStatus': '',   //确认状态
//                 'leaseType': '',     //租赁类型
//                 'customerName': '',  //承租客户
//                 'customerAddress': '', //客户地址
//                 'customerPhone': '', //客户联系电话
//                 'firstSingle': '',  //是否客户首单
//                 'pickupMode': '', //取货方式
//                 'pickupAddress': '', //取货地址
//                 'totalQuantity':'', //托盘总数
//                 'palletTypemNum': '',//木质托盘数量
//                 'palletTypesNum': '',//塑料托盘数量
//                 'palletTypeyNum': '',//压模托盘数量
//                 'palletTypeqNum': '',//其他托盘数量
//                 'totalRental': '',//租金汇总
//                 'totalDeposit': '',//保证金汇总
//                 'totalCosts': '',//费用总计
//                 'placeOrderTime': '',//下单时间
//                 'receiveTime': '',//收货时间
//                 'rentMoney': '', //租金
//                 'cautionMoney': '', //保证金
//                 'remark':'' ,//备注信息
//                 'address':'',
//                 'storageId':''
//             },
//         },
//         methods: {
//
//             prevStep:function(){
//                 M.Page.emitPrePage();
//             },
//             selectCompanyTree:function(){
//                 layer.open({
//                     type:1,
//                     title:'选择派发地市',
//                     shadeClose:true,
//                     resize:false,
//                     shade:0.4,
//                     area:['300px','400px'],
//                     skin: 'layui-layer-rim',
//                     content:$('.zTreeDemoBackground') ,
//                     success:function () {
//                         var setting = {
//
//                             data: {
//                                 simpleData: {
//                                     enable: true,
//                                     idKey: 'id',
//                                     pIdKey: 'pid',
//                                     rootPId: 0
//                                 }
//                             },
//                             view:{
//                                 selectedMulti: false,//不允许同时选中多个节点
//                                 showIcon :false,
//                                 showLine:false,
//                                 addDiyDom: function addDiyDom(treeId, treeNode){
//                                     var sObj = $("#" + treeNode.tId + "_a");
//                                     var addStr = "<span class='pallent_span'>托盘数："+treeNode.palletCount+"</span>";
//                                     sObj.append(addStr);
//                                 }
//                             },
//                             callback: {
//                                 onClick:function onCheckTreeNode(event, treeId, treeNode){
//                                     if (treeNode.isParent) {
//                                         layer.alert('请选择具体仓库网点');
//                                         return false;
//                                     }else if(Number(treeNode.palletCount)<Number($vue.$data.info.totalQuantity)){
//                                         layer.alert('该仓库网点的托盘数小于需租赁的托盘总数');
//                                         return false;
//                                     }else{
//                                         $('#address').val(treeNode.name);
//                                         $('#total-amount').val("托盘数："+treeNode.palletCount+"")
//                                         $('#company-name').val(treeNode.companyName);
//                                         $vue.$data.info.storageId = treeNode.resourceId;
//                                         layer.closeAll();
//                                     }
//                                 }
//                             }
//                         };
//                         IOT.getServerData(URI.RENT.ALLOCATION.DETAIL.SUREORDER.STORAGE_TREE, {}, (ret) => {
//                             if (ret.code === 200) {
//                                 let treeList = ret.data;
//                                 $tree = $.fn.zTree.init($('#company_zTree'), setting, treeList);
//                                 $tree.expandAll(true);
//                             } else {
//                                 IOT.tips(ret.msg, 'error');
//                             }
//                         });
//                     },
//                     end:function(){
//
//                     }
//                 })
//
//             },
//             submitOrders:function(){
//
//                 if($('#company-name').val() == ""){
//                     layer.alert('供货单位不能为空!');
//                     return false;
//                 }
//                 IOT.showOverlay('保存中，请稍等...');
//                 IOT.getServerData(URI.RENT.ALLOCATION.DETAIL.SUREORDER.ALLOCATION_CONFIRM,{orderNo: infoData.orderNo,storageId:$vue.$data.info.storageId}, (ret) => {
//                     IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
//                     IOT.hideOverlay();
//                     console.log(ret.data);
//                     if (ret && ret.code === 200) {
//                         IOT.tips('保存成功！', 'success');
//                         layer.closeAll();
//                         M.Table.refresh.all();
//                         M.Page.emitPrePage();
//                         M.Page.emitPrePage();
//
//                     } else {
//                         IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
//                     }
//                 });
//                 return false;
//             }
//         },
//         computed:{
//         },
//         created: function () {
//             this.info=infoData;
//         },
//         mounted: function () {
//         }
//     });
// })();





















