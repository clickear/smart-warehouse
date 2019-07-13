require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let $vue = null;
    var list;
    var flag;
    flag =1;
    Vue.filter('formatPrice', function(value) {
        if(isNaN(value)||value ==""){
            return '';
        }else{
            return "￥"+value+"元" ;
        }
    });
    $vue = new Vue({
        el: '.create-rental-hook',
        data: {
            info:{
                customerAddress:'',
                customerPhone:'',
                palletTypemNum:'0',
                palletTypesNum:'0',
                palletTypeyNum:'0',
                palletTypeqNum:'0',
                totalQuantity:'',
                pickupAddress1:'',
                pickupAddress:'',
                remark:'',
                deliveryUser:'',
                deliveryPhone:'',
                rentMoney: '', //租金
                cautionMoney: '', //保证金
                totalRental:'', //租金汇总
                totalDeposit:'', //保证金汇总
                totalCosts:'', //费用总计
                pickupMode:'1',//取货方式
                leaseStartDate:'',
                leaseEndDate:'',
                paymentMethod:''//付费方式
            },
            items:[],
            list:[]
        },
        computed:{
            palletTypesRentMoney:function(){          //合计租金详情
                return this.info.totalRental;
            },
            palletTypesCautionMoney:function(){          //合计保证金详情
               return this.info.totalDeposit;
            },
            totalCosts:function(){          //总费用详情
                return this.info.totalCosts;
            },
        },
        created: function () {
            //获取公司信息
            IOT.getServerData(URI.SUPPLY.ORDER.CREATE_ORDER.COMPANYDATA,{companyType:-1},(ret) => {
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
            },
            changeVal:function(){
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
                     customerId: $vue.$data.info.customerId,
                     orderType:'1',
                };
                IOT.getServerData(URI.RENT.RENTAL.DETAIL.GET_COST, params, (ret) => {
                    if (ret && ret.code === 200) {
                        this.$nextTick(() => {

                            if(ret.data.totalRental == '0' || ret.data.totalRental == null ){
                                $vue.$data.info.totalRental='0'
                            }else{
                                $vue.$data.info.totalRental =ret.data.totalRental;
                            }
                            $vue.$data.info.totalDeposit =ret.data.totalDeposit;
                            $vue.$data.info.totalCosts =ret.data.totalCosts;
                        })
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            changeCustomer:function(ele){
                var selectVal = ele.currentTarget.value;
                /*  let $this = this;*/
                $.each(list,function(i,v){
                    if(selectVal==v.companyName){
                        $vue.$data.info.customerAddress=v.linkmanAddress;
                        $vue.$data.info.customerPhone=v.linkmanPhone;
                        $vue.$data.info.customerId=v.companyId;
                        $vue.$data.info.pickupAddress1 = v.linkmanAddress;
                        $vue.$data.info.pickupAddress = v.linkmanAddress;
                        $vue.$data.info.deliveryUser =v.artificialPersonName;
                        $vue.$data.info.deliveryPhone =v.linkmanPhone;
                    }
                });
            }
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
                        $vue.$data.info.leaseStartDate = new Date(dateText).Format('yyyy-MM-dd');
                        $vue.$data.info.leaseEndDate=new Date(new Date(dateText).setFullYear(new Date(dateText).getFullYear()+1)).Format('yyyy-MM-dd');
                    },
                    timepicker: false // 关闭时间选项
                });
                $('.client-create-rental-hook').validate({
                    debug: true,
                    rules: {
                        palletTypesNum:{
                            required:true,
                        },
                      /*  palletTypemNum:{
                            required:true,

                        },
                        palletTypeyNum:{
                            required:true,

                        },
                        palletTypeqNum:{
                            required:true,

                        }*/
                    },
                    submitHandler: function (form) {
                        if(flag ==0){
                            layer.alert('请将需租赁的托盘数进行价格预估！');
                            return false;
                        }
                        if($('#select_customer')[0].value==""){
                            layer.alert('请输入客户信息');
                            return false;
                        }
                        if($vue.$data.info.palletTypesNum<500){
                            layer.alert('托盘租赁总数不能少于500块');
                            return false;
                        }
                        if($vue.$data.info.pickupAddress1 == ""){
                            layer.alert('目的地地址不能为空');
                            return false;
                        }
                        if($vue.$data.info.pickupAddress == ""){
                            layer.alert('请按输入地址搜索列表结果选择目的地');
                            return false;
                        }
                        if($vue.$data.info.palletTypesNum>=2000000000){
                            layer.alert('托盘总数超过租赁最大数，请重新输入');
                            return false;
                        }
                        if($('#datetimeStart')[0].value == "" || $('#datetimeEnd')[0].value == ""){
                            layer.alert('请输入租赁时间');
                            return false;
                        }
                        if($("input[name='paymentMethod']:checked").length==0){
                            layer.alert('请选择一种付款方式');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        $vue.$data.info.totalQuantity = $vue.$data.info.palletTypesNum;
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