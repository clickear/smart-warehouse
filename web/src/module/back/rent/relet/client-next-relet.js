/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RELET.NEXT_CREATE_RELET.PAGE));
    let $vue = null;
    var flag;
    flag=0;
    Vue.filter('formatPrice', function(value) {
        return "￥"+value+"元" ;
    });

    $vue = new Vue({
        el: '.next-relet-hook',
        data: {
            account: {
                orderNo: '',         //订单号
                confirmStatus: '',   //确认状态
                leaseType: '',     //租赁类型
                customerName: '',  //承租客户
                customerAddress: '', //客户地址
                customerPhone: '', //客户联系电话
                companyName:'',  //出租单位
            /*    customerId:'',*/
                companyAddress:'',  //出租地址
                companyPhone:'',  // 出租单位联系电话
                firstSingle: '',  //是否客户首单
                palletTypemNum: '0',//木质托盘数量
                palletTypesNum: '',//塑料托盘数量
                palletTypeyNum: '0',//压模托盘数量
                palletTypeqNum: '0',//其他托盘数量
              /*  palletQuantityM: '0',//
                palletQuantityS: '',//
                palletQuantityY: '0',//
                palletQuantityQ: '0',//*/
                totalRental: '',//租金汇总
                totalDeposit: '',//保证金汇总
                totalCosts: '',//费用总计
                rentMoney: '', //租金
                cautionMoney: '', //保证金
                leaseStartDate:'',
                leaseEndDate:'',
                leaseRentDate:'',
                rentalCustomerName:'',
                remark:'',
                renewalMode:'1'
            },
            oldInfo:{},
            items:[]
        },
        created: function () {
           /* this.account=orderData;*/
            IOT.getServerData(URI.RENT.RELET.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    /*    ret.data.confirmStatus = '0' ? '未确认' : '已确认';  //确认状态*/

                    ret.data.leaseStartDate = new Date(orderData.leaseEndDate).Format('yyyy-MM-dd');
                    let endDate = new Date(orderData.leaseEndDate);
                    /* ret.data.leaseEndDate = new Date().Format('yyyy-MM-dd');*/
                    this.account = $.extend({}, this.account, ret.data);
                    this.oldInfo = $.extend({}, this.oldInfo, ret.data);
                    this.account.rentTime = Math.ceil((parseInt(( orderData.leaseEndDate- orderData.leaseStartDate)/24/60/60/1000)/365))+'年'
                /*   this.account.renewalMode ='1';*/
                  /*  this.account.palletQuantityM =this.account.palletTypemNum;
                    this.account.palletQuantityY =this.account.palletTypeyNum;
                    this.account.palletQuantityS =this.account.palletTypesNum;
                    this.account.palletQuantityQ =this.account.palletTypeqNum;*/
                    this.account.leaseEndDate=new Date(endDate.setMonth(endDate.getMonth()+6)).Format('yyyy-MM-dd');
                    //租期类型
                    if( this.account.leaseType == '1'){
                        this.account.leaseType="短租";
                    }else{
                        this.account.leaseType="长租";
                    }
                    this.account.palletTypesNum = orderData.surplus;
                    this.account.companyName =  this.account.storageCompany.companyName;
                    this.account.companyAddress =  this.account.storageCompany.linkmanAddress;
                    this.account.companyPhone =  this.account.storageCompany.linkmanPhone;
                    this.account.remark ='';
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
           /* IOT.getServerData(URI.RENT.RENTAL.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
                if (ret.code === 200) {
                    console.log(ret.data);
                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });*/
        },
        computed:{
            totalRental:function(){
                return this.account.totalRental;
            },
            totalDeposit:function(){
                 return this.account.totalDeposit;
            },
            totalCosts:function(){
                return this.account.totalCosts;
            },
            rentRange:function(){
                return this.account.leaseStartDateString+'至'+ this.account.leaseEndDateString ;
            },

        },
        methods: {

           change_palletQuantityS:function(){
              /* if($vue.$data.account.palletTypesNum > $vue.$data.oldInfo.surplus){
                   layer.alert("您输入的塑料托盘续租数大于可租赁的托盘数，请重新输入！");
                   return false;
               }*/
           },
            changeVal:function(){
               flag =0;
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
            },
            priceReview:function(){
                flag =1;
                if($vue.$data.account.palletTypesNum > $vue.$data.oldInfo.surplus){
                    layer.alert("您输入的塑料托盘续租数大于可租赁的托盘数，请重新输入！");
                    return false;
                }else{
                    let params ={
                        totalQuantity :$vue.$data.account.palletTypesNum,
                        customerId:orderData.customerId,
                        orderType:'2',
                    }
                    IOT.getServerData(URI.RENT.RENTAL.DETAIL.GET_COST, params, (ret) => {
                        if (ret && ret.code === 200) {
                            this.$nextTick(() => {
                                $vue.$data.account.totalRental =ret.data.totalRental;
                                $vue.$data.account.totalDeposit =ret.data.totalDeposit;
                                $vue.$data.account.totalCosts =ret.data.totalCosts;
                            })

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }
            },
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            nextOrders:function(){
                M.Page.emit(URI.RENT.RELET.NEXT_SURE_ORDER.PAGE);
                var infoStore =  $vue.$data.account;
                IOT.setSessionStore(URI.RENT.RELET.NEXT_SURE_ORDER.PAGE, JSON.stringify(infoStore));
            },
            submitOrders:function(){
               if($vue.$data.account.palletTypesNum > $vue.$data.oldInfo.surplus){
                    layer.alert("您输入的塑料托盘续租数大于可租赁的托盘数，请重新输入！");
                    return false;
                }
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("新增续租订单最少500个托盘，请重新输入！");
                    return false;
                }
                if(flag===0){
                    layer.alert("请将需租赁的托盘数进行价格预估！");
                    return false;
                }
                IOT.showOverlay('保存中，请稍等...');
                let params = {
                    orderLeaseId:$vue.$data.account.orderLeaseId,
                    leaseStartDateString:$vue.$data.account.leaseStartDate,
                    leaseEndDateString:$vue.$data.account.leaseEndDate,
                    palletTypemNum: '0',//
                    palletTypesNum: $vue.$data.account.palletTypesNum,
                    palletTypeyNum: '0',//
                    palletTypeqNum: '0',//
                    remark:$vue.$data.account.remark,
                    totalRental: $vue.$data.account.totalRental,//租金汇总
                    totalDeposit: $vue.$data.account.totalDeposit,//保证金汇总
                    totalCosts: $vue.$data.account.totalCosts,//费用总计
                };
               /* if($vue.$data.account.palletTypesNum < $vue.$data.oldInfo.palletTypesNum){
                    params.renewalMode ='2';
                }else if($vue.$data.account.palletTypesNum == $vue.$data.oldInfo.palletTypesNum){
                    params.renewalMode ='1';
                }*/
                IOT.getServerData(URI.RENT.RELET.NEXT_CREATE_RELET.SAVE, params, function (ret) {
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        IOT.tips('保存成功！', 'success');
                        M.Table.refresh.all();
                        M.Page.emitPrePage();
                        M.Page.emitPrePage();
                    } else {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    }
                });
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            })

        }
    });
})();
/*
$('.returnMode label').click(function(){
    $('.returnMode label').removeClass('active');
    $(this).addClass('active');
    $('button.next_btn').hide();
    $('button.next_btn').eq($(this).index()).show();
    let gender=$('input:radio[name="renewalMode"]:checked').val();
    if (gender == 1){
        $('.input_xs').prop('readonly',true);
        $('.detail_list>li>p input').addClass('no_border');
    }else {
        $('.detail_list>li>p input').removeClass('no_border');
        $('.input_xs').prop('readonly',false);
    }
});*/
