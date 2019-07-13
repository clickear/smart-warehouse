import $ from 'jQuery';
import URI from 'URI';

(function () {
    let id = IOT.getSessionStore(URI.SYSTEM.WARN.DETAIL.PAGE);
    Vue.filter('alarmParamFilter', function (value) {
        if (value === 3) {
            return '确认地址与到货地址不一致';
        } else if (value === 4) {
            return '到货确认人与下单人不一致';
        } else if (value === 5) {
            return '超出地理围栏';
        }
        return '';
    });
    Vue.filter('actionFilter', function (value) {
        return value === 1 ? '到货确定' : '在途运输';
    });
    Vue.filter('stageFilter', function (value) {
        // 参数状态; normal=正常的(启用)；invalid=无效的(停用)；deleted=已删除；
        if (value === 'normal') {
            return '启用';
        } else if (value === 'invalid') {
            return '停用';
        } else if (value === 'deleted') {
            return '已删除';
        }
        return '';
    });
    // var myFilter = Vue.filter('myFilter');
    let $vue = new Vue({
        el: '.report-parameter-detail-hook',
        data: {
            info: {
                paramName: '', // 名称
                action: 1, // 告警动作：1=到货确认；2=在途运输；
                state: 'normal', // 参数状态
                alarmParam: 3, // 告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
                paramDescribe: '', // 描述
                terminalPosition: true // 告警时是否获取终端位置：0=否；1=是；
            }
        },
        created: function () {
            IOT.getServerData(URI.SYSTEM.WARN.DETAIL.DATA, {id: id}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            });
        }
    });
})();





















