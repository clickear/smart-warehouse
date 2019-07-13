import $ from 'jQuery';
import URI from 'URI';
(function () {
    let deviceId = IOT.getSessionStore(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE);
       let $vue = new Vue({
        el: '.lifecycle-detail-map-hook',
        data: {
            po: [116.337428, 39.90923],
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
                bLng: "120.219342",
                bLat: "31.56098",
                location:'广东省广州市白云区广州火车站附近'
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            showMap: function () {
                M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE, {deviceId: this.lifecycle.deviceId});
            },
            lastReport: function () {
                M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.LAST.PAGE, {deviceId: this.lifecycle.deviceId});
            },
            allReport: function () {
                M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.ALL_REPORTED_RECORD.PAGE, {deviceId: this.lifecycle.deviceId});
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let position = this.po;
                let point = new BMap.Point(position[0], position[1]);
                // 初始化地图
                let marker, lineArr = [];
                let map = new BMap.Map("commonMap");
                map.centerAndZoom(point, 14);
                map.enableScrollWheelZoom();
                // 逆地址解析方法
                var geoc = new BMap.Geocoder(); // 创建逆地址解析器
                IOT.getServerData(URI.ASSET.LIFECYCLE.DETAIL.DATA, {deviceId: deviceId}, (ret) => {
                    if (ret.code === 200) {
                        let data = ret.data;
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        let bLng = data.bLng;
                        let bLat = data.bLat;
                        let pt = new BMap.Point(bLng, bLat);
                        marker = new BMap.Marker(pt);
                        map.addOverlay(marker);
                        map.panTo(pt);
                        geoc.getLocation(pt, function(rs){
                            let addComp = rs.addressComponents;
                            let address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                            $vue.$data.lifecycle.location = address;
                        });
                    } else {
                        IOT.tips(ret.message || '连接错误！', 'error', 1000, null);
                    }
                })

            });
        }
    });
})();





















