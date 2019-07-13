require('../../../../less/back/rent/rent_detail.less');
/*require('../../../../../static/lib/ztree/css/zTreeStyle/zTreeStyle.css');*/
import $ from 'jQuery';

(function () {
    let $tree = null;
    let map = null;
    var initMap = function(){
        map = new BMap.Map("distribution_map");    // 创建Map实例
        var point = new BMap.Point(118.783, 32.050);  // 创建点坐标
        map.centerAndZoom(point, 15); //初始化地图,设置中心点坐标和地图级别
         map.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放*/
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
    };
    let currentNodes=new Array();
    let $vue = null;
    $vue = new Vue({
        el: '.distribution-main-hook',
        data: {
        },
        methods: {

        },
        computed:{

        },

        created: function () {

        },

        mounted: function () {

            this.$nextTick(() => {
                initMap();
                setCity();
                search("");

            });
        }
    });
    var setCity = function(){
        var cityCenter = function(result){
            var cityName = result.name;
            map.setCenter(cityName);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(cityCenter);
    };
    $("#search-btn").click(function(){
        var $form = $(".search-hook");
        var formParams = $form.serializeJson();
        search(formParams);
    });
    var search = function(formParams){
        var setting = {
            data: {
                simpleData: {
                    enable: true,
                    idKey: 'id',
                    pIdKey: 'pid',
                    rootPId: 0
                }
            },
            view:{
                selectedMulti: false,//不允许同时选中多个节点
                showIcon :false,
                showLine:false,
                addDiyDom: function addDiyDom(treeId, treeNode){
                    var sObj = $("#" + treeNode.tId + "_a");
                    var addStr = "<span class='pallent_span'>托盘数："+treeNode.palletCount+"</span>";
                    sObj.append(addStr);
                }
            },
            callback: {
                onClick:function onCheckTreeNode(event, treeId, treeNode){
                    currentNodes.length=0;
                    setCurrentNodes(treeNode);
                    drawOverlays();//展示网点标记
                }
            }
        };
        IOT.getServerData(URI.RENT.ALLOCATION.DETAIL.SUREORDER.STORAGE_TREE, formParams, (ret) => {
            IOT.showOverlay('获取数据中，请稍等...');
            if (ret.code === 200) {
                IOT.hideOverlay();
                currentNodes.length=0;
                let treeList = ret.data;
                $tree = $.fn.zTree.init($('#distribution_tree'), setting, treeList);
                $tree.expandAll(true);
                setCurrentNodes($tree.getNodes()[0]);
                drawOverlays();//展示网点标记
            } else {
                IOT.tips(ret.msg, 'error');
            }
        });
    };
    var setCurrentNodes = function(treeNode){
        if(treeNode.isParent){
            $.each(treeNode.children,function(i,node){
                if(node.isParent){
                    setCurrentNodes(node);
                }else{
                    currentNodes.push(node);
                }
            });
        }else{
            currentNodes.push(treeNode);
        }
    };

    var drawOverlays = function(){
        if(currentNodes.length==1&&currentNodes[0].id==1){
            setCity();
            map.clearOverlays();
            return;
        }
        map.clearOverlays();
        var pointArray = new Array();
        $.each(currentNodes,function(i,node){
            var point = new BMap.Point(node.lng, node.lat);
            var fnIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(0, 0),
                imageOffset: new BMap.Size(0, 0 - 11 * 25)
            });
            var marker = new BMap.Marker(point,{icon: fnIcon });        // 创建标注
            map.addOverlay(marker);
            if(i==currentNodes.length-1){
              //  map.panTo(point);
            }
            pointArray.push(point);
            var opts = {
                 width : 280,     // 信息窗口宽度
                 height: 150,     // 信息窗口高度
            };
            marker.addEventListener("mouseover",function(e){
                var mouseovermsg = "<html><body><p>网点：" + node.name +
                    "</p><p>托盘：" + node.palletCount +
                    "</p><p>公司：" + node.companyName +
                    "</p><div style='word-wrap: break-word;'>地址：" + node.address +
                    "</div></body></html>";
                var infoWindow = new BMap.InfoWindow(mouseovermsg, opts);
                marker.openInfoWindow(infoWindow);
            });

            marker.addEventListener("mouseout",function(){
                marker.closeInfoWindow();
            });
        });
        map.setViewport(pointArray);
    };
})();

