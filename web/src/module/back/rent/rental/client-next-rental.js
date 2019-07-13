require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.CLIENT_NEXT_RENTAL.PAGE));
    let $vue = null;
    Vue.filter('formatPrice', function(value) {
        return "￥"+value+"元" ;
    });
    $vue = new Vue({
        el: '.next-rental-hook',
        data: {
            info:{
                customerAddress:'',
                customerPhone:'',
                palletTypemNum:'',
                palletTypesNum:'',
                palletTypeyNum:'',
                palletTypeqNum:'',
                orderCount:'',
                deliveryAddress:'',
                remark:'',
                deliveryUser:'',
                deliveryPhone:'',
            /*    rentMoney: '', //租金
                cautionMoney: '', //保证金*/
                totalRental:'', //租金汇总
                totalDeposit:'', //保证金汇总
                totalCosts:'', //费用总计
                pickupMode:'',//取货方式
                paymentMethod:''//付费方式
            },
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            prevStep:function(){
                M.Page.emitPrePage();
            }
        },
       created: function () {
            this.info=infoData;
            /*this.info.paymentMethod =1;*/
        },
        computed:{
            totalRental:function(){
                return this.info.totalRental;
            },
            totalDeposit:function(){
                return this.info.totalDeposit;
            },
            totalCosts:function(){
                return this.info.totalCosts;
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.next-create-rental-form').validate({
                    debug: true,
                    rules: {

                    },
                    submitHandler: function (form) {
                        if($("input[name='paymentMethod']:checked").length==0){
                            layer.alert('请选择一种付款方式');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        IOT.getServerData(URI.RENT.RENTAL.CLIENT_NEXT_RENTAL.SAVE,params, function (ret) {
                            IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                M.Table.refresh.all();
                                M.Page.emitPrePage();
                            } else {
                                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            }
                        });
                        return false;
                    }
                });
            })
        }
    });
})();