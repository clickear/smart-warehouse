require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.SUBLET.DETAIL.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            Isshow:false,
            pickupMode:[{id:1,name:'上门自取'},{id:2,name:'送货上门'}],
            account: {
                orderNo:'',         //订单号
                orderStatus:'',   //订单状态
                leaseType:'',     //租赁类型
                customerName:'',  //承租客户
                customerAddress:'', //客户地址
                customerPhone:'', //客户联系电话
                firstSingle:'',  //是否客户首单
                leaseEndDate:'',
                leaseEndDateString:"",
                leaseStartDate:'',
                leaseStartDateString:"",
                palletTypemNum:'',//木质托盘数量
                palletTypesNum:'',//塑料托盘数量
                palletTypeyNum:'',//压模托盘数量
                palletTypeqNum:'',//其他托盘数量
                totalRental:'',//租金汇总
                totalDeposit:'',//保证金汇总
                totalCosts:'',//费用总计
                placeOrderTime:'',//下单时间
                receiveTime:'',//收货时间
                rentMoney:'',
                storageCompany:{},
                cautionMoney:'',
                pickupAddress:'',
                pickupAddress1:''
            },
            data:{
                leaseEndDate:'',
                leaseEndDateString:"",
                leaseStartDate:'',
                leaseStartDateString:"",
                orderLeaseId:'',
                orderNo:"",
                orderStatus:"",
                orderStatusValue:"",
                orderType:'',
                palletTypemNum:'',
                palletTypeqNum:'',
                palletTypesNum:'',
                palletTypeyNum:'',
                totalCosts:'',
                totalDeposit:'',
                totalQuantity:'',
                totalRental:'',
                pickupAddress:'',
                pickupAddress1:''
            }
        },
        created: function () {
           /* if(orderData.confirmStatus == '0' && orderData.receiveStatus != '3' &&  M.Authority.checkAuthority('pallet-turn-lease-cancel')){
                var btnArr = '<button class="primary_btn" @click.stop="cancleOrder()">取消订单</button>';
                $('#print_btn').after(btnArr);
            }*/
            if(orderData.orderStatus!="3"){
                $('#print_btn').show();
                $('#exportOrder').show();
                $('#contractManagement').show();
            }
            if((orderData.orderStatus == '0' ||orderData.orderStatus == '1' )){
               $('#discardOrder').show();
            }else if( orderData.orderStatus == '3'){
               $('#recoverOrder').show();
            }
            if( orderData.orderStatus=="1"){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="confirmOrder()">确认收板</button>');
            }
            if( orderData.orderStatus =="0"){
                $('#exportOrder').after(' <button class="primary_btn" @click.stop="modifyOrder()">修改订单</button> <button class="primary_btn" @click.stop="auditOrder()">订单审核</button>');
            }
            if(( orderData.orderStatus =="1" || orderData.orderStatus =="2" )&& orderData.isOneClick =="N" ){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="oneKeyOrder()">一键下单</button>');
            }
            if( orderData.isOntherHandle =="N" && orderData.surplus > 0){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="otherOrder()">其他处理</button>');
            }
            IOT.getServerData(URI.RENT.SUBLET.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    this.data = $.extend({}, this.data, ret.data);
                    $vue.$data.account.pickupAddress1 = $vue.$data.account.pickupAddress;
                    $vue.$data.account.firstSingle == false ? $vue.$data.account.firstSingle='' : $vue.$data.account.firstSingle='客户首单';  //是否首单
                    //下单时间
                    if($vue.$data.account.placeOrderTime == null){
                        $vue.$data.account.placeOrderTime = '';
                    }else{
                        $vue.$data.account.placeOrderTime = new Date($vue.$data.account.placeOrderTime).Format('yyyy-MM-dd hh:mm:ss');
                    }
                    //收货时间
                    if($vue.$data.account.receiveTime == null){
                        $vue.$data.account.receiveTime = '';
                    }else{
                        $vue.$data.account.receiveTime = new Date($vue.$data.account.receiveTime).Format('yyyy-MM-dd hh:mm:ss');
                    }
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
            /*IOT.getServerData(URI.RENT.RENTAL.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });*/
        },
        computed:{
            totalCosts:function(){          //总费用详情
                return this.account.totalCosts;
            },
            palletTypesRentMoney:function(){
                return this.account.totalRental;
            },
            palletTypesCautionMoney:function(){
                return this.account.totalDeposit;
            },
            rentTime:function(){//租期
                return  Math.ceil((parseInt((this.data.leaseEndDate-this.data.leaseStartDate)/24/60/60/1000)/31))+'月'
            },
            rentRange:function(){//租赁时间
                return this.account.leaseStartDateString+' 至 '+ this.account.leaseEndDateString ;
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
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
                            $vue.$data.account.leaseEndDate = new Date(new Date(dateText).setFullYear(new Date(dateText).getFullYear() + 1)).Format('yyyy-MM-dd');
                        },
                        timepicker: false // 关闭时间选项
                    });
                })
            },
            changeVal:function(){
                $('#priceReview').trigger('click');
                flag =0;
                if($vue.$data.account.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
            },
            //审核订单
            auditOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认审核此订单？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.AUDIT, {orderNo: orderData.orderNo}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('审核成功！', 'success');
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
            //废弃订单
            discardOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认废弃此订单？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.DISCARD, {orderNo: orderData.orderNo}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('废弃成功！', 'success');
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
            //恢复订单
            recoverOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复此订单？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.RECOVERY, {orderNo: orderData.orderNo}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('恢复成功！', 'success');
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
            //一键下单订单
            oneKeyOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认一键下单？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.OneKey, {orderNo: orderData.orderNo}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('下单成功！', 'success');
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
            //其他处理——跳转退板页面
            otherOrder:function(){
                M.Page.emit(URI.RENT.SUBLET.DETAIL.OTHER.PAGE);
                let params = $vue.$data.account;
                IOT.setSessionStore(URI.RENT.SUBLET.DETAIL.OTHER.PAGE, JSON.stringify(params));
            },
            //费用预估
            priceReview:function(){
                flag =1;
                var regu = /^[1-9]\d*$/;
                if(!regu.test($vue.$data.account.palletTypesNum)){
                    layer.alert('托盘租赁数量必须为正整数');
                    return false;
                }
                let params ={
                    totalQuantity :$vue.$data.account.palletTypesNum,
                    customerId:orderData.customerId,
                    orderType:'3'
                };
                IOT.getServerData(URI.RENT.SUBLET.DETAIL.GET_COST, params, (ret) => {
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
            //修改订单
            modifyOrder:function(){
                $vue.$data.Isshow = true;
                $vue.$data.account.pickupAddress1 = $vue.$data.account.pickupAddress;
                $('.detail_list>li>p input,#remarkText').removeClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',false);
                $vue.$data.account.leaseStartDate= new Date($vue.$data.account.leaseStartDateString).Format('yyyy-MM-dd');
                $vue.$data.account.leaseEndDate= new Date($vue.$data.account.leaseEndDateString).Format('yyyy-MM-dd');
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
                });
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
            //修改订单——保存按钮，重新赋值
            saveEdit:function(){
                if($vue.$data.account.palletTypesNum<500){
                    layer.alert('托盘转租数目不得少于500个，请重新输入');
                    return false;
                }
                if($vue.$data.account.palletTypesNum > $vue.$data.account.surplus){
                    layer.alert('托盘转租总数超过原订单托盘数，请重新输入');
                    return false;
                }
                $vue.$data.account.totalQuantity = $vue.$data.account.palletTypesNum;//托盘总数=塑料数
                let params ={
                    orderNo:$vue.$data.account.orderNo,
                    palletTypesNum:$vue.$data.account.palletTypesNum,
                    totalQuantity:$vue.$data.account.totalQuantity,
                    totalDeposit:$vue.$data.account.totalDeposit,
                    totalCosts:$vue.$data.account.totalCosts,
                    totalRental:$vue.$data.account.totalRental,
                    leaseStartDate:$vue.$data.account.leaseStartDate,
                    leaseEndDate:$vue.$data.account.leaseEndDate,
                    pickupMode:$vue.$data.account.pickupMode,
                    pickUpAddress:$vue.$data.account.pickupAddress,
                    remark:$vue.$data.account.remark
                 };
                if($vue.$data.account.pickupMode == '上门自取'){
                    params.pickupMode =1;
                }else if($vue.$data.account.pickupMode == '送货上门'){
                    params.pickupMode =2;
                }
                if(flag ==0){
                    layer.alert('请将需租赁的托盘数进行价格预估！');
                    return false;
                }
                 IOT.showOverlay('保存中，请稍等...');
                 IOT.getServerData(URI.RENT.SUBLET.DETAIL.MODIFY, params, (ret) => {
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
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input,#remarkText').addClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',true);
            },
            //修改订单——取消按钮，重新赋值
            noEdit:function(){
                $vue.$data.Isshow = false;
                $('.detail_list>li>p input,#remarkText').addClass('no_border');
                $('.detail_list>li>p input,#remarkText').prop('readonly',true);
                $vue.$data.account.totalQuantity =$vue.$data.data.totalQuantity;
                $vue.$data.account.totalDeposit= $vue.$data.data.totalDeposit;
                $vue.$data.account.totalRental =$vue.$data.data.totalRental;
                $vue.$data.account.totalCosts=$vue.$data.data.totalCosts;
                $vue.$data.account.palletTypesNum=$vue.$data.data.palletTypesNum;
                $vue.$data.account.leaseStartDate= new Date($vue.$data.editSave.leaseStartDate).Format('yyyy-MM-dd');
                $vue.$data.account.leaseEndDate= new Date($vue.$data.editSave.leaseEndDate).Format('yyyy-MM-dd');
                $vue.$data.account.pickupMode= $vue.$data.editSave.pickupMode;
                $vue.$data.account.pickupModeValue= $vue.$data.editSave.pickupModeValue;
                $vue.$data.account.remark= $vue.$data.editSave.remark;
                $vue.$data.account.pickupAddress= $vue.$data.editSave.pickupAddress;
                $vue.$data.account.pickupAddress1= $vue.$data.editSave.pickupAddress;
            },
            //导出
            exportOrder:function(){
                IOT.showOverlay('正在导出，请稍等...');
                IOT.getServerData(URI.RENT.SUBLET.DETAIL.EXPORT,{orderNo: orderData.orderNo}, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        window.location.href =ret.data.substr(1);
                        IOT.tips('导出完成！', 'success');
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                return false;
            },
            //确认收货
            confirmOrder:function() {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认收货？', {
                        btn: ['确定','取消']
                    }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.CONFIRM, {orderNo: orderData.orderNo}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('确认收货成功！', 'success');
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
            //取消订单
            /*cancleOrder: function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认取消转租？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SUBLET.DETAIL.RELET_RETURN, {orderLeaseId: orderData.orderLeaseId}, (ret) => {
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
            },*/
            //合同扫描
            contractManagement:function(){
                M.Page.emit(URI.RENT.SUBLET.DETAIL.CONTRACTMANAGEMENT.PAGE);
                let params = $vue.$data.account.orderNo;
                IOT.setSessionStore(URI.RENT.SUBLET.DETAIL.CONTRACTMANAGEMENT.PAGE, JSON.stringify(params));
            }
        },
        mounted: function () {

        }
    });
})();