import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.ACCOUNT.MODIFY.PAGE));
    let $vue = new Vue({
        el: '.modify-account-hook',
        data: {
            account: {
                userId: '',
                mobile: '',
                userName: '',
                email: '',
                roleName: '',
                state: 'enable', // enable=启用，disable=停用
                companyName: '',
                registerTime: '',
                gender: 0
            }
        },
        methods: {
            prevStep: function () {
              
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.MODIFY.DATA, {userId: storeParams.userId}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                let $modifyAccount = $('.modify-account-hook');
                $modifyAccount.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        email: {
                            email: true,
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        },
                        userName: {
                            required: true,
                            minlength: 1,
                            maxlength: 10
                        }
                    },
                    messages: {
                        realName: {
                            required: '请输入姓名！'
                        },
                        email: {
                            required: '请输入邮箱！'
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.account;
                        IOT.getServerData(URI.ORGANIZATION.ACCOUNT.MODIFY.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                M.Table.refresh.all();
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





















