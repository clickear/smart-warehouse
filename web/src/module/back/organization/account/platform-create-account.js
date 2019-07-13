import $ from 'jQuery';

(function () {

    /**
     * 选择公司
     * @private
     */
    let _selectCompany = function (companyList) {
        companyList = companyList || [];
        for (let i in companyList) {
            companyList[i].value = companyList[i].companyName;
        }
        // 选择所属单位
        $('#selectedCompany').autocomplete({
            source: companyList,
            focus: function (event, ui) {
                $('#selectedCompany').val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $vue.$data.account.companyId = ui.item.companyId;
                return false;
            }
        });
    };

    let $vue = new Vue({
        el: '.create-account-hook',
        data: {
            roleList: [],
            account: {
                'companyName': '',
                'companyId': '',
                'email': '',
                'gender': 0,
                'mobile': '',
                'password': '',
                'roleId': '',
                'userName': ''
            },
            companyList: []
        },
        created: function () {
            M.Request.getRoleList(true, (roleList, ret) => {
                this.roleList = roleList;
            });
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let $platform = $('.create-account-hook');
                M.Request.getCompanyList({}, true, (companyList, ret) => {
                    _selectCompany(companyList);
                    this.companyList = companyList;
                });

                $platform.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        selectedCompany: {
                            required: true
                        },
                        roleId: {
                            required: true
                        },
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
                    messages: {
                        password: {
                            required: '请输入密码',
                            minlength: '密码不能小于8位',
                            checkPwd: '(支持数字+字母+特殊符号)至少2种',
                            maxlength: '密码不能超过20位'
                        },
                        confirmPassword: {
                            equalTo: '两次密码输入不一致'
                        }
                    },
                    submitHandler: function (form) {
                        alert(1);
                        let params = $vue.$data.account;
                        let companyList = $vue.$data.companyList;
                        for (let i in companyList) {
                            if (companyList[i].companyName === params.companyName) {
                                break;
                            } else if (i == companyList.length - 1) {
                                IOT.tips(`你输入的所属单位[ ${params.companyName} ]不存在，请从新输入并选择！`, 'error', 1500, () => {
                                    params.companyName = '';
                                });
                                return false;
                            }
                        }
                        // console.log(JSON.stringify(params));
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.ORGANIZATION.ACCOUNT.PLATFORM_CREATE_ACCOUNT.SAVE, params, function (ret) {
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





















