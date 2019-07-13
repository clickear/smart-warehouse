import $ from 'jQuery';
let markerData = new Array(); //存放当前列表的所有标记信息
var map = null;    // 创建Map实例
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.LOCATION_INFO.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {

        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            },
        },
        created:function(){
            console.log(orderData.transportBillNo);
        },
        mounted: function () {
            //初始化地图
            initMap();
            //初始化列表
            this.$nextTick(() => {
                var $accountBox = $('.location-info-table-hook');
                let $form = $('.form-search-location-info');
                // 查询
                $('.search-hook').on('click', function () {
                    $($accountBox).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.bootstrapTable({
                    scrollbar: 'location-info-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.TRACKING.TRAY_INFO.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    customButton: '',
                    customQueryParams: function (params) {
                        let formParams = $form.serializeJson();
                        formParams.transportBillNo = orderData.transportBillNo;
                        let queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    columns: [
                        {
                            field: 'deviceId', title: '', align: 'center', fixedLeft: true,
                            events: {
                                'click .location-tray': function (e, value, row, index) {
                                    showInfo(row);//展示位置信息
                                    showCurrentMarker(value);//展示当前托盘位置
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="location-tray">'+value+'</a>';
                            }
                        }
                    ],
                    onLoadSuccess:function(data){
                        //初始化所有标记
                        drawMapMarker(data.rows);
                    }
                });
            });

        }
    });

})();

// 百度地图API功能
function initMap(){
    map = new BMap.Map("location_map");
    var point = new BMap.Point(118.783, 32.050);  // 创建点坐标
    map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
  /*  map.enableScrollWheelZoom(true);  */   //开启鼠标滚轮缩放*/
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
}

/**
 * 展示所有标记
 * @param data
 */
function drawMapMarker(data){
    map.clearOverlays();
    markerData.length=0;
    var points = new Array();
    for(var i = 0,pointsLen = data.length;i <pointsLen;i++){
        var point = new BMap.Point(data[i].bLng, data[i].bLat);
        var fnIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(0, 0),
            imageOffset: new BMap.Size(0, 0 - 11 * 25)
        });
        var marker = new BMap.Marker(point,{icon: fnIcon });        // 创建标注
        map.addOverlay(marker);
        markerData.push({id:data[i].deviceId,marker:marker,point:point,isSelected:false});
        points.push(point)
    }
    if(points.length==1){
        markerData[0].marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }
    map.setViewport(points);
}

/**
 * 展示当前托盘位置
 * @param id
 */
function showCurrentMarker(id){
    $.each(markerData,function(i,item){
        if(item.isSelected=true){
            item.isSelected=false;
            item.marker.setAnimation(null);
        }
    });
    $.each(markerData,function(i,item){
        if(item.id==id){
            item.isSelected=true;
            item.marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            //map.panTo(item.point);
            var points = new Array();
            points.push(item.point)
            map.setViewport( points );
            return;
        }
    });
}

/**
 * 展示托盘信息
 * @param pointInfo
 */
function showInfo (pointInfo) {
    $('.location_info').empty();
    var sContent =
        "<p style='font-size:14px;display:inline-block;margin-right:20px;'><span>托盘ID：</span>"+pointInfo.deviceId+"</p>"
        +"<p style='font-size:14px;display:inline-block;'><span>托盘位置：</span></span>"+ pointInfo.positionAddress +"</p>"
    $('.location_info').append(sContent);
}

$(function(){

})

