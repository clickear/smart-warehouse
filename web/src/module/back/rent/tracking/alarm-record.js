/**
 * Created by Administrator on 2017/10/14.
 */
require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
/**
 * Created by Administrator on 2017/10/14.
 */
(function () {
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {

        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.alarm-table-hook');

                var $tableHook = $accountBox.bootstrapTable({
                    scrollbar: 'alarm-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.TRACKING.ALARM_RECORD.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 12,
                    // fixedColumns: true,
                    customButton: '',
                    onLoadSuccess: function () {
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'count', title: '告警类型', align: 'center', fixedLeft: true,width:120
                        },
                        {
                            field: 'count', title: '托盘ID', align: 'center', fixedLeft: true,width:120
                        },
                        {
                            field: 'count', title: '告警时间', align: 'center', fixedLeft: true,width:120
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:80,
                            events: {
                                'click .detail-account': function (e, value, row, index) {

                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看位置</a>`;

                            }
                        }
                    ]
                });
            });
        }
    });
})();

var map = new BMap.Map("alarm_map");    // 创建Map实例
var data= [
    {longitude:118.784, latitude:32.052, address:'卡子门大街1号', ID:'3333'},
    {longitude:118.789, latitude:32.058, address:'卡子门大街2号', ID:'33322'},
    {longitude:118.791, latitude:32.060, address:'卡子门大街3号', ID:'33331'}
];

// 百度地图API功能
function initMap(){

    var point = new BMap.Point(118.783, 32.050);  // 创建点坐标
    map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
    /*  map.enableScrollWheelZoom(true);  */   //开启鼠标滚轮缩放*/
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
}
function drawMapMarker(data){
    map.clearOverlays();
    for(var i = 0,pointsLen = data.length;i <pointsLen;i++){
        var point = new BMap.Point(data[i].longitude, data[i].latitude);
        var fnPoint = new BMap.Point(118.783, 32.050);
        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25));
        var fnIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(0, 0),
            imageOffset: new BMap.Size(0, 0 - 11 * 25)
        });
        var marker = new BMap.Marker(point,{icon: myIcon });        // 创建标注
        var fnMarker = new BMap.Marker(fnPoint,{icon: fnIcon });   //终点图标位置
        map.addOverlay(fnMarker);
        map.addOverlay(marker);
        var lbl = new BMap.Label("终点", {offset: new BMap.Size(10, 6)});
        lbl.setStyle({borderWidth: 0,background: "transparent",fontWeight: "700", fontSize: "15px"});
        fnMarker.setLabel(lbl);
        (function() {

            var thePoint = data[i];
            marker.addEventListener("click",function(){
                showInfo(this,thePoint);
            });
        })();

    }

}
function showInfo (thisMaker,pointInfo) {
    var sContent =
        "<p style='font-size:14px;'><span>托盘ID：</span>"+pointInfo.ID+"</p>"
        +"<p style='font-size:14px;'><span>托盘位置：</span></span>"+pointInfo.address+"</p>"
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    thisMaker.openInfoWindow(infoWindow);   //图片加载完毕重绘infowindow
}
$(function(){

    initMap();
    drawMapMarker(data);
})
