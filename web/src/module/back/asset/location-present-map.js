import $ from 'jQuery';
import URI from 'URI';
(function () {
    let $vue = new Vue({
        el: '.location-present-map-hook',
        data: {
            po: [116.337428, 39.90923],
            show:{
                present: true, // 当前位置
                history: false // 历史轨迹
            },
            map: '',
            marker: '',
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
            checkMenu: function () {
                M.Page.emit(URI.ASSET.LOCATION.HISTORY.PAGE, {deviceId: this.lifecycle.deviceId});
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
                IOT.getServerData(URI.ASSET.LIFECYCLE.DETAIL.DATA, {deviceId: $('#deviceId').val()},  (ret) => {
                    if (ret.code === 200) {
                        let data = ret.data;
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        let pt = new BMap.Point(this.lifecycle.bLng, this.lifecycle.bLat);
                        marker = new BMap.Marker(pt);
                        map.addOverlay(marker);
                        map.panTo(pt);
                        geoc.getLocation(pt, function(rs){
                            let addComp = rs.addressComponents;
                            let address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                            $vue.$data.lifecycle.location = address;
                        });
                    }
                })

            });
        }
    });
})();





















