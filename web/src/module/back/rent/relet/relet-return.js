require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RELET.DETAIL.RELET_OTHER.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.relet-return-hook',
        data: {
            info:{
                orderNo:'',
                orderLeaseId:'',
                returnType: '',//退板类型
                returnMode: '1',//退板方式
                totalRental:'',//租金
                totalDeposit:'0',//保证金总计
                returnAddress:'',//退板地址
                returnAddress1:'',//退板地址
                pickupAddress:'',
                leaseStartDate:'',//开始时间
                leaseEndDate:'', //结束时间
                distributionMode:'1',//配送方式
                palletQuantityM:'0',
                palletQuantityS:'0',
                palletQuantityY:'0',
                palletQuantityQ:'0',
                palletTypemNum:'0',
                palletTypesNum:'0',
                palletTypeyNum:'0',
                palletTypeqNum:'0',
                totalQuantity:'0',//托盘总数
                returnDeposit:'0',//保证金退费
                returnActual:'0',//实际退费
                returnCosts:'0',//运输扣除费用
                linkmanAddress:'', //单位地址
                artificialPersonName:'', //法人代表
                linkmanPhone:''  //联系电话
            },
            account:{
                totalRental:'',
                totalDeposit:'',//保证金退费
                totalCosts:'',//实际退费
            }
        },
        computed:{
            returnRentMoney:function(){
                return this.account.totalRental;
            },
            returnDeposits:function() {
               return this.account.totalDeposit;
            },
            returnActuals:function() {
               return  this.account.totalCosts;
            }
        },
        methods: {

            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            priceReview:function(){
                let params ={
                    totalQuantity :$vue.$data.info.palletQuantityS,
                    customerId:$vue.$data.info.customerId,
                    orderType:'4',
                    orderNo:$vue.$data.info.orderNo
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
        },
        created: function () {
            IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_OTHER.ORGIN_ORDER, {orderNo:infoData.orderSource}, (ret) => {
                if (ret.code === 200) {
                  /*  console.log(ret.data);*/
                    this.info = $.extend({}, this.info, ret.data);
                    this.info.leaseStartDate=new Date(this.info.leaseStartDate).Format('yyyy-MM-dd hh:mm:ss')
                    this.info.leaseEndDate=new Date(this.info.leaseEndDate).Format('yyyy-MM-dd hh:mm:ss')
                    this.info.palletQuantityS = this.info.surplus;
                    this.info.returnAddress =this.info.pickupAddress;
                    this.info.returnAddress1 =this.info.pickupAddress;
                    this.info.returnMode ="1";  //退板方式默认1
                    this.info.distributionMode ="1";  //配送方式默认1
                    $('#priceReview').trigger('click');

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.relet-return-form').validate({
                    debug: true,
                    rules: {
                    },
                    messages:{
                    },
                    submitHandler: function (form) {
                        let params = $vue.$data.info;

                        params.orderNo = infoData.orderNo;
                        params.returnDeposit =$vue.$data.account.totalDeposit;
                        params.returnActual=$vue.$data.account.totalRental;//实际退费
                        params.returnCosts=$vue.$data.account.totalCosts;//运输扣除费用

                     /*   if($('#returnAddress')[0].value == ""){
                            layer.alert('请输入收货地址');
                            return false;
                        }*/
                        if($vue.$data.info.returnAddress1 == ""){
                            layer.alert('收货地址不能为空');
                            return false;
                        }
                        if($vue.$data.info.returnAddress == ""){
                            layer.alert('请按输入地址搜索列表结果选择收货地址');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.RENT.RELET.DETAIL.RELET_OTHER.RETURN_SAVE,params, function (ret) {
                            IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
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
            })
        }
    });


    var map = new BMap.Map('rental-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"returnAddress"
            ,"location" : map
        });
    $('#returnAddress').keyup(function(){
        $vue.$data.info.returnAddress = "";
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
        $vue.$data.info.returnAddress1 = myValue;
        $vue.$data.info.returnAddress = myValue;
        $("#pickupAddress_list").innerHTML =""
    });
})();


$('.distributionMode label').click(function(){
    $('.distributionMode label').removeClass('active');
    $(this).addClass('active');
});