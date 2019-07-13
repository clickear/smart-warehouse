import $ from 'jQuery';
import URI from 'URI';
(function () {
    let $vue = new Vue({
        el: '.possess-detail-map-hook',
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
                // 初始化地图
                var map = new BMap.Map('commonMap'); // 限制了地图的最大和最小级别
                var point = new BMap.Point(116.404, 39.915);
                map.centerAndZoom(point, 5); // 初始化地图,设置中心点坐标和地图级别。
                map.enableScrollWheelZoom(); // 启用滚轮放大缩小
                IOT.getServerData(URI.ASSET.LIFECYCLE.DETAIL.DATA, {deviceId: $('#deviceId').val()},  (ret) => {
                    if (ret.code === 200) {
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        // console.log(JSON.stringify(this.lifecycle));
                        this.lifecycle.position = '116,39';
                        var pt = new BMap.Point(116, 39);
                        var marker = new BMap.Marker(pt);
                        map.addOverlay(marker);
                    }
                })

            });
        }
    });
})();





















