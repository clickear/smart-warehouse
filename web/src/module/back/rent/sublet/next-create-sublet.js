require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.SUBLET.CLIENT_NEXT_SUBLET.PAGE));
    let list;//承租客户
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.next-sublet-hook',
        data: {
            info:{
                orderLeaseId:'',//原订单订单号
                leaseStartDateString:'',
                leaseEndDateString:'',
                customerId:'',
                customerAddress:'',
                customerPhone:'',
                customerName:'',
                palletTypemNum:'0',
                palletTypesNum:'0',
                palletTypeyNum:'0',
                palletTypeqNum:'0',
                totalQuantity:'0',//转租数量
                totalRental:'0',//租金汇总
                totalDeposit:'0',//保证金汇总
                totalCosts:'0',//费用总计
                pickupMode:'1',//取货方式
                pickupAddress1:'',
                pickupAddress:'',//收货地址
                remark:'',//备注
                storageId:''//出货网点
            },
            items:[],//客户下拉信息
            list:infoData//新增选择的列表——原订单信息
        },
        computed:{
            palletTypesRentMoney:function(){//合计租金详情
                return this.info.totalRental;
            },
            palletTypesCautionMoney:function(){//合计保证金详情
                return this.info.totalDeposit;
            },
            totalCosts:function(){//总费用详情
                return this.info.totalCosts;
            }
        },
        created: function () {
            //获取承租客户的信息
            IOT.getServerData(URI.SUPPLY.ORDER.CREATE_ORDER.COMPANYDATA,{companyType:4},(ret) => {
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
            /*cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },*/
            prevStep: function () {
                M.Page.emitPrePage();
            },
            changeVal:function(){
                //$('#priceReview').trigger('click');
                flag =0;
                if($vue.$data.info.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
            },
            priceReview:function(){
                flag =1;
                var regu = /^[1-9]\d*$/;
                if(!regu.test($vue.$data.info.palletTypesNum)){
                    layer.alert('托盘租赁数量必须为正整数');
                    return false;
                }
                let params ={
                    totalQuantity :$vue.$data.info.palletTypesNum,
                    customerId: $vue.$data.list.customerId,
                    orderType:'3'
                };
                IOT.getServerData(URI.RENT.SUBLET.DETAIL.GET_COST, params, (ret) => {
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
            changeCustomer: function (ele) {
                let selectVal = ele.currentTarget.value;
                $.each(list, function (i, v) {
                    if (selectVal == v.companyName) {
                        $vue.$data.info.customerAddress = v.linkmanAddress;//客户地址*/
                        $vue.$data.info.pickupAddress1 = v.linkmanAddress;
                        $vue.$data.info.pickupAddress = v.linkmanAddress;
                        $vue.$data.info.customerPhone = v.linkmanPhone;//客户电话
                        $vue.$data.info.customerId = v.companyId;//id
                    }
                });
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                $('#startDate').datetimepicker({
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
                        $vue.$data.info.leaseStartDateString = new Date(dateText).Format('yyyy-MM-dd');
                        $vue.$data.info.leaseEndDateString=new Date(new Date(dateText).setMonth(new Date(dateText).getMonth()+6)).Format('yyyy-MM-dd');
                    },
                    timepicker: false // 关闭时间选项
                });
                $('.next-create-sublet-form').validate({
                    debug: true,
                    rules: {
                        palletTypesNum: {
                            required: true,
                            number: true,
                        }
                    },
                    messages: {
                        palletTypesNum: {
                            digits: "请输入正整数",
                        },
                    },
                    submitHandler: function (form) {
                        if(flag ==0){
                            layer.alert('请将需租赁的托盘数进行价格预估！');
                            return false;
                        }
                        if($vue.$data.info.palletTypesNum<500){
                            layer.alert('托盘转租数目不得少于500个，请重新输入');
                            return false;
                        }
                        if($vue.$data.info.palletTypesNum > $vue.$data.list.surplus){
                            layer.alert('托盘转租总数超过原订单托盘数，请重新输入');
                            return false;
                        }
                        if($('#startDate')[0].value == "" || $('#endDate')[0].value == ""){
                            layer.alert('请输入转租时间');
                            return false;
                        }
                        if($('#select_customerName')[0].value == ""){
                            layer.alert('请选择客户信息');
                            return false;
                        }
                        if($('#pickupAddress')[0].value == ""){
                            layer.alert('请输入收货地址');
                            return false;
                        }
                        if($vue.$data.info.pickupAddress == ""){
                            layer.alert('请按输入地址搜索列表结果选择目的地');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        params.totalQuantity = $vue.$data.info.palletTypesNum;
                        params.orderLeaseId = $vue.$data.list.orderLeaseId;
                        IOT.getServerData(URI.RENT.SUBLET.CLIENT_NEXT_SUBLET.SAVE, params, function (ret) {
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
                        return false;
                    }
                });
            });
        }
    });
    
    var map = new BMap.Map('rental-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"pickupAddress"
            ,"location" : map
        });
    $('#pickupAddress').keyup(function(){
        $vue.$data.info.pickupAddress = "";
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
        $vue.$data.info.pickupAddress1 = myValue;
        $vue.$data.info.pickupAddress = myValue;
        $("#pickupAddress_list").innerHTML =""
    });
    
})();

$(function(){
    $('.get_type label').click(function(){
        $('.get_type label').removeClass('active');
        $(this).addClass('active');
    });
});