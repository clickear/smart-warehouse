import $ from 'jQuery';
(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.CREATE.PAGE));
    const EL = '.create-storage-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            info: {
                'storageName': '',
                'address': '',
                'address1':'',
                'phone': '',
                'linkmanName': '',
                'companyId': 0,
                'lng': '',
                'lat': '',
                'province':'',
                'city':''
            },
            list:[]
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            /*addressSelected:function(ev){
                $vue.$data.info.address = ev.address + ev.title;
                $vue.$data.info.province = ev.province;
                $vue.$data.info.city = ev.city;
                $vue.$data.info.lng = ev.point.lng;
                $vue.$data.info.lat = ev.point.lat;
                $vue.$data.list.length =0;
            }*/
        },
        created: function () {
        },
        mounted: function () {
            this.$nextTick(() => {
                let $createStorage = $(EL);
                $createStorage.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        storageName: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        address: {
                            required: true,
                            minlength: 1,
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
                        lng: {
                            required: true,
                            number: true,
                            minlength: 1,
                            maxlength: 15
                        },
                        lat: {
                            required: true,
                            number: true,
                            minlength: 1,
                            maxlength: 15
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        params.companyId = storeParams.companyId;
                        IOT.getServerData(URI.ORGANIZATION.CLIENT.STORAGE.CREATE.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                M.Table.refresh.storage();
                                M.Page.emitPrePage();
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
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            $vue.$data.info.province = local.getResults().province;
            $vue.$data.info.city = local.getResults().city;
            $vue.$data.info.lng = pp.lng;
            $vue.$data.info.lat = pp.lat;
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }


    /*旧的：通过地址，获取经纬度
    var map = new BMap.Map('search-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    var searchAddress = function(key){
        var options = {
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    console.log(JSON.stringify(results));
                    for (var i = 0; i < results.getCurrentNumPois(); i ++){
                        $vue.$data.list.push(results.getPoi(i));
                    }
                }
            }
        };
        var local = new BMap.LocalSearch(map, options);
        local.search(key);
    };
    $("input[name='address']").keyup(function () {
        $vue.$data.list.length =0;
        if(this.value.trim()){
            searchAddress(this.value.trim());
        }
    });*/
})();





















