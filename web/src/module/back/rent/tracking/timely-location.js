import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.TRAY_INFO.TIMELY_LOCATION.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            info:orderData
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            }
        }
    });
    
    let map = new BMap.Map("location_map");
    // 百度地图API功能
    function initMap(){
        let point = new BMap.Point(118.783, 32.050);  // 创建点坐标
        map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放*/
        map.addControl(new BMap.NavigationControl());//添加控件
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
    }
    function drawMapMarker(data){
        map.clearOverlays();
        let point = new BMap.Point(data.longitude, data.latitude);
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.panTo(point);
    }
    initMap();
    let data= {
        longitude:orderData.bLng,
        latitude:orderData.bLat,
        address:orderData.positionAddress,
        ID:orderData.deviceId
    };
    drawMapMarker(data);
})();