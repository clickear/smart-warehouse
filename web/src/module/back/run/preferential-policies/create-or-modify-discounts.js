import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.RUN.PREFERENTIAL_POLICIES.CREATE.PAGE));
    let action = storeParams.action;
    let EL = '.create-or-modify-discounts-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            title: action === ACTION.CREATE ? '新增' : '修改',
            info: {
                title: '',
                infoType: 0, // 0：租赁优惠；1：用户推广
                isLink: 0, // 是否外链
                linkUrl: '',
                infoContent: ''
            }
        },
        created: function () {

        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                UE.delEditor('edit-content');
                var ue = UE.getEditor('edit-content');
                if (action === ACTION.MODIFY) {
                    IOT.getServerData(URI.RUN.PREFERENTIAL_POLICIES.MODIFY.DATA, {id: storeParams.id}, (ret) => {
                        if (ret.code === 200) {
                            setTimeout(function () {
                                ue.setContent(ret.data.infoContent || '');
                                // 一定要延时执行，不然会报错；
                            }, 100);
                            this.info = $.extend({}, this.info, ret.data);
                            this.info.infoContent = this.info.infoContent || '';
                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }
                let $createModify = $(EL);
                $createModify.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        title: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        linkUrl: {
                            required: true,
                            url: true,
                            maxlength: 200
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        let content = ue.getContent();
                        params.infoContent = content;
                        let url = URI.RUN.PREFERENTIAL_POLICIES.CREATE.SAVE;
                        if (action === ACTION.MODIFY) {
                            url = URI.RUN.PREFERENTIAL_POLICIES.MODIFY.SAVE;
                        }
                        IOT.getServerData(url, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                if (action === ACTION.CREATE) {
                                    M.Page.emitPrePage();
                                }
                                M.Table.refresh.all();
                            } else {
                                IOT.tips(ret.message || '操作失败，请重试！', 'error');
                            }
                        });
                        return false;
                    }
                });
            });
        }
    });
})();
















