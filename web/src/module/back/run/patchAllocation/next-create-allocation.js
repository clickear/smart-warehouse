/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RUN.PATCH_ALLOCATION.ADD.NEXT.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.next-return-hook',
        data: {
            info:{
                orderNo:'',
                orderLeaseId:'',
                returnType: '',//退板类型
                returnMode: '1',//退板方式
                totalRental:'',//租金
                totalDeposit:'0',//保证金总计
                returnAddress:'',//退板地址
                pickupAddress:'',
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
                //returnCosts:'',//运输扣除费用
            },
            account:{
                formTotalQuantity: '0',//托盘总数
                formReturnDeposit:'0',//保证金退费
                formReturnActual:'0',//实际退费
            }
        },
        computed:{
            totalQuantitys:function() {
                let totalQuantity =Number(this.info.palletQuantityM)+Number(this.info.palletQuantityS)+Number(this.info.palletQuantityY)+Number(this.info.palletQuantityQ);
                if( isNaN(totalQuantity)){
                    return  this.info.totalQuantity="请输入有效数字"
                }else{
                    return  this.info.totalQuantity = totalQuantity;
                }
            },
            returnDeposits:function() {
                let returnDeposit = parseInt(this.info.palletQuantityM)*100+parseInt(this.info.palletQuantityS)*100+parseInt(this.info.palletQuantityY)*100+parseInt(this.info.palletQuantityQ)*100;
                if( isNaN(returnDeposit)){
                    return  this.info.returnDeposit = ""
                }else{
                    return  this.info.returnDeposit = returnDeposit;
                }
            },
            returnActuals:function() {
                let returnActual = parseInt(this.info.palletQuantityM)*100+parseInt(this.info.palletQuantityS)*100+parseInt(this.info.palletQuantityY)*100+parseInt(this.info.palletQuantityQ)*100;
                if( isNaN(returnActual)){
                    return  this.info.returnActual = ""
                }else{
                    return  this.info.returnActual = returnActual;
                }
            }
        },
        methods: {
            returnMode1:function(){
                $vue.$data.info.returnMode =1;
                $vue.$data.info.palletQuantityM =$vue.$data.info.palletTypemNum;
                $vue.$data.info.palletQuantityY =$vue.$data.info.palletTypeyNum;
                $vue.$data.info.palletQuantityS =$vue.$data.info.palletTypesNum;
                $vue.$data.info.palletQuantityQ =$vue.$data.info.palletTypeqNum;
                $vue.$data.info.totalQuantity =$vue.$data.account.formTotalQuantity;
                $vue.$data.info.returnDeposit =$vue.$data.account.formReturnDeposit;
                $vue.$data.info.returnActual =$vue.$data.account.formReturnActual;
            },
            change_palletQuantityM:function(e) {
                if($vue.$data.info.palletQuantityM > $vue.$data.info.palletTypemNum){
                    layer.alert("您输入的木质托盘退板数大于余下的托盘数，请重新输入！");
                    /*console.log(e);
                    e.target.focus();*/
                    return false;
                }
            },
            change_palletQuantityY:function(e) {
                if($vue.$data.info.palletQuantityY > $vue.$data.info.palletTypeyNum){
                    layer.alert("您输入的压模托盘退板数大于余下托盘数，请重新输入！");
                    return false;
                }
            },
            change_palletQuantityS:function(e) {
                if($vue.$data.info.palletQuantityS > $vue.$data.info.palletTypesNum){
                    layer.alert("您输入的塑料托盘退板数大于余下托盘数，请重新输入！");
                    return false;
                }
            },
            change_palletQuantityQ:function(e) {
                if($vue.$data.info.palletQuantityQ > $vue.$data.info.palletTypeqNum){
                    layer.alert("您输入的其他托盘退板数大于余下托盘数，请重新输入！");
                    return false;
                }
            },
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
        },
        created: function () {
            IOT.getServerData(URI.RENT.RETURN.CLIENT_NEXT_RETURN.DATA, {orderNo: infoData.orderNo}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                    this.info.returnAddress =this.info.pickupAddress;
                    this.info.returnDeposit =this.info.totalDeposit;//初始-保证金退费
                    this.info.returnActual =this.info.totalDeposit;//初始-退费
                    this.info.palletQuantityM =this.info.palletTypemNum;
                    this.info.palletQuantityY =this.info.palletTypeyNum;
                    this.info.palletQuantityS =this.info.palletTypesNum;
                    this.info.palletQuantityQ =this.info.palletTypeqNum;
                    this.info.returnMode ="1";  //退板方式默认1
                    this.info.distributionMode ="1";  //配送方式默认1
                    this.account.formTotalQuantity =this.info.totalQuantity;//初始-托盘总数
                    this.account.formReturnDeposit =this.info.totalDeposit;//初始-保证金退费
                    this.account.formReturnActual =this.info.totalDeposit;//初始-退费
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.next-create-return-form').validate({
                    debug: true,
                    rules: {
                        palletQuantityM:{
                            required:true,
                            digits:true
                        },
                        palletQuantityS:{
                            required:true,
                            digits:true
                        },
                        palletQuantityY:{
                            required:true,
                            digits:true
                        },
                        palletQuantityQ:{
                            required:true,
                            digits:true
                        }
                    },
                    messages:{
                        palletQuantityM:{
                            digits:"请输入正整数",
                        },
                        palletQuantityS:{
                            digits:"请输入正整数",
                        },
                        palletQuantityY:{
                            digits:"请输入正整数",
                        },
                        palletQuantityQ:{
                            digits:"请输入正整数",
                        }
                    },
                    submitHandler: function (form) {
                        let params = $vue.$data.info;
                        if(params.totalQuantity<0){
                            layer.alert("请输入正整数");
                            return false;
                        }
                        if(params.palletQuantityM > params.palletTypemNum){
                            layer.alert("您输入的木质托盘退板数大于余下托盘数，请重新输入！");
                            return false;
                        }
                        if(params.palletQuantityY > params.palletTypeyNum){
                            layer.alert("您输入的压模托盘退板数大于余下托盘数，请重新输入！");
                            return false;
                        }
                        if(params.palletQuantityS > params.palletTypesNum){
                            layer.alert("您输入的塑料托盘退板数大于余下托盘数，请重新输入！");
                            return false;
                        }
                        if(params.palletQuantityQ > params.palletTypeqNum){
                            layer.alert("您输入的其他托盘退板数大于余下托盘数，请重新输入！");
                            return false;
                        }
                        if(params.totalQuantity>$vue.$data.account.formTotalQuantity){
                            layer.alert("您的退板数目过量，请重新输入托盘数量");
                            return false;
                        }
                        if($('#returnAddress')[0].value == ""){
                            layer.alert('请输入收货地址');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.RENT.RETURN.CLIENT_NEXT_RETURN.SAVE,params, function (ret) {
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
})();

$('.distributionMode label').click(function(){
    $('.distributionMode label').removeClass('active');
    $(this).addClass('active');
});

























/**
 * Created by Administrator on 2017/10/13.
 */
