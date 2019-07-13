import $ from 'jQuery';
import URI from 'URI';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.SYSTEM.WARN.CREATE.PAGE));
    let action = storeParams.action;
    let $vue = new Vue({
        el: '.create-or-modify-warn-hook',
        data: {
            title: action === ACTION.CREATE ? '新增' : '修改',
            info: {
                paramName: '', // 名称
                action: 1, // 告警动作：1=到货确认；2=在途运输；
                state: 'normal', // 参数状态; normal=正常的(启用)；invalid=无效的(停用)；deleted=已删除；
                alarmParam: 3, // 告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
                paramDescribe: '', // 描述
                terminalPosition: true // 告警时是否获取终端位置：0=否；1=是；
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            }
        },
        created: function () {
            if (action === ACTION.MODIFY) {
                IOT.getServerData(URI.SYSTEM.WARN.MODIFY.DATA, {id: storeParams.id}, (ret) => {
                    if (ret.code === 200) {
                        console.log(JSON.stringify(ret.data));
                        this.info = $.extend({}, this.info, ret.data);
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let $createOrModify = $('.create-or-modify-warn-hook');
                $createOrModify.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        paramName: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        paramDescribe: {
                            required: true,
                            maxlength: 200
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        let url = URI.SYSTEM.WARN.CREATE.SAVE;
                        if (action === ACTION.MODIFY) {
                            url = URI.SYSTEM.WARN.MODIFY.SAVE;
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





















