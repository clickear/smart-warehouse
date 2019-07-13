/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.SETTLEMENT.DET.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.detail-settlement-hook',
        data: {
            account: {
                'orderNo':'',
                'customerName':'',
                'customerAddress':'',
                'customerPhone':'',
                'manufacturer':'',
                'manufacturerAddress':'',
                'manufacturerPhone':'',
                'deliveryStatus':'',
                'deliveryTime':'',
                'receiveTime':'',
                'palletTypemNum':'',
                'palletTypesNum':'',
                'palletTypeyNum':'',
                'palletTypeqNum':'',
                'cautionMoney': '' //保证金
            }

        },
        created: function () {
            IOT.getServerData(URI.SUPPLY.SETTLEMENT.DET.DATA, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    if($vue.$data.account.deliveryStatus == '0'){
                        $vue.$data.account.deliveryStatus= '未收货';
                    }else if($vue.$data.account.deliveryStatus == '1'){
                        $vue.$data.account.deliveryStatus='部分收货';
                    }else if($vue.$data.account.deliveryStatus == '2'){
                        $vue.$data.account.deliveryStatus='全部收货';
                    }else if($vue.$data.account.deliveryStatus == '3'){
                        $vue.$data.account.deliveryStatus='取消订单';
                    };
                    //收货时间
                    if($vue.$data.account.receiveTime == null){
                        $vue.$data.account.receiveTime="";
                    }else{
                        $vue.$data.account.receiveTime=new Date($vue.$data.account.receiveTime).Format('yyyy-MM-dd hh:mm:ss');
                    };
                    $vue.$data.account.deliveryTime =null  ? '' : new Date($vue.$data.account.deliveryTime).Format('yyyy-MM-dd hh:mm:ss');//收货时间

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
            IOT.getServerData(URI.RENT.RENTAL.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    /*  this.account.palletTypemCautionMoney =parseInt(this.account.palletTypemNum) *parseInt(ret.data.cautionMoney);*/
                    /*   this.account = $.extend({}, this.account, ret.data);*/
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        computed:{

            palletTypemRentMoney:function(){
                return parseInt(this.account.palletTypemNum)*parseFloat(this.account.cautionMoney);
            },
            palletTypesRentMoney:function(){
                return parseInt(this.account.palletTypesNum)*parseFloat(this.account.cautionMoney);
            },
            palletTypeyRentMoney:function(){
                return parseInt(this.account.palletTypeyNum)*parseFloat(this.account.cautionMoney);
            },
            palletTypeqRentMoney:function(){
                return parseInt(this.account.palletTypeqNum)*parseFloat(this.account.cautionMoney);
            },
            palletTotalRentMoney:function(){
                return parseInt(this.account.palletTypemNum)*parseFloat(this.account.cautionMoney)+parseInt(this.account.palletTypesNum)*parseFloat(this.account.cautionMoney)+parseInt(this.account.palletTypeyNum)*parseFloat(this.account.cautionMoney)+parseInt(this.account.palletTypeqNum)*parseFloat(this.account.cautionMoney);
            }

        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            contractManagement:function(){
                M.Page.emit(URI.SUPPLY.ORDER.DETAIL.CONTRACTMANAGEMENT.PAGE);
            }
        },
        mounted: function () {

        }
    });
})();




















