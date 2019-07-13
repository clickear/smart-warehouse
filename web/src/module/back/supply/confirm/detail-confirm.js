/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.CONFIRM.DETAIL.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.detail-confirm-hook',
        data: {
            account: {
                'orderNo':'',
                'customerName':'',
                'customerAddress':'',
                'customerPhone':'',
                'manufacturer':'',
                'manufacturerAddress':'',
                'manufacturerPhone':'',
                'palletTypemNum':'',
                'palletTypesNum':'',
                'palletTypeyNum':'',
                'palletTypeqNum':'',
                'deliveryAddress':'',
                'deliveryTime':'',
                'deliveryUser':'',
                'deliveryPhone':'',
                'remark':''
            }

        },
        created: function () {
            IOT.getServerData(URI.SUPPLY.CONFIRM.DETAIL.DATA, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    if($vue.$data.account.placeOrderTime == null){
                        $vue.$data.account.placeOrderTime="";
                    }else{
                        $vue.$data.account.placeOrderTime=new Date($vue.$data.account.placeOrderTime).Format('yyyy-MM-dd hh:mm:ss');
                    }
                    $vue.$data.account.deliveryTime = null ? "" : new Date($vue.$data.account.deliveryTime).Format('yyyy-MM-dd hh:mm:ss');//收货时间

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        computed: {

            totalRental: function () {          //合计租金详情
                return this.account.totalRental;
            },
            totalDeposit: function () {          //合计保证金详情
                return this.account.totalDeposit;
            },
            totalCosts: function () {          //总费用详情
                return this.account.totalCosts;
            },
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            sureOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.SUPPLY.CONFIRM.DETAIL.ORDER_CONFIRM, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        console.log(ret.data);
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function(){
                    //取消
                });
            },
            contractManagement:function(){
                let params = $vue.$data.account.orderNo;
                M.Page.emit(URI.SUPPLY.CONFIRM.DETAIL.CONTRACTMANAGEMENT.PAGE);
                IOT.setSessionStore(URI.SUPPLY.CONFIRM.DETAIL.CONTRACTMANAGEMENT.PAGE, JSON.stringify(params));
            }
        },
        mounted: function () {

        }
    });
})();




















