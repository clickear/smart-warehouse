import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.AGENT.STORAGE.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.storage-detail-hook',
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
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.AGENT.STORAGE.DETAIL.DATA, {storageId: storeParams.storageId}, (ret) => {
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





















