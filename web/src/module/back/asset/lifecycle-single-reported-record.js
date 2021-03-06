import $ from 'jQuery';
import URI from 'URI';
(function () {
    let deviceId = IOT.getSessionStore(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE);
    let historyPositionId = IOT.getSessionStore(URI.ASSET.LIFECYCLE.DETAIL.SINGLE_REPORTED_RECORD.PAGE);
    let $vue = new Vue({
        el: '.lifecycle-single-reported-record-hook',
        data: {
            lifecycle: {
                historyPositionId:'',
                uploadTime:'',
                cellId:'',
                lac:'',
                userData:'',
                chipInfoTime:'',
                voltage:'',
                lowVoltageAlarm:'',
                signalLevel:'',
                hourLong: '',
                rfidCode: '',
                defaultUserData: ''
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            rfidSearch: function () {
                this.lifecycle.userData = this.lifecycle.defaultUserData;
                let reg=new RegExp(this.lifecycle.rfidCode,'g');
                let $1 = this.lifecycle.rfidCode;
                this.lifecycle.userData = this.lifecycle.userData.replace(reg,'<i class="stress">'+ $1 +'</i>');
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                IOT.getServerData(URI.ASSET.LIFECYCLE.DETAIL.SINGLE_REPORTED_RECORD.DATA, {deviceId: deviceId, historyPositionId: historyPositionId},  (ret) => {
                    if (ret.code === 200) {
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        // console.log(JSON.stringify(this.lifecycle));
                        this.lifecycle.lowVoltageAlarm = (ret.data.lowVoltageAlarm === false ? '否' : '是');
                        this.lifecycle.defaultUserData = ret.data.userData;
                    }
                })

            });
        }
    });
})();





















