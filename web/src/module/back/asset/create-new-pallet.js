/**
 * Created by Administrator on 2017/12/5.
 */
import $ from 'jQuery';
(function () {
    let $vue = null;
    $vue = new Vue({
        el: '.create-pallet-hook',
        data: {
            info:{
                deviceId:''
            }
        },
        created: function () {
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.client-create-pallet-hook').validate({
                    debug: true,
                    rules: {
                        palletId:{
                            required:true
                        }
                    },
                    submitHandler: function (form) {

                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        IOT.getServerData(URI.ASSET.LIFECYCLE.CREATE_PALLET.SAVE,params, function (ret) {
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
})();

















