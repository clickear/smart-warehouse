/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {

    let orderData = JSON.parse(IOT.getSessionStore(URI.RUN.PATCH_ALLOCATION.DETAIL.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            account: {
                // 'orderNo': '',         //订单号
                // 'placeOrderUser': '',//下单人
                // 'confirmStatusValue': '',   //确认状态
                // 'leaseType': '',     //租赁类型
                // 'customerName': '',  //承租客户
                // 'customerAddress': '', //客户地址
                // 'customerPhone': '', //客户联系电话
                // 'companyName':'',  //出租单位
                // 'companyAddress':'',  //出租地址
                // 'companyPhone':'',  // 出租单位联系电话
                // 'firstSingle': '',  //是否客户首单
                // 'pickupMode': '', //取货方式
                // 'pickupAddress': '', //取货地址
                // 'palletTypemNum': '',//木质托盘数量
                // 'palletTypesNum': '',//塑料托盘数量
                // 'palletTypeyNum': '',//压模托盘数量
                // 'palletTypeqNum': '',//其他托盘数量
                // 'totalRental': '',//租金汇总
                // 'totalDeposit': '',//保证金汇总
                // 'totalCosts': '',//费用总计
                // 'placeOrderTime': '',//下单时间
                // 'receiveTime': '',//收货时间
                // 'confirmTime':'',//确认时间
                // 'rentMoney': '', //租金
                // 'cautionMoney': '', //保证金
                // 'rentalCustomerName':'',
                // 'rentRange':'', //租赁时间
                // 'rentTime':''  //租期
            }
        },
        created: function () {
            // IOT.getServerData(URI.RENT.RENTAL.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
            //     if (ret.code === 200) {
            //         this.account = $.extend({}, this.account, ret.data);
            //         $vue.$data.account.companyName = $vue.$data.account.storageCompany.companyName;
            //         $vue.$data.account.companyAddress = $vue.$data.account.storageCompany.linkmanAddress;
            //         $vue.$data.account.companyPhone = $vue.$data.account.storageCompany.linkmanPhone;
            //         //取货方式
            //         if($vue.$data.account.pickupMode == '1'){
            //             $vue.$data.account.pickupMode="上门自取";
            //         }else{
            //             $vue.$data.account.pickupMode="送货上门";
            //         };
            //         //是否首单
            //         if($vue.$data.account.firstSingle == '0'){
            //             $vue.$data.account.firstSingle="";
            //         }else{
            //             $vue.$data.account.firstSingle="客户首单";
            //         };
            //         //租期类型
            //         if($vue.$data.account.leaseType == '1'){
            //             $vue.$data.account.leaseType="短租";
            //         }else{
            //             $vue.$data.account.leaseType="长租";
            //         };
            //         //确认时间
            //         if($vue.$data.account.confirmTime == null){
            //             $vue.$data.account.confirmTime="";
            //         }else{
            //             $vue.$data.account.confirmTime=new Date($vue.$data.account.confirmTime).Format('yyyy-MM-dd hh:mm:ss');
            //         };
            //         //下单时间
            //         if($vue.$data.account.placeOrderTime == null){
            //             $vue.$data.account.placeOrderTime="";
            //         }else{
            //             $vue.$data.account.placeOrderTime=new Date($vue.$data.account.placeOrderTime).Format('yyyy-MM-dd hh:mm:ss');
            //         };
            //         //收货时间
            //         if($vue.$data.account.receiveTime == null){
            //             $vue.$data.account.receiveTime="";
            //         }else{
            //             $vue.$data.account.receiveTime=new Date($vue.$data.account.receiveTime).Format('yyyy-MM-dd hh:mm:ss');
            //         };
            //         this.account.rentRange =this.account.leaseStartDateString+'至'+ this.account.leaseEndDateString ;
            //         this.account.rentTime =parseInt((this.account.leaseEndDate-this.account.leaseStartDate)/24/60/60/1000)+'天';
            //
            //     } else {
            //         IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
            //     }
            // });
            // IOT.getServerData(URI.RENT.RENTAL.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
            //     if (ret.code === 200) {
            //         this.account = $.extend({}, this.account, ret.data);
            //     } else {
            //         IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
            //     }
            // });

        },
        computed:{
        },
        methods: {
            allocation:function(){
                M.Page.emit(URI.RUN.PATCH_ALLOCATION.DETAIL.CONFIRM.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.PATCH_ALLOCATION.DETAIL.CONFIRM.PAGE, JSON.stringify(params));
            },
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            exportOrder:function(){
                IOT.showOverlay('正在导出，请稍等...');
                IOT.getServerData(URI.RENT.RENTAL.DETAIL.EXPORT,{orderNo: orderData.orderNo}, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        window.location.href = ret.data.substr(1);
                        IOT.tips('导出完成！', 'success');
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                return false;
            },
            printOrder:function(){
                window.print();
                /*  $(".inner-wrapper").printArea();*/
            },
        },
        mounted: function () {

        }
    });
})();