require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-task-hook',
        data: {
            info:{
                wareidint:'',
                areaidint:'',
                shelfIdInt:'',
                shelfRows:'',
                shelfColumns:''

            },
            wareItems:[],
            areaItems:[],
            shelfItems:[],

            list:[],
            account:{}
        },
        computed:{


            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
        },
        created: function () {
            //获取仓库信息
            IOT.getServerData(URI.BASE.AREA.WARE,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.data;
                    $.each(list,function(i,v){
                        $vue.$data.wareItems.push({text:v.warenamevch,value:v.wareidint})
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
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },


            changeWare:function(ele){
                var selectVal = ele.currentTarget.value;
                //获取货区信息
                IOT.getServerData(URI.BASE.AREA.LIST2,{wareidint:selectVal},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.data.list;
                        $.each(list,function(i,v){
                            $vue.$data.areaItems.push({text:v.areanamevch,value:v.areaidint})
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            changArea:function(ele){
                var selectVal = ele.currentTarget.value;
                //获取货架信息
                IOT.getServerData(URI.BASE.SHELF.LIST2,{areaidint:selectVal},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.data.list;

                        $.each(list,function(i,v){
                            $vue.$data.shelfItems.push({text:v.shelfidint,value:v.shelfidint})
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            commit:function(){
                $('.next-create-return-form').validate({
                    debug: true,

                    submitHandler: function (form) {


                        let params = $vue.$data.info;

                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.BASE.CELL.CELL_ADD_ALL.SAVE,params, function (ret) {
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


            },

            rowChangeVal:function(){

                if($vue.$data.info.palletTypesNum < 500){
                    layer.alert("您输入的塑料托盘数不得小于500块，请重新输入！");
                    return false;
                }
            }



        },
        mounted: function () {
            this.$nextTick(() => {

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

/*$('.returnMode label').click(function(){
    $('.returnMode label').removeClass('active');
    $(this).addClass('active');
    let gender=$('input:radio[name="returnMode"]:checked').val();
    if (gender == 1){
        $('.pallet').attr('readonly','readonly');
    }else {
        $('.pallet').removeAttr('readonly');
    }
});*/

$('.distributionMode label').click(function(){
    $('.distributionMode label').removeClass('active');
    $(this).addClass('active');
});