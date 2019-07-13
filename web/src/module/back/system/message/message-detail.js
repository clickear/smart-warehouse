import $ from 'jQuery';
import URI from 'URI';
(function () {
    let paramId = IOT.getSessionStore(URI.SYSTEM.MESSAGE.DETAIL.PAGE);
    let $vue = new Vue({
        el: '.msg-parameter-detail-hook',
        data: {
            msg: {
                'paramId': '',
                'paramName': '',
                'paramDescribe': '',
                'state': '',
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
                IOT.getServerData(URI.SYSTEM.MESSAGE.DETAIL.DATA, {id: paramId}, (ret) => {
                    if (ret.code === 200) {
                        this.msg = $.extend({}, this.msg, ret.data);
                        if (this.msg.state === 'normal') {
                            this.msg.state = '启用';
                        } else {
                            this.msg.state = '禁用';
                        }
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            });
        }
    });
})();





















