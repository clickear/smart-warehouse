import $ from 'jQuery';

(function () {
    let $vue = null;
    $vue = new Vue({
        el: '.create-account-hook',
        data: {
            account: {
                'email': '',
                'gender': 0,
                'mobile': '',
                'userName': ''
            }
        },
        methods: {
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.client-create-hook').validate({
                    debug: true,
                    rules: {
                        mobile: {
                            required: true,
                            phoneCN: true,
                            minlength: 11,
                            maxlength: 11
                        },
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
                        },
                        password: {
                            required: true,
                            minlength: 8,
                            checkPwd: true,
                            maxlength: 20
                        },
                        confirmPassword: {
                            required: true,
                            equalTo: '#equalToPassowrd',
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.account;
                        IOT.getServerData(URI.ORGANIZATION.ACCOUNT.CLIENT_CREATE_ACCOUNT.SAVE, params, function (ret) {
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





















