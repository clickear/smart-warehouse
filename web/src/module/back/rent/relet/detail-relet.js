/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RELET.DETAIL.PAGE));
    let $vue = null;
    var flag;
    var  inputRange;  //可续租的最大数
    flag =1;
    Vue.filter('formatPrice', function(value) {
        if(isNaN(value)||value ==null){
            return '';
        }else{
            return "￥"+value+"元" ;
        }
    });
    $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            Isshow:false,
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
                'rentTime':'' , //租期
                'orderStatus':'',
                'remark':''
            },
            oldInfo:{},
           rentalInfo:{
           }
        },
        created: function () {
            IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_OTHER.ORGIN_ORDER, {orderNo:orderData.orderSource}, (ret) => {
                if (ret.code === 200) {
                    this.rentalInfo = $.extend({}, this.rentalInfo, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
            IOT.getServerData(URI.RENT.RELET.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    this.oldInfo = $.extend({}, this.oldInfo, ret.data);
                    inputRange=Number($vue.$data.account.palletTypesNum) + Number(this.rentalInfo.surplus);   //获取可续租的最大数 ，已提交的托盘数加可续租的托盘数
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
                    this.account.rentTime = Math.ceil((parseInt((this.account.leaseEndDate-this.account.leaseStartDate)/24/60/60/1000)/31))+'月'
                    if(( orderData.orderStatus =="1" || orderData.orderStatus =="2" )&&  this.account.isOneClick=='N' ){
                        $('#oneKeyOrder').show();
                    }
                    if((orderData.surplus>0  && orderData.orderStatus != '3')&& this.account.isOntherHandle =='N'){
                        $('#otherOperation').show();
                    }
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            if(orderData.orderStatus!="3"){
                $('#printOrder').show();
                $('#exportOrder').show();
                $('#contractManagement').show();
            }
            if((orderData.orderStatus == '0' ||orderData.orderStatus == '1' )&&  M.Authority.checkAuthority('pallet-continue-lease-cancel') && M.Authority.checkAuthority('pallet-continue-lease-confirm')){
                $('#cancleOrder').show();
            }else if( orderData.orderStatus == '3'){
                 $('#recoverOrder').show();
            }
           if( orderData.orderStatus =="0"){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="editOrder()">修改订单</button> <button  class="primary_btn" @click.stop="sureOrder()" >订单审核</button>');
            }

           /* if( orderData.orderStatus != '3'){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="otherOperation()" >其他处理</button>');
            }*/
        },
        computed:{
            palletTypesRentMoney:function(){          //合计租金详情
                return this.account.totalRental;
            },
            palletTypesCautionMoney:function(){          //合计保证金详情
                return this.account.totalDeposit;
            },
            totalCosts:function(){          //总费用详情
                return this.account.totalCosts;
            },
        },
        methods: {
            cancleBack:function () {
                M.Page.emitPrePage();
            },
          /*  change_palletQuantityS:function(){

                if($vue.$data.account.palletTypesNum >inputRange){
                    layer.alert("您输入的塑料托盘续租数大于租赁的托盘数，请重新输入！");
                    return false;
                }
            },*/
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
            editOrder:function(){
                $vue.$data.Isshow = true;
                $('.detail_list>li>p input,#remarkText').removeClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',false);
            },
            saveEdit:function(){

                if($vue.$data.account.palletTypesNum >inputRange){
                    layer.alert("您输入的塑料托盘续租数大于可租赁的托盘数，请重新输入！");
                    return false;
                }
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘续租数不得小于500块，请重新输入！");
                    return false;
                }
                if(flag ==0){
                    layer.alert('请将需租赁的托盘数进行价格预估！');
                    return false;
                }
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input,#remarkText').removeClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',false);

                let params ={
                    orderNo:$vue.$data.account.orderNo,
                    totalQuantity:$vue.$data.account.palletTypesNum,
                    totalDeposit:$vue.$data.account.totalDeposit,
                    totalCosts:$vue.$data.account.totalCosts,
                    totalRental:$vue.$data.account.totalRental,
                    remark:$vue.$data.account.remark,
                    palletTypesNum:$vue.$data.account.palletTypesNum,
                    palletTypeyNum:'0',
                    palletTypemNum:'0',
                    palletTypeqNum:'0'

                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.RENT.RELET.DETAIL.EDIT_SAVE, params, (ret) => {
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

            },
            noEdit:function(){
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input,#remarkText').addClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',true);
                $vue.$data.account.totalQuantity =$vue.$data.oldInfo.totalQuantity;
                $vue.$data.account.totalDeposit= $vue.$data.oldInfo.totalDeposit;
                $vue.$data.account.totalCosts=$vue.$data.oldInfo.totalCosts;
                $vue.$data.account.totalRental=$vue.$data.oldInfo.totalRental;
                $vue.$data.account.palletTypesNum=$vue.$data.oldInfo.palletTypesNum;
                $vue.$data.account.remark =$vue.$data.oldInfo.remark;
            },
            cancleOrder: function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认废弃订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_RETURN, {orderNo: orderData.orderNo}, (ret) => {
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
            },
            recoverOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_RECOVER, {orderNo: orderData.orderNo}, (ret) => {
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
            },
            printOrder:function(){
                window.print();
            },
            sureOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;订单审核完成后托盘租赁有效期将按照续租时间进行延长，是否确认订单续租？', {
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
            },
            oneKeyOrder:function(){   //一键下单
                IOT.getServerData(URI.RENT.RELET.DETAIL.ONE_KEY, {orderNo: orderData.orderNo}, (ret) => {
                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('一键下单完成！', 'success');
                    M.Table.refresh.all();
                    M.Page.emitPrePage();
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
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
                if($vue.$data.account.palletTypesNum >inputRange){
                    layer.alert("您输入的塑料托盘续租数大于租赁的托盘数，请重新输入！");
                    return false;
                }
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘续租数不得小于500块，请重新输入！");
                    return false;
                }
                let params ={
                    totalQuantity :$vue.$data.account.palletTypesNum,
                    customerId:orderData.customerId,
                    orderType:'2',
                    orderNo:orderData.orderNo
                };
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
            },
            otherOperation:function(){
                M.Page.emit(URI.RENT.RELET.DETAIL.RELET_OTHER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.RELET.DETAIL.RELET_OTHER.PAGE, JSON.stringify(params));
            },
            contractManagement:function(){
                M.Page.emit(URI.RENT.RELET.DETAIL.CONTRACTMANAGEMENT.PAGE);
                let params = $vue.$data.account.orderNo;
                IOT.setSessionStore(URI.RENT.RELET.DETAIL.CONTRACTMANAGEMENT.PAGE, JSON.stringify(params));
            }
        },
        mounted: function () {

        }

    });
  /*  $('#otherOperation').click(function(){
        M.Page.emit(URI.RENT.RELET.DETAIL.RELET_OTHER.PAGE);
        let params = $vue.$data.account;
        IOT.setSessionStore(URI.RENT.RELET.DETAIL.RELET_OTHER.PAGE, JSON.stringify(params));
    })*/
})();