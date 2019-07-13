/**
 * Created by Administrator on 2017/12/6.
 */
/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
  /*  let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RELET.NEXT_CREATE_RELET.PAGE));*/
    let sureData = JSON.parse(IOT.getSessionStore(URI.RENT.RELET.NEXT_SURE_ORDER.PAGE));
    console.log(sureData);
    let $vue = null;
    Vue.filter('formatPrice', function(value) {
        if(isNaN(value)||value ==null){
            return '';
        }else{
            return "￥"+value+"元" ;
        }
    });
    $vue = new Vue({
        el: '.next-sure-relet-hook',
        data: {
            account: {
                'orderNo':'',         //订单号
                'confirmStatus':'',   //确认状态
                'leaseType':'',     //租赁类型
                'customerName':'',  //承租客户
                'customerAddress':'', //客户地址
                'customerPhone':'', //客户联系电话
                'companyName':'',  //出租单位
                'companyAddress':'',  //出租地址
                'companyPhone':'',  // 出租单位联系电话
                'firstSingle':'',  //是否客户首单
                'palletTypemNum':'',//木质托盘数量
                'palletTypesNum':'',//塑料托盘数量
                'palletTypeyNum':'',//压模托盘数量
                'palletTypeqNum':'',//其他托盘数量
                'palletQuantityM':'',
                'palletQuantityS':'',
                'palletQuantityY':'',
                'palletQuantityQ':'',
                'totalRental':'',//租金汇总
                'totalDeposit':'',//保证金汇总
                'totalCosts':'',//费用总计
                'placeOrderTime':'',//下单时间
                'confirmTime':'',   //确认时间
                'receiveTime':'',//收货时间
                'rentMoney': '', //租金
                'cautionMoney': '', //保证金
                'rentalCustomerName':'',
                'rentRange':'', //租赁时间
                'rentTime':''  //租期
            },
            returns:{
                'palletQuantityM':'',
                'palletQuantityS':'',
                'palletQuantityY':'',
                'palletQuantityQ':''
            }
        },
        created: function () {;
          /*  this.account = sureData;*/
            this.account = $.extend({}, this.account, sureData);
           this.returns.palletTypesNum = sureData.palletTypesNum -sureData.palletQuantityS;
            this.returns.palletTypemNum = sureData.palletTypemNum -sureData.palletQuantityM;
            this.returns.palletTypeqNum = sureData.palletTypeqNum -sureData.palletQuantityQ;
            this.returns.palletTypeyNum = sureData.palletTypeyNum -sureData.palletQuantityY;
           /* this.return.palletQuantityS = this.account.palletTypesNum -this.account.palletQuantityS;
            this.return.palletQuantityY = this.account.palletTypeyNum -this.account.palletQuantityY;
            this.return.palletQuantityQ = this.account.palletTypeqNum -this.account.palletQuantityQ;
*/
           /*
            IOT.getServerData(URI.RENT.RELET.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {

                    this.account = $.extend({}, this.account, ret.data);
                    $vue.$data.account.companyName = $vue.$data.account.storageCompany.companyName;
                    $vue.$data.account.companyAddress = $vue.$data.account.storageCompany.linkmanAddress;
                    $vue.$data.account.companyPhone = $vue.$data.account.storageCompany.linkmanPhone;
                    //租期类型
                    if($vue.$data.account.leaseType == '1'){
                        $vue.$data.account.leaseType="短租";
                    }else{
                        $vue.$data.account.leaseType="长租";
                    };
                    //确认时间
                    if($vue.$data.account.confirmTime == null){
                        $vue.$data.account.confirmTime="";
                    }else{
                        $vue.$data.account.confirmTime=new Date($vue.$data.account.confirmTime).Format('yyyy-MM-dd hh:mm:ss');
                    };
                    //下单时间
                    if($vue.$data.account.placeOrderTime == null){
                        $vue.$data.account.placeOrderTime="";
                    }else{
                        $vue.$data.account.placeOrderTime=new Date($vue.$data.account.placeOrderTime).Format('yyyy-MM-dd hh:mm:ss');
                    };
                    //收货时间
                    if($vue.$data.account.receiveTime == null){
                        $vue.$data.account.receiveTime="";
                    }else{
                        $vue.$data.account.receiveTime=new Date($vue.$data.account.receiveTime).Format('yyyy-MM-dd hh:mm:ss');
                    };
                    this.account.rentRange =this.account.leaseStartDateString+'至'+ this.account.leaseEndDateString ;
                    this.account.rentTime =parseInt((this.account.leaseEndDate-this.account.leaseStartDate)/24/60/60/1000)+'天';
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
            IOT.getServerData(URI.RENT.RENTAL.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });*/

        },
        computed:{
            totalRental:function(){          //合计租金详情
                return this.account.totalRental;
            },
            totalDeposit:function(){          //合计保证金详情
                /* return this.account.totalDeposit;*/
                return 0;
            },
            returnDeposits:function(){
                return this.account.totalCosts;
            },
            returnActuals:function(){
                return this.account.totalCosts;
            },
            totalCosts:function(){          //总费用详情
                return this.account.totalCosts;
            },
            palletTypemRentMoney:function(){
                return  Math.round((parseInt(this.account.palletTypemNum)*parseFloat(this.account.rentMoney)) * 100) / 100;
            },
            palletTypemCautionMoney:function(){
                return 0;
                /*  return   Math.round((parseInt(this.account.palletTypemNum)*parseFloat(this.account.cautionMoney))* 100) / 100 ;*/
            },
            palletTypesRentMoney:function(){
                return   Math.round((parseInt(this.account.palletTypesNum)*parseFloat(this.account.rentMoney))* 100) / 100 ;
            },
            palletTypesCautionMoney:function(){
                return 0;
                /* return   Math.round((parseInt(this.account.palletTypesNum)*parseFloat(this.account.cautionMoney))* 100) / 100 ;*/
            },
            palletTypeyRentMoney:function(){
                return  Math.round((parseInt(this.account.palletTypeyNum)*parseFloat(this.account.rentMoney))* 100) / 100 ;
            },
            palletTypeyCautionMoney:function(){
                return 0;
                /*  return   Math.round((parseInt(this.account.palletTypeyNum)*parseFloat(this.account.cautionMoney))* 100) / 100 ;*/
            },
            palletTypeqRentMoney:function(){
                return  Math.round((parseInt(this.account.palletTypeqNum)*parseFloat(this.account.rentMoney))* 100) / 100 ;
            },
            palletTypeqCautionMoney:function(){
                return 0;
                /*  return  Math.round((parseInt(this.account.palletTypeqNum)*parseFloat(this.account.cautionMoney))* 100) / 100 ;*/
            },

        },
        methods: {
            cancleBack:function () {
                M.Page.emitPrePage();
            },
            sureOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;续租确认后托盘租赁有效期将按照续租时间进行延长，是否确认订单续租？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_CONFIRM, {orderLeaseId: orderData.orderLeaseId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
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
            }
        },
        mounted: function () {

        }
    });
})();