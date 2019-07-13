import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.AGENT.STORAGE.MODIFY.PAGE));
    const EL = '.modify-storage-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            info: {
                storageId: '',
                storageName: '',
                address: '',
                phone: '',
                linkmanName: '',
                lng: '',
                lat: ''
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.AGENT.STORAGE.MODIFY.DATA, {storageId: storeParams.storageId}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                let $modifyStorage = $(EL);
                $modifyStorage.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        name: {
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        },
                        address: {
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        },
                        registerAddress: {
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        IOT.getServerData(URI.ORGANIZATION.AGENT.STORAGE.MODIFY.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                M.Table.refresh.storage();
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





















