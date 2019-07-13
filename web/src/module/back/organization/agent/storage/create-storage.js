import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.AGENT.STORAGE.CREATE.PAGE));
    const EL = '.create-storage-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            info: {
                'storageName': '',
                'address': '',
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
            addressSelected:function(ev){
                $vue.$data.info.address = ev.address + ev.title;
                $vue.$data.info.province = ev.province;
                $vue.$data.info.city = ev.city;
                $vue.$data.info.lng = ev.point.lng;
                $vue.$data.info.lat = ev.point.lat;
                $vue.$data.list.length =0;
            }
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
    });
})();





















