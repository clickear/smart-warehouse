/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent.less');
let orderData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.PAGE,));
console.log(orderData)
import $ from 'jQuery';
(function () {
    let $vue = null;
    var list;
    $vue = new Vue({
        el: '.create-order-hook',
        data: {
            info:{
                orderNo:orderData.orderNo,
                orderLeaseId:orderData.orderLeaseId,
                customerId:'',
                customerName:'',
                customerAddress:'',
                customerPhone:'',
                select_customer:'0',
                palletTypemNum:'0',
                palletTypesNum:'0',
                palletTypeyNum:'0',
                palletTypeqNum:'0',
                totalQuantity:'',
                deliveryAddress1:'',
                deliveryAddress:'',
                remark:'',
                deliveryUser:'',
                deliveryPhone:'',
                manufacturer:'',
                manufacturerAddress:'',
                manufacturerPhone:'',
                provinceName:'',
                cityName:''
            },
            items:[],
            list:[]
        },
        computed:{
            orderCount:function() {
                var nan=Number(this.info.palletTypemNum)+Number(this.info.palletTypesNum)+Number(this.info.palletTypeyNum)+Number(this.info.palletTypeqNum);
                if( isNaN(nan)){
                    return  this.info.totalQuantity="请输入有效数字"
                }else{
                    return  this.info.totalQuantity =nan;
                }
            }
        },
        created: function () {
            IOT.getServerData(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.COMPANYDATA,{companyType:-1},(ret) => {
                if (ret.code === 200) {
                    list = ret.data;
                    $.each(list,function(i,v){
                        $vue.$data.items.push({text:v.companyName,value:v.companyName})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            nextStep:function(){
            },
            prevStep:function(){
                M.Page.emitPrePage();
            },
            cancleOrder:function(){

            },
            changeCustomer:function(ele){
                var selectVal = ele.currentTarget.value;
                /*  let $this = this;*/
                $.each(list,function(i,v){
                    if(selectVal==v.companyName){
                        $vue.$data.info.customerAddress=v.linkmanAddress;
                        $vue.$data.info.customerPhone=v.linkmanPhone;
                        $vue.$data.info.customerId=v.companyId;
                        $vue.$data.info.deliveryAddress1 = v.linkmanAddress;
                        $vue.$data.info.deliveryAddress= v.linkmanAddress;
                        $vue.$data.info.deliveryUser =v.artificialPersonName;
                        $vue.$data.info.deliveryPhone =v.linkmanPhone;
                    }
                });
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.client-create-order-hook').validate({
                    debug: true,
                    rules: {
                        palletTypemNum:{
                            required:true,
                            digits:true
                        },
                        palletTypesNum:{
                            required:true,
                            digits:true
                        },
                        palletTypeyNum:{
                            required:true,
                            digits:true
                        },
                        palletTypeqNum:{
                            required:true,
                            digits:true
                        }
                    },
                    messages:{
                        palletTypemNum:{
                            digits:"请输入正整数",
                        },
                        palletTypesNum:{
                            digits:"请输入正整数",
                        },
                        palletTypeyNum:{
                            digits:"请输入正整数",
                        },
                        palletTypeqNum:{
                            digits:"请输入正整数",
                        }
                    },
                    submitHandler: function (form) {
                        if($vue.$data.info.palletTypesNum < 500){
                            layer.alert('托盘数量不能小于500');
                            return false;
                        }
                        if($('.select_customer')[0].value==""){
                            layer.alert('请输入客户信息');
                            return false;
                        }
                        if($vue.$data.info.deliveryAddress1 == ""){
                            layer.alert('收货地址不能为空');
                            return false;
                        }
                     if($vue.$data.info.deliveryAddress == ""){
                            layer.alert('请按输入地址搜索列表结果选择收货地址');
                            return false;
                        }
                        if($vue.$data.info.deliveryUser == ""){
                            layer.alert('收货人信息不能为空');
                            return false;
                        }
                        if($vue.$data.info.deliveryPhone == ""){
                            layer.alert('收货人联系电话不能为空');
                            return false;
                        }
                        if($vue.$data.info.totalQuantity=="0"){
                            layer.alert('托盘总数不能为0');
                            return false;
                        }
                        if($vue.$data.info.totalQuantity>=2000000000){
                            layer.alert('托盘总数超过生产最大数，请重新输入');
                            return false;
                        }
                        M.Page.emit(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.NEXT_CREATE_ORDER.PAGE);
                        let params = $vue.$data.info;
                        console.log(params)
                        IOT.setSessionStore(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.NEXT_CREATE_ORDER.PAGE, JSON.stringify(params));
                        return false;
                    }
                });
            });
        }
    });

    var map = new BMap.Map('search-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"deliveryAddress_input"
            ,"location" : map
        });
    $('#deliveryAddress_input').keyup(function(){
        $vue.$data.info.deliveryAddress = "";
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
        $("#address_list").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        $vue.$data.info.deliveryAddress = "";
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
       $vue.$data.info.deliveryAddress1 = myValue;
        $vue.$data.info.deliveryAddress = myValue;
        $("#address_list").innerHTML ='';
       /* $vue.$data.info.deliveryAddress2 = myValue;*/
      /*  $("#address_list").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;*/
    });

})();











