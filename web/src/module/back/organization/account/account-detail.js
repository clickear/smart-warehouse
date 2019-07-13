import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.ACCOUNT.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.account-detail-hook',
        data: {
            account: {
                'userId': 1,
                'mobile': '',
                'userName': '',
                'email': '',
                'roleName': '',
                'state': 'normal',
                'companyName': '',
                'registerTime': '',
                'gender': '',
                'genderText': ''
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.DETAIL.DATA, {userId: storeParams.userId}, (ret) => {
                if (ret.code === 200) {
                    ret.data.genderText = ret.data.gender === '0' ? '男' : '女';
                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
        },
        mounted: function () {
            this.$nextTick(() => {

            });
        }
    });
})();





















