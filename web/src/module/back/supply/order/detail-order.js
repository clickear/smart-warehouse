/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.ORDER.DETAIL.PAGE));
    let $vue = null;
    Vue.filter('formatPrice', function(value) {
        if(isNaN(value||value ==null)){
            return '';
        }else{
            return "￥"+value+"元" ;
        }
    });
    $vue = new Vue({
        el: '.detail-order-hook',
        data: {
            paymentFlag:[{id:1,name:'未打款'},{id:2,name:'已打款至第三方银行'},{id:3,name:'已收款'}],
            Isshow:false,
            account: {
                'orderNo':'',
                'placeOrderTime':'',
                'customerName':'',
                'customerAddress':'',
                'customerPhone':'',
                'manufacturer':'',
                'manufacturerAddress':'',
                'manufacturerPhone':'',
                'palletTypemNum':'',
                'deliveryAddress':'',
                'deliveryTime':'',
                'deliveryUser':'',
                'deliveryPhone':'',
                'receiveStatus':'',
                'receiveTime':'',
                'receiveAddress':'',
                'remark':'',
                'receiveTypemNum':'',
                'receiveTypesNum':'',
                'receiveTypeyNum':'',
                'receiveTypeqNum':'',
                'orderLeaseId':'',
                'supplyStatus':'',
                'paymentFlag':'',
                'orderLeaseNo':''
            },
            editSave:{
                'paymentFlag':''
            }
        },
        created: function () {
            if((orderData.supplyStatus == '0' ||orderData.supplyStatus == '1' )&& M.Authority.checkAuthority('pallet-lease-cancel')){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="cancleOrder()">废弃订单</button>');
            }else if(orderData.supplyStatus == '3'){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="recoverOrder()">恢复订单</button>');
            }
            if(orderData.supplyStatus =="0"){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="editOrder()">修改订单</button> <button  class="primary_btn" @click.stop="reviewOrder()" >订单审核</button>');
            }
            if(orderData.supplyStatus =="1"){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="sureOrder()" id="sureOrder" style="display: none">确认收板</button>');
            }
            if(orderData.supplyStatus!="3"){  //未废弃
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="bindOrder()" id="bindOrder" style="display: none">绑定租单</button>')
            }
            IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.DATA, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    this.editSave = $.extend({}, this.editSave, ret.data);
                    if(this.account.orderLeaseId !=null){
                        $('#offOrder').show();
                    }else {
                        $('#bindOrder').show();
                        $('#sureOrder').show();

                    }
                    //送货时间
                    if($vue.$data.account.deliveryTime == null){
                        $vue.$data.account.deliveryTime="";
                    }else{
                        $vue.$data.account.deliveryTime=new Date($vue.$data.account.deliveryTime).Format('yyyy-MM-dd');
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
                    if($vue.$data.account.deliveryStatus == '0'){
                        $vue.$data.account.deliveryStatus= '未收货';
                    }else if($vue.$data.account.deliveryStatus == '1'){
                        $vue.$data.account.deliveryStatus='部分收货';
                    }else if($vue.$data.account.deliveryStatus == '2'){
                        $vue.$data.account.deliveryStatus='全部收货';;
                    }else if($vue.$data.account.deliveryStatus == '3'){
                        $vue.$data.account.deliveryStatus='取消订单';
                    }

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        computed: {

        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            printOrder:function(){
                window.print();
            },
            reviewOrder:function(){//订单审核
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否审核并确认订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.REVIEW, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
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
            contractManagement:function(){//合同扫描
                let params = $vue.$data.account.orderNo;
                M.Page.emit(URI.SUPPLY.ORDER.DETAIL.CONTRACTMANAGEMENT.PAGE);
                IOT.setSessionStore(URI.SUPPLY.ORDER.DETAIL.CONTRACTMANAGEMENT.PAGE, JSON.stringify(params));
            },
            exportOrder:function(){//订单导出
                var staticServer = $('#staticServer').val();
                IOT.showOverlay('正在导出，请稍等...');
                IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.EXPORT,{orderSupplyId: orderData.orderSupplyId}, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        window.location.href =staticServer + ret.data;
                        IOT.tips('导出完成！', 'success');
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                return false;
            },
            cancleOrder:function(){//废弃订单
                layer.confirm(' &nbsp;&nbsp; &nbsp;废弃订单会自动解除绑定的租单<br /> <div style="text-align: center">是否确认废弃？</div>', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.RETURN, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
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
            recoverOrder:function () {//恢复订单
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.RECOVERY, {orderSupplyId: orderData.orderSupplyId}, (ret) => {
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
            sureOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认收板？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    IOT.getServerData(URI.RENT.RENTAL.DETAIL.SURE_ORDER, {orderNo: orderData.orderNo}, (ret) => {
                        if (ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function () {
                    //取消
                });
            },
            bindOrder:function(){//绑定租赁单
                M.Page.emit(URI.SUPPLY.ORDER.DETAIL.BINDING.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.SUPPLY.ORDER.DETAIL.BINDING.PAGE, JSON.stringify(params));
            },
            editOrder:function(){//修改订单
                $vue.$data.Isshow = true;
                $('.detail_list>li>p input').removeClass('no_border');
                $('.input_xs').prop('readonly',false);
            },
            offBind:function(){//解绑租赁订单
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.OFFORDERING, {orderSupplyId: this.account.orderSupplyId}, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        IOT.tips('保存成功！', 'success');
                        layer.closeAll();
                        M.Page.emitPrePage();

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            deliveryTime:function(){
                this.$nextTick(() => {
                    $('#deliveryTimeChange').datetimepicker({
                        width: '320px',
                        format: 'Y-m-d',
                        formatDate: 'Y-m-d',
                        scrollMonth: false,
                        scrollTime: false,
                        scrollInput: false,
                        onShow: function (ct) {
                            this.setOptions({
                                minDate: $vue.$data.account.placeOrderTime
                            });
                        },
                        onChangeDateTime: function (dateText, inst) {
                            $vue.$data.account.deliveryTime = new Date(dateText).Format('yyyy-MM-dd');
                        },
                        timepicker: false // 关闭时间选项
                    });
                })
            },
            saveEdit:function(){//保存订单
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input').addClass('no_border');
                $('.input_xs').prop('readonly',true);
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
                let params ={
                    orderNo:$vue.$data.account.orderNo,
                    customerAddress:$vue.$data.account.customerAddress,
                    customerPhone:$vue.$data.account.customerPhone,
                    manufacturer:$vue.$data.account.manufacturer,
                    manufacturerAddress:$vue.$data.account.manufacturerAddress,
                    manufacturerPhone:$vue.$data.account.manufacturerPhone,
                    palletTypesNum:$vue.$data.account.palletTypesNum,
                    palletTypemNum:"0",
                    palletTypeqNum:"0",
                    palletTypeyNum:"0",
                    paymentFlag:$vue.$data.account.paymentFlag,
                    deliveryAddress:$vue.$data.account.deliveryAddress,
                    deliveryUser:$vue.$data.account.deliveryUser,
                    deliveryPhone:$vue.$data.account.deliveryPhone,
                    deliveryTime:$vue.$data.account.deliveryTime,
                    remark:$vue.$data.account.remark,
                };
                console.log(params)
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.UPDATE, params, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        IOT.tips('保存成功！', 'success');
                        layer.closeAll();
                        M.Page.emitPrePage();
                        M.Table.refresh.all();

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            },
            noEdit:function(){//取消订单
                $vue.$data.Isshow = false;
                $vue.$data.deliveryTime =orderData.deliveryTime;
                $('.detail_list>li>p input').addClass('no_border');
                $('.input_xs').prop('readonly',true);

                $vue.$data.account.deliveryAddress =$vue.$data.editSave.deliveryAddress;
                $vue.$data.account.deliveryUser= $vue.$data.editSave.deliveryUser;
                $vue.$data.account.deliveryPhone=$vue.$data.editSave.deliveryPhone;
                $vue.$data.account.palletTypesNum=$vue.$data.editSave.palletTypesNum;
                $vue.$data.account.deliveryTime= $vue.$data.editSave.deliveryTime;
                if($vue.$data.account.deliveryTime == null){
                    $vue.$data.account.deliveryTime="";
                }else{
                    $vue.$data.account.deliveryTime=new Date($vue.$data.account.deliveryTime).Format('yyyy-MM-dd');
                };
                $vue.$data.account.remark=$vue.$data.editSave.remark;
                $vue.$data.account.paymentFlag =$vue.$data.editSave.paymentFlag;
            },
            changeVal:function(){
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
            },
        },
        mounted: function () {

        }
    });
})();




















