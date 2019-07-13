import $ from 'jQuery';
require('../../../../less/back/task/cell.less');
var wareCode = IOT.getLocalStore("baseWare");
(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            info:{
              cellName:'',
              shelfName:'',
            },
            areaItems : [],
            shelfItems : [],
            cellItems:[],
            areaCode:'',
            shelf:{},
            palletBatchs:[],
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/task/cell/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            items:[{"text":"aaa","value":"bbb"}],
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
         
                M.Page.refreshPage(this.boxs);
            },
            selectBillMaster:function(){
                let tableHookName2 = '.ScanResults2-table-hook';
            },
            clickShelf:function(shelfCode){
                if(shelfCode =='' ||shelfCode == null){
                    var cellsData = [{sRow:6,sColumn:9,state:0}]
                    this.innertCells(cellsData);
                }else{
                    IOT.getServerData(URI.BASE.CELL.LIST2,{shelfCode:shelfCode},(ret) => {
                        if (ret.code === 200) {
                            var  list = ret.data.list;
                            this.innertCells(list);

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }
            },
            clickCell:function(cell){
                var cellCode = cell.cellCode;

                $vue.$data.info.cellName = cell.sRow+'行'+'—'+cell.sColumn+'列'+'('+cell.cellCode+')';
                $vue.$data.palletBatchs = [];
                IOT.getServerData(URI.BASE.PLLET.BATCH,{cellCode:cellCode},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.rows;
             
                        for(var i = 0;i<list.length;i++){
                            if(list[i].palletType ==0){   //虚拟托盘
                                var color = "background-color:#DCDCDC"
                                list[i].color = color;
                            }
                            if(list[i].palletType ==1){   //实际托盘
                                var color = "background-color #ACCD3C"
                                list[i].color = color;
                            }
                        }
                        $vue.$data.palletBatchs = list;
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            changeArea:function(){
                $vue.$data.shelfItems = [];
                var areaCode = $vue.$data.areaCode;
                IOT.getServerData(URI.BASE.SHELF.LIST2,{areaCode:areaCode},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.data.list;
                        if(list.length>0){
                            $vue.$data.shelfItems = list;
                            $vue.$data.shelf =list[0];
                            this.getCellsData();
                        }


                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            getCellsData :function () {

                var shelf = $vue.$data.shelf;
                $vue.$data.info.shelfName = shelf.areaName +'-'+shelf.shelfName;
                 var width=100/shelf.shelfColumn  +"%";
                 width = "width:"+width;

                if(shelf.shelfCode =='' ||shelf.shelfCode == null){
                    var cellsData = [{sRow:6,sColumn:9,state:0}]
                 //   this.innertCells(cellsData);
                }else{
                    IOT.getServerData(URI.BASE.CELL.LIST2,{shelfCode:shelf.shelfCode},(ret) => {
                        if (ret.code === 200) {

                            var  list = ret.data.list;
                            for(var i = 0;i<list.length;i++){
                                var color;
                                var stateName ;
                                if(list[i].state ==0){
                                    stateName = '无货'
                                    color ='#DCDCDC';
                                }else if(list[i].state ==1){
                                    stateName = '有货'
                                    color ='#00FFFF';
                                }else if(list[i].state ==2){
                                    stateName = '锁定'
                                    color ='#3C4E76';
                                }else if(list[i].state ==3){
                                    stateName = '暂停'
                                    color ='#FF4500';
                                }
                                color ='background-color:'+color;
                                list[i].style=width ;
                                list[i].color=color ;
                                list[i].stateName = stateName;


                            }
                            $vue.$data.cellItems = list;
                            this.clickCell(list[0]);

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });

                }

            },

        },
        created:function(){





        },

        mounted: function () {
            this.$nextTick(() => {
                document.getElementById('contain').style.height=window.innerHeight * 0.78 +'px';


                var that = this;
                //获取货区信息
                var wareCode = IOT.getLocalStore("backWare");
                IOT.getServerData(URI.BASE.AREA.LIST2,{wareCode:wareCode},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.data.list;
                        if(list.length != 0){
                            $.each(list,function(i,v){
                                $vue.$data.areaItems.push({text:v.areaName,value:v.areaCode})
                            });
                            $vue.$data.areaCode = list[0].areaCode;
                            $vue.$data.shelfItems = [];
                            that.changeArea();
                        }

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            });
        }
    });
})();










