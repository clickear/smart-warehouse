require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-area-hook',
        data: {
            info:{



                wareCode:'',
                areaName:'',
                memo:'',

            },
            items:[],
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
                    var  list = ret.data.list;
                    $.each(list,function(i,v){
                        $vue.$data.items.push({text:v.wareName,value:v.wareCode})
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

            changeVal:function(){
                //$('#priceReview').trigger('click');
                flag =0;
            },



        },
        mounted: function () {
            this.$nextTick(() => {
                $('.create-area-form').validate({
                    debug: true,
                    rules: {

                    },
                    messages:{

                    },
                    submitHandler: function (form) {

                        let params = $vue.$data.info;

                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.BASE.AREA.AREA_ADD.SAVE,params, function (ret) {
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
            })
        }
    });


})();

