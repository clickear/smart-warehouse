import $ from 'jQuery';
import URI from 'URI';
(function () {
    let $vue = new Vue({
        el: '.location-detail-hook',
        data: {
            lifecycle: {
                deviceId: '',
                durationType: '',
                company: '',
                address: '',
                phone: '',
                lifeCycleDesign: '',
                lifeCycleRemaining: '',
                activateTime: '',
                businessStatus: '',
                wasteStatus: '',
                dumpEnergy: '',
                position: '116,39'
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            showMap: function () {
                M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE, {deviceId: this.lifecycle.deviceId});
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                IOT.getServerData(URI.ASSET.LIFECYCLE.DETAIL.DATA, {deviceId: $('#deviceId').val()},  (ret) => {
                    if (ret.code === 200) {
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        // console.log(JSON.stringify(this.lifecycle));
                        this.lifecycle.position = '116,39';
                    }
                })

            });
        }
    });
})();





















