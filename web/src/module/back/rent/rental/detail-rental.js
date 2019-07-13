/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.DETAIL.PAGE));
    let $vue = null;
    var flag;
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
            paymentFlag:[{id:1,name:'未打款'},{id:2,name:'已打款至第三方银行'},{id:3,name:'已收款'}],
            pickupMode:[{id:1,name:'上门自取'},{id:2,name:'送货上门'}],
            Isshow:false,
            account: {
                'orderNo': '',         //订单号
                'placeOrderUser': '',//下单人
                'confirmStatusValue': '',   //确认状态
                'leaseType': '',     //租赁类型
                'customerName': '',  //承租客户
                'customerAddress': '', //客户地址
                'customerPhone': '', //客户联系电话
                'companyName':'',  //出租单位
                'companyAddress':'',  //出租地址
                'companyPhone':'',  // 出租单位联系电话
                'firstSingle': '',  //是否客户首单
                'pickupMode': '', //取货方式
                'pickupAddress': '', //取货地址
                'pickupAddress1': '', //取货地址
                'storageName':'', //出货网点
                'palletTypemNum': '',//木质托盘数量
                'palletTypesNum': '',//塑料托盘数量
                'palletTypeyNum': '',//压模托盘数量
                'palletTypeqNum': '',//其他托盘数量
                'totalRental': '',//租金汇总
                'totalDeposit': '',//保证金汇总
                'totalCosts': '',//费用总计
                'placeOrderTime': '',//下单时间
                'receiveTime': '',//收货时间
                'confirmTime':'',//确认时间
                'rentMoney': '', //租金
                'cautionMoney': '', //保证金
                'rentalCustomerName':'',
                'rentRange':'', //租赁时间
                'rentTime':'' , //租期
                'remark':'',   //备注
                'paymentFlag':'', //打款标志
                'orderSource':'',  //订单来源
                'orderStatus':'',
                'bindingFlag':''

            },
            editSave:{
                'paymentFlag':''
            }
        },
        created: function () {
            if(orderData.orderStatus=="3"){
                $('#printOrder').hide();
                $('#exportOrder').hide();
                $('#paymentFlag').hide();
            }
            if(orderData.orderStatus   !="3"){  //未废弃
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="bindOrder()">绑定生产单</button>')
            }
            if((orderData.orderStatus == '0' ||orderData.orderStatus == '1' )&& M.Authority.checkAuthority('pallet-lease-cancel')){
                $('#change_btn').after('<button class="primary_btn" @click.stop="cancleOrder()">废弃订单</button>');
            }else if(orderData.orderStatus == '3'){
                $('#change_btn').after('<button class="primary_btn" @click.stop="recoverOrder()">恢复订单</button>');
            }
          if(orderData.orderStatus =="1"){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="sureOrder()">确认收板</button>');
            }
            if(orderData.orderStatus   !="3"){  //未废弃
                $('#exportOrder').after('<button class="primary_btn"  @click.stop="contractManagement()">合同扫描件管理</button>')
            }
            if(orderData.orderStatus =="0"){
                $('#exportOrder').after('<button  class="primary_btn" @click.stop="editOrder()">修改订单</button> <button  class="primary_btn" @click.stop="reviewOrder()" >订单审核</button>');
            }

            IOT.getServerData(URI.RENT.RENTAL.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    this.editSave = $.extend({}, this.editSave, ret.data);
                    $vue.$data.account.companyName = $vue.$data.account.storageCompany.companyName;
                    $vue.$data.account.companyAddress = $vue.$data.account.storageCompany.linkmanAddress;
                    $vue.$data.account.companyPhone = $vue.$data.account.storageCompany.linkmanPhone;
                    this.account.pickupAddress1 =this.account.pickupAddress;
                    //取货方式
                    if($vue.$data.account.pickupMode == '1'){
                        $vue.$data.account.pickupMode="上门自取";
                    }else{
                        $vue.$data.account.pickupMode="送货上门";
                    };
                    //是否首单
                    if($vue.$data.account.firstSingle == '0'){
                        $vue.$data.account.firstSingle="";
                    }else{
                        $vue.$data.account.firstSingle="客户首单";
                    };
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
                    //订单来源
                    if($vue.$data.account.orderSource == null || $vue.$data.account.orderSource==""){
                        $vue.$data.account.orderSource="无";
                    }
                    //收货时间
                    if($vue.$data.account.receiveTime == null){
                        $vue.$data.account.receiveTime="";
                    }else{
                        $vue.$data.account.receiveTime=new Date($vue.$data.account.receiveTime).Format('yyyy-MM-dd hh:mm:ss');
                    };
                    this.account.rentRange =this.account.leaseStartDateString+'至'+ this.account.leaseEndDateString ;
                    this.account.rentTime =Math.ceil((parseInt((this.account.leaseEndDate-this.account.leaseStartDate)/24/60/60/1000)/365))+'年'
                    this.account.leaseStartDate=new Date(this.account.leaseStartDate).Format('yyyy-MM-dd');
                    this.account.leaseEndDate=new Date(this.account.leaseEndDate).Format('yyyy-MM-dd');
                     this.account.palletTypesNum = this.account.totalQuantity;
                    if(orderData.orderStatus   !="3" &&  this.account.bindingFlag == '1'){  //未废弃
                        this.$nextTick(() => {
                            $('#offOrder').show();
                        })
                    }
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


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
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            reviewOrder:function(){
                M.Page.emit(URI.RENT.ALLOCATION.DETAIL.SUREORDER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.ALLOCATION.DETAIL.SUREORDER.PAGE, JSON.stringify(params));
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
                let params ={
                    totalQuantity :$vue.$data.account.palletTypesNum,
                    customerId:orderData.customerId,
                    orderType:'1',
                    orderNo:orderData.orderNo
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
            },
            editOrder:function(){
                $vue.$data.Isshow = true;
                $('.detail_list>li>p input,#remarkText').removeClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',false);

                //百度地图地址逆解析
                var map = new BMap.Map('rental-map');
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
                //输入地址事件处理 start
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {"input" :"pickupAddress"
                        ,"location" : map
                    });
                $('#pickupAddress').keyup(function(){
                    $vue.$data.account.pickupAddress = "";
                })
                ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                    var str = "";
                    var _value = e.fromitem.value;
                    var value = "";
                    if (e.fromitem.index > -1) {
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                    value = "";
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                    $("#pickupAddress_list").innerHTML = str;
                });

                var myValue;
                ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    $vue.$data.account.pickupAddress1 = myValue;
                    $vue.$data.account.pickupAddress = myValue;
                    $("#pickupAddress_list").innerHTML =""
                });
            },
            bindOrder:function(){
                M.Page.emit(URI.RENT.RENTAL.DETAIL.BINDORDER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.BINDORDER.PAGE, JSON.stringify(params));
            },
           offOrder:function(){
                M.Page.emit(URI.RENT.RENTAL.DETAIL.OFFORDER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.OFFORDER.PAGE, JSON.stringify(params));
            },
            saveEdit:function(){
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
                if(flag === 0){
                    layer.alert('请将需租赁的托盘数进行价格预估！');
                    return false;
                }
                if($vue.$data.account.pickUpAddress == ""){
                    layer.alert('请按输入地址搜索列表结果选择收货地址');
                    return false;
                }
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input,#remarkText').addClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',true);
                let params ={
                    orderNo:$vue.$data.account.orderNo,
                    totalQuantity:$vue.$data.account.palletTypesNum,
                    totalDeposit:$vue.$data.account.totalDeposit,
                    totalRental:$vue.$data.account.totalRental,
                    totalCosts:$vue.$data.account.totalCosts,
                    leaseStartDate:$vue.$data.account.leaseStartDate,
                    leaseEndDate:$vue.$data.account.leaseEndDate,
                    pickupMode:$vue.$data.account.pickupMode,
                    pickUpAddress:$vue.$data.account.pickupAddress,
                    palletTypesNum:$vue.$data.account.palletTypesNum,
                    remark:$vue.$data.account.remark,
                    paymentMethod:$vue.$data.account.paymentMethod,
                    paymentFlag:$vue.$data.account.paymentFlag
                };
             if($vue.$data.account.pickupMode == '上门自取'){
                    params.pickupMode =1;
                }else if($vue.$data.account.pickupMode == '送货上门'){
                    params.pickupMode =2;
                }
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.RENT.RENTAL.DETAIL.EDIT_SAVE, params, (ret) => {
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
                $vue.$data.leaseStartDate =orderData.leaseStartDate;
                $vue.$data.leaseEndDate =orderData.leaseEndDate;
                $('.detail_list>li>p input,#remarkText').addClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',true);
                $vue.$data.account.totalQuantity =$vue.$data.editSave.totalQuantity;
                $vue.$data.account.totalDeposit= $vue.$data.editSave.totalDeposit;
                $vue.$data.account.pickupMode= $vue.$data.editSave.pickupMode;
                $vue.$data.account.remark= $vue.$data.editSave.remark;
                $vue.$data.account.pickupAddress= $vue.$data.editSave.pickupAddress;
                $vue.$data.account.totalCosts=$vue.$data.editSave.totalCosts;
                $vue.$data.account.palletTypesNum=$vue.$data.editSave.palletTypesNum;
                $vue.$data.account.leaseStartDate= new Date($vue.$data.editSave.leaseStartDate).Format('yyyy-MM-dd');;
                $vue.$data.account.leaseEndDate= new Date($vue.$data.editSave.leaseEndDate).Format('yyyy-MM-dd');
                $vue.$data.account.paymentFlag ='';
                if($vue.$data.account.pickupMode == '1'){
                    $vue.$data.account.pickupMode="上门自取";
                }else{
                    $vue.$data.account.pickupMode="送货上门";
                };
            },
            editStartTime:function(){
                this.$nextTick(() => {
                    $('#datetimeStart').datetimepicker({
                        width: '320px',
                        format: 'Y-m-d',
                        formatDate: 'Y-m-d',
                        scrollMonth: false,
                        scrollTime: false,
                        scrollInput: false,
                        onShow: function (ct) {
                            this.setOptions({
                                minDate: new Date()
                            });
                        },
                        onChangeDateTime: function (dateText, inst) {
                            $vue.$data.account.leaseStartDate = new Date(dateText).Format('yyyy-MM-dd');
                            $vue.$data.account.leaseEndDate = new Date(new Date(dateText).setFullYear(new Date(dateText).getMonth() + 6)).Format('yyyy-MM-dd');
                        },
                        timepicker: false // 关闭时间选项
                    });
                })
            },
            cancleOrder: function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认废弃订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RENTAL.DETAIL.CANCLE_ORDER, {orderLeaseId: orderData.orderLeaseId}, (ret) => {
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
            recoverOrder:function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RENTAL.DETAIL.RECOVER_ORDER, {orderLeaseId: orderData.orderLeaseId}, (ret) => {
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
            exportOrder:function(){
                var staticServer = $('#staticServer').val();
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
            changeOrder:function(){
                M.Page.emit(URI.RENT.RENTAL.DETAIL.CHANGEORDER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.CHANGEORDER.PAGE, JSON.stringify(params));
                return false;
            },
            contractManagement:function(){
                let params = $vue.$data.account.orderNo;
                M.Page.emit(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PAGE);
                IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PAGE, JSON.stringify(params));
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            })
        }

    });


})();