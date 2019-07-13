import $ from 'jQuery';
import URI from 'URI';
(function () {
    let map;   //百度地图对象
    var timer; // 定时器
    var index = 0; //记录播放到第几个point
    var points = [];
    var car;   //汽车图标
    // 开始播放
    function _play() {

        let point = points[index];
        if (index > 0) {
            map.addOverlay(new BMap.Polyline([points[index - 1], point], {
                strokeColor: "red",
                strokeWeight: 5,
                strokeOpacity: 1
            }));
        }
        car.setPosition(point);
        index++;
        if (index < points.length) {
            timer = setTimeout(function () {
                _play();
            }, 20);
        } else {
            map.clearOverlays();
            map.addOverlay(new BMap.Polyline(points, {
                strokeColor: "red",
                strokeWeight: 5,
                strokeOpacity: 1
            }));

            //显示小车子
            map.addOverlay(car);
            map.panTo(point);
        }
    }

    //计算两点之间坐标点
    function _count(start, end, pts) {
        let x1 = start.lng;
        let y1 = start.lat;
        let x2 = end.lng;
        let y2 = end.lat;
        let pointIndex = 100;
        let polyline = new BMap.Polyline([start, end]);
        let chang = BMapLib.GeoUtils.getPolylineDistance(polyline);
        if (chang < 10000) {
            pointIndex = 10;
        } else if (10000 < chang && chang < 100000) {
            pointIndex = 100;
        } else if (100000 < chang && chang < 1000000) {
            pointIndex = 1000;
        } else if (1000000 < chang && chang < 10000000) {
            pointIndex = 10000;
        } else {
            pointIndex = 50000;
        }
        for (let i = pointIndex; i < chang; i += pointIndex) {
            let x3 = i / chang * (x2 - x1) + x1;
            let y3 = i / chang * (y2 - y1) + y1;
            let point = new BMap.Point(x3, y3);
            pts.push(point);
        }
    }

    let $vue = new Vue({
        el: '.location-history-map-hook',
        data: {
            po: [116.337428, 39.90923],
            show: {
                present: true, // 当前位置
                history: false, // 历史轨迹
                continue: false, // 暂停
            },
            able: false,

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
                bLat: "31.56098"
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            startPlay: function () {
               this.able = true;
                _play();
            },
            fnPause: function () {
                this.show.continue = true;
                if (timer) {
                    clearTimeout(timer);
                }
            },
            fnReset: function () {
                this.able = false;
                this.show.continue = false;
                if (timer) {
                    clearTimeout(timer);
                }
                index = 0;
                map.clearOverlays();
                //连接所有点
                map.addOverlay(new BMap.Polyline(points, {
                    strokeColor: "black",
                    strokeWeight: 5,
                    strokeOpacity: 1
                }));
                car.setPosition(points[0]);
                map.addOverlay(car);
                // map.panTo(centerPoint);
            },
            fnContinue: function () {
                this.show.continue = false;
                _play();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let $defaultHook = $('.location-history-map-hook');
                let date=new Date();
                date.setDate(1);
                // 初始化时间插件
                $defaultHook.find('input[name=activateStartTime]').datetimepicker({
                    value: date,
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    // onChangeDateTime: function (dateText, inst) {
                    //     $vue.$data.info.establishDate = new Date(dateText).Format('yyyy-MM-dd');
                    // },
                    timepicker: false // 关闭时间选项
                });
                $defaultHook.find('input[name=activateEndTime]').datetimepicker({
                    value: new Date(),
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    timepicker: false // 关闭时间选项
                });
                let centerPoint;
                //初始化地图,选取第一个点为起始点
                map = new BMap.Map("historyMap");
                map.centerAndZoom(new BMap.Point(116.00100, 22.550000), 12);
                map.enableScrollWheelZoom();
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl({isOpen: true}));

                //画面移动到起点和终点的中间
                // centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
                // map.panTo(centerPoint);

                //获取所有点的坐标
                let params = {
                    deviceId:$('#deviceId').val(),
                    startDate: $defaultHook.find('input[name=activateStartTime]').val(),
                    endDate: $defaultHook.find('input[name=activateEndTime]').val()
                };
                IOT.getServerData(URI.ASSET.LOCATION.HISTORY.DATA, params, (ret) => {
                    if (ret.code === 200) {
                        let data = ret.data;
                        this.lifecycle = $.extend({}, this.lifecycle, ret.data);
                        // console.log(JSON.stringify(this.lifecycle));
                        // this.marker.setPosition([this.lifecycle.gLng, this.lifecycle.gLat]);
                        // this.map.setCenter([this.lifecycle.gLng, this.lifecycle.gLat]);
                        data = [
                            {
                                bLng: 115,
                                bLat: 39
                            },
                            {
                                bLng: 114,
                                bLat: 38
                            },
                            {
                                bLng: 114,
                                bLat: 40
                            },
                            {
                                bLng: 116,
                                bLat: 42
                            }
                        ];
                        for (let i = 0; i < data.length-1; i++) {
                            let p1 = new BMap.Point(data[i].bLng, data[i].bLat);
                            let p2 = new BMap.Point(data[i+1].bLng, data[i+1].bLat);
                            _count(p1, p2, points);
                        }
                        map.setViewport(points);
                        //连接所有点
                        map.addOverlay(new BMap.Polyline(points, {
                            strokeColor: "black",
                            strokeWeight: 4,
                            strokeOpacity: 1
                        }));

                        //显示小车子
                        car = new BMap.Marker(points[0]);
                        map.addOverlay(car);
                    }
                })

            });
        }
    });
})();





















