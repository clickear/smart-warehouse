import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '#xuanze',
        data: {
            wareCode:'',
            itemMasterId:'',
            masterItems:[],
            items:[],
        },
        methods: {
            changeWare:function(){

                var wareCode = document.getElementById("ware").value;
                IOT.setLocalStore("backWare", wareCode);
              //  M.Table.refresh.all();

                M.Page.emitRefreshPage();
                var wareCode = IOT.getLocalStore("backWare");

            },

            changeMaster:function(){

                var itemMasterId = document.getElementById("itemMaster").value;
                IOT.setLocalStore("itemMasterId", itemMasterId);
                //  M.Table.refresh.all();

                M.Page.emitRefreshPage();
                var itemMasterId = IOT.getLocalStore("itemMasterId");

            },
        },
        created: function () {

            IOT.setLocalStore("backWare", '');
            //获取仓库信息
            IOT.getServerData(URI.BASE.AREA.WARE,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.data.list;
                    $.each(list,function(i,v){
                        $vue.$data.items.push({text:v.wareName,value:v.wareCode})
                    });
                    var wareCode = $vue.$data.items[0].value;

                    IOT.setLocalStore("backWare", wareCode);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            IOT.setLocalStore("itemMasterId", '');
            //获取货主信息
            IOT.getServerData(URI.BASE.ITEM_MASTER.LIST,{},(ret) => {
                if (ret.code === 200) {

                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.masterItems.push({text:v.itemMasterName,value:v.itemMasterId})
                    });
                    var itemMasterId = $vue.$data.masterItems[0].value;

                    IOT.setLocalStore("itemMasterId", itemMasterId);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


        },
        mounted: function () {
            this.$nextTick(() => {
               /* var wareCode = document.getElementById("ware").value;
                IOT.setLocalStore("backWare", wareCode);*/

            });
        }
    });
})();