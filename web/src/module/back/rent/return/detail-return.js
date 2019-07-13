require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.DETAIL.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            Isshow:false,
            distributionMode:[{id:1,name:'租方自取'},{id:2,name:'承租方配送'}],
            info: {
                totalQuantity:'0',
                distributionMode:'',
                returnAddress:''
            },
            data:{
                orderNo:'', //订单号
                distributionMode:'',
                totalRental:'0', //租金合计
                totalDeposit:'0', //保证金合计
                totalCosts:'0', //费用总计
                totalQuantity:'0', //托盘总数
                returnAddress:''
            }
        },
        created: function () {
            //获取详情接口数据
            IOT.getServerData(URI.RENT.RETURN.DETAIL.DATA, {orderNo: orderData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                    this.data.totalQuantity =  this.info.palletTypesNum;//原始
                    this.data.palletTypesNum =  this.info.palletTypesNum;//原始
                    this.data.totalCosts =  this.info.returnActual;//原始
                    this.data.totalRental =  this.info.returnRental;//原始
                    this.data.totalDeposit =  this.info.returnDeposit;//原始
                    this.data.distributionMode =  this.info.distributionMode;//原始
                    this.data.returnAddress = this.info.returnAddress;
                    this.data.returnAddress1 = this.info.returnAddress;
                    this.info.returnAddress1 = this.info.pickupAddress;
                    this.info.returnAddress = this.info.pickupAddress;
                    this.info.confirmTime = new Date(this.info.confirmTime).Format('yyyy-MM-dd');
                    if($vue.$data.info.distributionMode == '1'){
                        $vue.$data.info.distributionMode = "租方自取"
                    }else {
                        $vue.$data.info.distributionMode = "承租方配送"
                    }
                    if(this.info.confirmStatus){
                        $('.returnConfirm').hide();
                    }
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
            if((orderData.orderStatus == '0' ||orderData.orderStatus == '1' )){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="returnscrapOrder()">废弃订单</button>');
            }else if( orderData.orderStatus == '3'){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="returnunScrapOrder()">恢复订单</button>');
            }
            if( orderData.orderStatus=="1"){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="confirmOrder()" >确认收板</button>');
            }
            if( orderData.orderStatus =="0"){
                $('#exportOrder').after('<button class="primary_btn" @click.stop="editOrder()">修改订单</button><button class="primary_btn" @click.stop="auditOrder()">订单审核</button>');
            }
            if( orderData.isOneClick =="N" ){
                var btnGroup =[
                    '<div class="btn-group">',
                    '<button class="primary_btn dropdown-toggle" data-toggle="dropdown">一键下单</button>',
                    '<ul class="dropdown-menu" role="menu">',
                    '<li><button class="primary_btn" @click.stop="returnaSword(0)">转为租赁单</button></li>',
                    '<li><button class="primary_btn" @click.stop="returnaSword(1)">转为续租单</button></li>',
                    '<li><button class="primary_btn" @click.stop="returnaSword(2)">转为转租单</button></li>',
                    '</ul>',
                    '</div>'
                ].join('');
                $('#exportOrder').after(btnGroup);
            }
        },
        computed:{
            totalCosts:function(){ //总费用详情
                return  this.info.totalCosts;
            },
            totalRental:function(){//租金
                return this.info.totalRental;
            },
            totalDeposit:function(){//保证金
                return this.info.totalDeposit;
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            },
            changeVal:function(){
                $('#priceReview').trigger('click');
                flag =0;
                if($vue.$data.info.palletTypesNum < 0){
                    layer.alert("您输入的塑料托盘数不得小于0，请重新输入！");
                    return false;
                }
                /*if($vue.$data.info.palletTypesNum > $vue.$data.list.totalQuantity){
                 layer.alert("您输入的塑料托盘数多得原订单托盘数，请重新输入！");
                 return false;
                 }*/
            },
            //费用预估
            priceReview:function(){
                flag =1;
                var regu = /^[1-9]\d*$/;
                if(!regu.test($vue.$data.info.palletTypesNum)){
                    layer.alert('托盘租赁数量必须为正整数');
                    return false;
                }
                let params ={
                    totalQuantity :$vue.$data.info.palletTypesNum,
                    customerId:orderData.customerId,
                    orderType:'4',
                    orderNo:orderData.orderNo
                };
                IOT.getServerData(URI.RENT.RETURN.DETAIL.GET_COST, params, (ret) => {
                    if (ret && ret.code === 200) {
                        this.$nextTick(() => {
                            $vue.$data.info.totalRental =ret.data.totalRental;
                            $vue.$data.info.totalDeposit =ret.data.totalDeposit;
                            $vue.$data.info.totalCosts =ret.data.totalCosts;
                        })
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            editOrder:function(){//修改订单
                $vue.$data.Isshow = true;
                $vue.$data.info.returnAddress1 = $vue.$data.info.returnAddress;
                $('.input_xs').removeClass('no_border').prop('readonly',false);
                //百度地图地址逆解析
                var map = new BMap.Map('rental-map');
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
                //输入地址事件处理 start
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {"input" :"returnAddress"
                        ,"location" : map
                    });
                $('#returnAddress').keyup(function(){
                    $vue.$data.info.returnAddress = "";
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
                    $("#returnAddress_list").innerHTML = str;
                });
                var myValue;
                ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    $vue.$data.info.returnAddress1 = myValue;
                    $vue.$data.info.returnAddress = myValue;
                    $("#returnAddress_list").innerHTML =""
                });
            },
            saveEdit:function(){
                if($vue.$data.info.palletTypesNum<=0){
                    layer.alert('托盘退板数目不得少于0个，请重新输入');
                    return false;
                }
                var max = $vue.$data.data.surplus + $vue.$data.data.palletTypesNum;
                if($vue.$data.info.palletTypesNum > max){
                    layer.alert('托盘转租总数超过原订单托盘数，请重新输入');
                    return false;
                }
                if(flag ==0){
                    layer.alert('请将需租赁的托盘数进行价格预估！');
                    return false;
                }
                let params ={
                    orderNo:$vue.$data.info.orderNo,
                    totalRental:$vue.$data.info.totalRental,
                    totalDeposit:$vue.$data.info.totalDeposit,
                    totalCosts:$vue.$data.info.totalCosts,
                    palletTypesNum:$vue.$data.info.palletTypesNum,
                    totalQuantity:$vue.$data.info.palletTypesNum,
                    distributionMode:$vue.$data.info.distributionMode,
                    returnAddress:$vue.$data.info.returnAddress,
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.RENT.RETURN.DETAIL.MODIFY, params, (ret) => {
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
                $('.input_xs').addClass('no_border').prop('readonly',true);
            },
            noEdit:function(){//修改订单——取消按钮，重新赋值
                $vue.$data.Isshow = false;
                $('.input_xs').addClass('no_border').prop('readonly',true);
                $vue.$data.info.totalQuantity =$vue.$data.data.totalQuantity;
                $vue.$data.info.totalDeposit= $vue.$data.data.totalDeposit;
                $vue.$data.info.totalCosts=$vue.$data.data.totalCosts;
                $vue.$data.info.palletTypesNum=$vue.$data.data.palletTypesNum;
                $vue.$data.info.distributionMode= $vue.$data.data.distributionMode;
                $vue.$data.info.returnAddress=$vue.$data.data.returnAddress;
            },
            returnConfirm:function() {//确认收货
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认退板？', {
                        btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.SAVE, {orderNo: orderData.orderNo}, (ret) => {
                        if (ret.code === 200) {
                            IOT.tips('退板成功！', 'success');
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
            //导出
            exportOrder:function(){
                IOT.showOverlay('正在导出，请稍等...');
                IOT.getServerData(URI.RENT.RETURN.DETAIL.EXPORT,{orderNo: orderData.orderNo}, (ret) => {
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
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.CONFIRM, {orderNo: orderData.orderNo}, (ret) => {
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
            auditOrder:function() {//审核
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认审核此订单？', {
                        btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.AUDIT, {orderNo: orderData.orderNo}, (ret) => {
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
            returnscrapOrder:function() {//废弃
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认废弃此订单？', {
                        btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.DISCARD, {orderNo: orderData.orderNo}, (ret) => {
                        if (ret.code === 200) {
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
            returnunScrapOrder:function() {//恢复
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复此订单？', {
                        btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.RECOVERY, {orderNo: orderData.orderNo}, (ret) => {
                        if (ret.code === 200) {
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
            returnaSword:function(e) {//一键下单
                orderData.aSwordType = e;
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认一键下单？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.RETURN.DETAIL.OneKey, {orderNo: orderData.orderNo,aSwordType:orderData.aSwordType}, (ret) => {
                        if (ret.code === 200) {
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
            }
        },
        mounted: function () {

        }
    });
})();

/*一键下单按钮——悬停下拉*/
$('.btn-group').mouseover(function() {
    $(this).addClass('open');
}).mouseout(function() {
    $(this).removeClass('open');
});