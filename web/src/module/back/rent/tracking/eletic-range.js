/**
 * Created by Administrator on 2017/10/18.
 */
/**
 * Created by Administrator on 2017/10/14.
 */
require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.client-eletic-detail-hook',
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

// 百度地图API功能
function initMap(){
    var map = new BMap.Map("alarm_map");    // 创建Map实例
    var point = new BMap.Point(118.783, 32.050);  // 创建点坐标
    map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
    /*  map.enableScrollWheelZoom(true);  */   //开启鼠标滚轮缩放*/
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
}
$(function(){
    initMap();

})
