import $ from 'jQuery';
(function () {
    let $vue = null;
    $vue = new Vue({
        el: '.create-platform-branch-hook',
        data: {
            info: {
                storageName: '',
                address: '',
                address1: '',
                phone: '',
                linkmanName: '',
                companyId: '1',
                storageType:'1',
                baseStationId:'',//基站ID
                lng: '',
                lat: '',
                province:'',
                city:''
            },
            list:[]
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            baseStationId:function() {
                console.log(this.info.baseStationId);
                console.log($vue.$data.info.baseStationId);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.create-platform-branch-hook .form-hook').validate({
                    debug: true,
                    rules: {
                        storageName: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        address: {
                            required: true,
                            minlength: 2,
                            maxlength: 120
                        },
                        phone: {
                            required: true,
                            phoneCN: true,
                            minlength: 11,
                            maxlength: 11
                        },
                        linkmanName: {
                            required: true,
                            minlength: 2,
                            maxlength: 30
                        },
                        baseStationId: {
                            required: true,
                            minlength: 1,
                            maxlength: 109
                        }
                    },
                    submitHandler: function (form) {
                        if($.trim($vue.$data.info.storageName) == ""){
                            layer.alert('仓储点名称不能为空');
                            return false;
                        }
                        if($.trim($vue.$data.info.address1) == ""){
                            layer.alert('仓储点地址不能为空');
                            return false;
                        }
                        if($.trim($vue.$data.info.address) == ""){
                            layer.alert('请按输入地址的搜索列表结果选择仓储点地址');
                            return false;
                        }
                        if($.trim($vue.$data.info.linkmanName) == ""){
                            layer.alert('仓储点联系人不能为空');
                            return false;
                        }
                        if($.trim($vue.$data.info.baseStationId) == ""){
                            layer.alert('基站ID不能为空');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        IOT.getServerData(URI.ORGANIZATION.PLATFORM_BRANCH.CREATE_PLATFORM_BRANCH.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                M.Page.emitPrePage();
                                M.Table.refresh.all();
                                IOT.tips('保存成功！', 'success');
                            } else {
                                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            }
                        });
                        return false;
                    }
                });
            });
        }
    });
    
    var map = new BMap.Map('search-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"address"
            ,"location" : map
        });
    $('#address').keyup(function(){
        $vue.$data.info.address = "";
    });
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $("#address_list").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        console.log(e);
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        $vue.$data.info.address1 = myValue;
        $vue.$data.info.address = myValue;
        $("#address_list").innerHTML ="";
        setPlace();
    });
    //获取经纬度
    function setPlace(){
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
            var point = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            $vue.$data.info.province = local.getResults().province;
            $vue.$data.info.city = local.getResults().city;
            $vue.$data.info.lng = point.lng;
            $vue.$data.info.lat = point.lat;
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
})();