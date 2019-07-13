/**
 * Created by Administrator on 2017/10/15.
 */
require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.NEXT_CREATE_ORDER.PAGE));
    var list2;
    let $vue = null;
    $vue = new Vue({
        el: '.next-create-order-hook',
        data: {
            info:{
                orderLeaseId:'',
                orderNo:infoData.orderNo,
                customerAddress:'',
                customerPhone:'',
                palletTypemNum:'',
                palletTypesNum:'',
                palletTypeyNum:'',
                palletTypeqNum:'',
                deliveryAddress:'',
                totalQuantity:'',
                remark:'',
                deliveryUser:'',
                deliveryPhone:'',
                deliveryTime:'',
                manufacturer:'',
                manufacturerAddress1:'',
                manufacturerAddress:'',
                manufacturerPhone:''

            },
            elements:[],
            list2:[]
        },
        created: function () {
           this.info=infoData;
            IOT.getServerData(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.COMPANYDATA,{companyType:1},(ret) => {
                if (ret.code === 200) {
                    list2 = ret.data;
                    $.each(list2,function(i,v){
                        $vue.$data.elements.push({text:v.companyName,value:v.companyName})
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
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            prevStep:function(){
                M.Page.emitPrePage();
            },
            changeManufacturer:function(ele){
                var selectVal = ele.currentTarget.value;
                $.each(list2,function(i,v){
                    if(selectVal==v.companyName){
                        $vue.$data.info.manufacturerAddress1 = v.linkmanAddress;
                        $vue.$data.info.manufacturerAddress = v.linkmanAddress;
                        $vue.$data.info.manufacturerPhone = v.linkmanPhone;
                    }

                });
            },
        },
        mounted: function () {
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
                        $vue.$data.info.deliveryTime = new Date(dateText).Format('yyyy-MM-dd');
                    },
                    timepicker: false // 关闭时间选项
                });
                $('.next-create-order-form').validate({
                    debug: true,
                    rules: {
                    },
                    submitHandler: function (form) {

                        if($('#datetimeStart')[0].value==""){
                            layer.alert('送货日期不能为空');
                            return false;
                        }
                        if($('#select_manufacturer')[0].value==""){
                            layer.alert('生产单位信息不能为空');
                            return false;
                        }
                        if($vue.$data.info.manufacturerAddress1 == ""){
                            layer.alert('厂家地址不能为空');
                            return false;
                        }
                        if($vue.$data.info.manufacturerAddress == ""){
                            layer.alert('请按输入地址搜索列表结果选择厂家地址');
                            return false;
                        }
                        if($vue.$data.info.manufacturerPhone == ""){
                            layer.alert('厂家联系电话不能为空');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        console.log(JSON.stringify(params))
                        IOT.getServerData(URI.SUPPLY.ORDER.BIND_PRODUCTION.CREATE_ORDER.NEXT_CREATE_ORDER.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                M.Table.refresh.all();
                                M.Page.emitPrePage();
                                M.Page.emitPrePage();
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
    var map = new BMap.Map('search-manufacturer');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"manufacturerAddress"
            ,"location" : map
        });
    $('#manufacturerAddress').keyup(function(){
        $vue.$data.info.manufacturerAddress = "";
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
        $("#manufacturerAddress_list").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        $vue.$data.info.manufacturerAddress1 = myValue;
        $vue.$data.info.manufacturerAddress = myValue;
        $("#manufacturerAddress_list").innerHTML =""
    });
})();





















