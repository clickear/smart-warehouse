/**
 * Created by Administrator on 2017/10/14.
 */
require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.client-rang-detail-hook',
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
        },
    });
})();

$('#set_range').click(function(){
    var rangeTitle = $('#range_title').val();
    if(rangeTitle == ""){
        alert('围栏信息不能为空');
    }else{
        $('#client_title').text(rangeTitle);
        $('#myModal').modal('hide')
    }
});

$(function(){
    var map = new BMap.Map("alarm_map");    // 创建Map实例
    var point = new BMap.Point(118.783, 32.050);  // 创建点坐标
    map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl({isOpen: true}));
    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingMode:BMAP_DRAWING_POLYGON,//绘制模式  多边形
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes:[
                BMAP_DRAWING_POLYGON
            ]
        },
        // circleOptions: styleOptions, //圆的样式
        // polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        // rectangleOptions: styleOptions //矩形的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', function () {
        alert('11');
    });
})
