require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.SUBLET.DETAIL.OTHER.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.sublet-return-hook',
        data: {
            info:{
                orderNo:'',//转租订单orderNo
                orderLeaseId:'',//原始租单id
                returnType: '',//退板类型
                returnMode: '1',//退板方式
                returnQuantity:'0',//托盘总数
                returnDeposit:'0',//保证金退费
                returnActual:'0',//实际退费
                returnCosts:'0',//运输扣除费用
                returnRental:'0',//退租金
                distributionMode:'1',//配送方式
                palletQuantityM:'0',
                palletQuantityS:'0',
                palletQuantityY:'0',
                palletQuantityQ:'0',
                returnAddress:'',//退板地址
                returnAddress1:'',//退板地址
            }
        },
        computed:{
            returnRental:function(){
                return this.info.returnRental;
            },
            returnDeposit:function() {
                return this.info.returnDeposit;
            },
            returnActual:function() {
                return  this.info.returnActual;
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
                };
                IOT.getServerData(URI.RENT.SUBLET.DETAIL.GET_COST, params, (ret) => {
                    if (ret && ret.code === 200) {
                        this.$nextTick(() => {
                            $vue.$data.info.returnRental =ret.data.totalRental;
                            $vue.$data.info.returnDeposit =ret.data.totalDeposit;
                            $vue.$data.info.returnActual =ret.data.totalCosts;
                        })
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }
        },
        created: function () {
            IOT.getServerData(URI.RENT.SUBLET.DETAIL.OTHER.ORGIN_ORDER, {orderNo:infoData.orderNo,orderType:'3'}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                    this.info.leaseStartDate=new Date(this.info.leaseStartDate).Format('yyyy-MM-dd hh:mm:ss');
                    this.info.leaseEndDate=new Date(this.info.leaseEndDate).Format('yyyy-MM-dd hh:mm:ss');
                    //this.info.palletQuantityS = Number(this.account.palletTypesNum) - Number(infoData.palletTypesNum);
                    this.info.palletQuantityS = this.info.surplus;
                    this.info.returnAddress1 =this.info.pickupAddress;
                    this.info.returnMode ="1";  //退板方式默认1
                    this.info.distributionMode ="1";  //配送方式默认1
                    $('#priceReview').trigger('click');//默认计算金额
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.sublet-return-form').validate({
                    debug: true,
                    rules: {
                    },
                    messages:{
                    },
                    submitHandler: function (form) {
                        let params = $vue.$data.info;
                        params.orderNo = infoData.orderNo;
                        params.returnQuantity = $vue.$data.info.palletQuantityS;
                        if($('#returnAddress')[0].value == ""){
                            layer.alert('请输入收货地址');
                            return false;
                        }
                        layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认生成退板？', {
                            btn: ['确定','取消']
                        }, function(){
                            IOT.showOverlay('保存中，请稍等...');
                            IOT.getServerData(URI.RENT.SUBLET.DETAIL.OTHER.RETURN_SAVE, params, (ret) => {
                                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                                IOT.hideOverlay();
                                if (ret && ret.code === 200) {
                                    IOT.tips('生成退板订单成功！', 'success');
                                    layer.closeAll();
                                    M.Table.refresh.all();
                                    M.Page.emitPrePage();
                                    M.Page.emitPrePage();
                                } else {
                                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                }
                            });
                        }, function(){
                            //取消
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
    var ac = new BMap.Autocomplete({ //建立一个自动完成的对象
        "input" :"returnAddress"
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
