import $ from 'jQuery';

require('../../../../../static/lib/jquery/jquery-barcode.min');
(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {

            upInsert:{},

            masterData:masterData,
            rowData:{},

            upInsert:{
                billNo:masterData.billNo,
            },
            prepareInsert:{
                prepareType:'',
                taskBatch:'',
                billNo:masterData.billNo,
            },
            insertData:{
                billMaster:JSON.parse(IOT.getSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE)),
                billDetails:[],

            },
            batch:{},

            areaModel : '',
            shelModel : '',
            Strategy1 : '1',
            Strategy2 : '2',
            Strategy3 : '3',
            Strategy4 : '4',
            Strategy5 : '5',
            Strategy6 : '6',
            mywareCode : '',
            isShowButton : true


        },
        created:function (){
            if(masterData.state   =='1'){  //初始化状态可以删除、审核
                $('#export').after('<button class="primary_btn"  @click.stop="deleteBill()">删除</button><button class="primary_btn"  @click.stop="checkBill()">审核</button><button class="primary_btn" id="accept"data-toggle="modal" data-target="#acceptMasterModal">验收</button>')
            }
            if(masterData.stateint   =='2'){  //审核状态，可以完成
                $('#export').after('<button class="primary_btn"  @click.stop="okBill()">下发上架任务</button>')
            }

            //获取详情信息
            IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:masterData.billNo},(ret) => {
                debugger;
                if (ret.code === 200) {
                    var  list = ret.rows
                    if (list[0].state == 3) {$vue.$data.isShowButton = false}
                    $.each(list,function(i,v){
                        list[i].index=i+1;

                    });
                    $vue.$data.insertData.billDetails=list;
                    // if (list) {}
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            var billNo = masterData.billNo;
            $("#bcTarget").barcode(billNo, "code128",{
                // output:'css',       //渲染方式 css/bmp/svg/canvas
                //bgColor: '#ff0000', //条码背景颜色
                color: '#000000',   //条码颜色
                barWidth: 1,        //单条条码宽度
                barHeight: 50,     //单体条码高度
                // moduleSize: 5,   //条码大小
                // posX: 10,        //条码坐标X
                // posY: 5,         //条码坐标Y
                //  addQuietZone: false  //是否添加空白区（内边距）
            });
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },

            printBill:function(){
                $("#printArea").printArea();
            },

            exportBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.EXPORT,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            deleteBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            checkBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.CHECK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            okBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.OK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },


            updateDetail:function(){
                $("#updateModal").modal('hide');
                var detail = $vue.$data.rowData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.UPDATE,detail,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            acceptMaster:function(){
                $("#acceptMasterModal").modal('hide');
                var insertData = $vue.$data.insertData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.ACCEPT,insertData,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            commit:function(){
                debugger
                
                //多功能货架
                var Multifunction1 = ['HW-124-80-79-151-1-1','HW-124-80-79-151-1-2','HW-124-80-79-151-1-3','HW-124-80-79-151-2-1','HW-124-80-79-151-2-2','HW-124-80-79-151-2-3','HW-124-80-79-151-3-1','HW-124-80-79-151-3-2','HW-124-80-79-151-3-3'];
                var Multifunction2 = ['HW-124-80-79-161-1-1','HW-124-80-79-161-1-2','HW-124-80-79-161-1-3','HW-124-80-79-161-2-1','HW-124-80-79-161-2-2','HW-124-80-79-161-2-3','HW-124-80-79-161-3-1','HW-124-80-79-161-3-2','HW-124-80-79-161-3-3'];
                var Multifunction3 = ['HW-124-80-79-162-1-1','HW-124-80-79-162-1-2','HW-124-80-79-162-2-1','HW-124-80-79-162-2-2'];
                var Multifunction4 = ['HW-124-80-79-163-1-1','HW-124-80-79-163-1-2','HW-124-80-79-163-2-1','HW-124-80-79-163-2-2'];

                //冷冻货架
                var freezing1 = ['HW-124-80-71-164-1-1','HW-124-80-71-164-1-2','HW-124-80-71-164-1-3','HW-124-80-71-164-2-1','HW-124-80-71-164-2-2','HW-124-80-71-164-2-3','HW-124-80-71-164-3-1','HW-124-80-71-164-3-2','HW-124-80-71-164-3-3'];
                var freezing2 = ['HW-124-80-71-165-1-1','HW-124-80-71-165-1-2','HW-124-80-71-165-1-3','HW-124-80-71-165-2-1','HW-124-80-71-165-2-2','HW-124-80-71-165-2-3','HW-124-80-71-165-3-1','HW-124-80-71-165-3-2','HW-124-80-71-165-3-3'];
                var freezing3 = ['HW-124-80-71-166-1-1','HW-124-80-71-166-1-2','HW-124-80-71-166-2-1','HW-124-80-71-166-2-2'];
                var freezing4 = ['HW-124-80-71-167-1-1','HW-124-80-71-167-1-2','HW-124-80-71-167-2-1','HW-124-80-71-167-2-2'];

                //特殊货架
                var specialShelf1 = ['HW-124-80-78-168-1-1','HW-124-80-78-168-1-2','HW-124-80-78-168-1-3','HW-124-80-78-168-2-1','HW-124-80-78-168-2-2','HW-124-80-78-168-2-3','HW-124-80-78-168-3-1','HW-124-80-78-168-3-2','HW-124-80-78-168-3-3'];
                var specialShelf2 = ['HW-124-80-78-169-1-1','HW-124-80-78-169-1-2','HW-124-80-78-169-1-3','HW-124-80-78-169-2-1','HW-124-80-78-169-2-2','HW-124-80-78-169-2-3','HW-124-80-78-169-3-1','HW-124-80-78-169-3-2','HW-124-80-78-169-3-3'];
                var specialShelf3 = ['HW-124-80-78-170-1-1','HW-124-80-78-170-1-2','HW-124-80-78-170-2-1','HW-124-80-78-170-2-2'];
                var specialShelf4 = ['HW-124-80-78-171-1-1','HW-124-80-78-171-1-2','HW-124-80-78-171-2-1','HW-124-80-78-171-2-2'];

                //集装箱货架
                var container1 = ['HW-124-80-70-155-1-1','HW-124-80-70-155-1-2','HW-124-80-70-155-2-1','HW-124-80-70-155-2-2'];
                var container2 = ['HW-124-80-70-156-1-1','HW-124-80-70-156-1-2','HW-124-80-70-156-2-1','HW-124-80-70-156-2-2'];

                //化学货架
                var chemicalShelf1 = ['HW-124-84-76-149-1-1','HW-124-84-76-149-1-2','HW-124-84-76-149-2-1','HW-124-84-76-149-2-2'];

                var totalarr = [];
                //不指定货区
                if (this.areaModel == '1') {
                    var general = [], special = [], material = [], eat = [], chemistry = [];
                    var cellItem = $vue.$data.insertData.billDetails;
                    //先根据材料类型分出货区
                    cellItem.forEach(item => {
                        switch(item.itemTypeCode) {
                            case 'IT1248214550' : general.push(item); break;
                            case 'IT1248214331' : special.push(item); break;
                            case 'IT1248214254' : material.push(item); break;
                            case 'IT1248214205' : eat.push(item); break;
                            case 'IT1248214139' : chemistry.push(item); break;
                        }
                    })

                    //普通类货物

                    general.forEach(item => {
                        var num = parseInt(item.itemClass.split('*')[0]) * parseInt(item.itemClass.split('*')[1]);

                        //如果选择了尺寸性原则且只存大于50*50且注重尺寸
                        if (this.Strategy5 == '5' && num > 2500) {
                            //大型货物放多功能3号、4号
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放3号，B类放冷冻，c类放4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    //大型A类放在3号货架
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction3[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = Multifunction3[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction3[Math.floor(Math.random()*(3+1))]
                                    }
    
                                }else {
                                    //C类放在4号货架
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction4[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = Multifunction4[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction4[Math.floor(Math.random()*(3+1))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在大型3号和4号随便放
                                var _tempBottom = Multifunction3.slice(0,2).concat(Multifunction4.slice(0,2))
                                var _tempTop = Multifunction3.slice(2,4).concat(Multifunction4.slice(2,4))
                                var _all = Multifunction3.concat(Multifunction4)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom[Math.floor(Math.random()*(1+3))]
                                    }else {
                                        item.cellCode = _tempTop[Math.floor(Math.random()*(1+3))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all[Math.floor(Math.random()*(1+7))]
                                }
                            }
                        }else if (this.Strategy5 == '5' && num < 2500){
                            //小于2500且注重尺寸
                          
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction1[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = Multifunction1[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction1[Math.floor(Math.random()*(1+8))]
                                    }
    
                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction2[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = Multifunction2[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction2[Math.floor(Math.random()*(1+8))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在小型1号和2号随便放
                                var _tempBottom15 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3))
                                var _tempTop15 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8))
                                var _all17 = Multifunction1.concat(Multifunction2)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom15[Math.floor(Math.random()*(1+5))]
                                    }else {
                                        item.cellCode = _tempTop15[Math.floor(Math.random()*(1+11))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all17[Math.floor(Math.random()*(1+17))]
                                }
                            }
                        }else {
                            //完全不注重尺寸
                            var __tempBottom1 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3))
                            var __tempTop1 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8))
                            var __all1 = Multifunction1.concat(Multifunction2)
                            var __tempBottom2 = Multifunction3.slice(0,2).concat(Multifunction4.slice(0,2))
                            var __tempTop2 = Multifunction3.slice(2,5).concat(Multifunction4.slice(2,5))
                            var __all2 = Multifunction3.concat(Multifunction4)
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom1[Math.floor(Math.random()*(1+5))]
                                        }else {
                                            item.cellCode = __tempTop1[Math.floor(Math.random()*(1+11))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all1[Math.floor(Math.random()*(1+17))]
                                    }
    
                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom2[Math.floor(Math.random()*(1+3))]
                                        }else {
                                            item.cellCode = __tempTop2[Math.floor(Math.random()*(1+3))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all2[Math.floor(Math.random()*(1+7))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，随便放
                                var _tempBottom18 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3),Multifunction3.slice(0,2),Multifunction4.slice(0,2))
                                var _tempTop118 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8),Multifunction3.slice(2,5),Multifunction4.slice(2,5))
                                var _all18 = Multifunction1.concat(Multifunction2,Multifunction3,Multifunction4)

                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom18[Math.floor(Math.random()*(1+9))]
                                    }else {
                                        item.cellCode = _tempTop118[Math.floor(Math.random()*(1+15))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all18[Math.floor(Math.random()*(1+25))]
                                }
                            }
                        }
                    })

                    //食用类货物
                    eat.forEach(item => {
                        var num = parseInt(item.itemClass.split('*')[0]) * parseInt(item.itemClass.split('*')[1]);

                        //如果选择了尺寸性原则且只存大于50*50且注重尺寸
                        if (this.Strategy5 == '5' && num > 2500) {
                            //大型货物放多功能3号、4号
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放3号，B类放冷冻，c类放4号
                                if (item.abcClass == 'A') {
                                    //大型A类放在3号货架
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction3[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = Multifunction3[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction3[Math.floor(Math.random()*(3+1))]
                                    }
    
                                }else if (item.abcClass == 'B') {
                                    //B类放在冷冻货架3号
                                    item.shlfArr = ['freezing3'];
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = freezing3[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = freezing3[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = freezing3[Math.floor(Math.random()*(3+1))]
                                    }

                                }else {
                                    //C类放在4号货架
                                    item.shlfArr = ['Multifunction4']

                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction4[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = Multifunction4[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction4[Math.floor(Math.random()*(3+1))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在大型3号和4号随便放
                                var _tempBottom = Multifunction3.slice(0,2).concat(Multifunction4.slice(0,2))
                                var _tempTop = Multifunction3.slice(2,4).concat(Multifunction4.slice(2,4))
                                var _all = Multifunction3.concat(Multifunction4)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom[Math.floor(Math.random()*(1+3))]
                                    }else {
                                        item.cellCode = _tempTop[Math.floor(Math.random()*(1+3))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all[Math.floor(Math.random()*(1+7))]
                                }
                            }
                        }else if (this.Strategy5 == '5' && num < 2500){
                            //小于2500且注重尺寸
                          
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction1[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = Multifunction1[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction1[Math.floor(Math.random()*(1+8))]
                                    }
    
                                }else if (item.abcClass == 'B') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = freezing1[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = freezing1[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = freezing1[Math.floor(Math.random()*(1+8))]
                                    }

                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = Multifunction2[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = Multifunction2[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = Multifunction2[Math.floor(Math.random()*(1+8))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在小型1号和2号随便放
                                var _tempBottom15 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3))
                                var _tempTop15 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8))
                                var _all17 = Multifunction1.concat(Multifunction2)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom15[Math.floor(Math.random()*(1+5))]
                                    }else {
                                        item.cellCode = _tempTop15[Math.floor(Math.random()*(1+11))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all17[Math.floor(Math.random()*(1+17))]
                                }
                            }
                        }else {
                            //完全不注重尺寸
                            var __tempBottom1 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3))
                            var __tempTop1 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8))
                            var __all1 = Multifunction1.concat(Multifunction2)
                            var __tempBottom2 = Multifunction3.slice(0,2).concat(Multifunction4.slice(0,2))
                            var __tempTop2 = Multifunction3.slice(2,5).concat(Multifunction4.slice(2,5))
                            var __all2 = Multifunction3.concat(Multifunction4)
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom1[Math.floor(Math.random()*(1+5))]
                                        }else {
                                            item.cellCode = __tempTop1[Math.floor(Math.random()*(1+11))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all1[Math.floor(Math.random()*(1+17))]
                                    }
    
                                }else if (item.abcClass == 'B') {
                                    var _frboot = freezing1.slice(0,3).concat(freezing2.slice(0,3), freezing3.slice(0,2), freezing4.slice(0,2))
                                    var _frtop = freezing1.slice(3,9).concat(freezing2.slice(3,9), freezing3.slice(2,4), freezing4.slice(2,4))
                                    var _ftall = freezing1.concat(freezing2,freezing3,freezing4)
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = _frboot[Math.floor(Math.random()*(1+9))]
                                        }else {
                                            item.cellCode = _frtop[Math.floor(Math.random()*(1+9))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = _ftall[Math.floor(Math.random()*(1+25))]
                                    }

                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom2[Math.floor(Math.random()*(1+3))]
                                        }else {
                                            item.cellCode = __tempTop2[Math.floor(Math.random()*(1+3))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all2[Math.floor(Math.random()*(1+7))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，随便放
                                var _tempBottom18 = Multifunction1.slice(0,3).concat(Multifunction2.slice(0,3),Multifunction3.slice(0,2),Multifunction4.slice(0,2))
                                var _tempTop118 = Multifunction1.slice(3,8).concat(Multifunction2.slice(3,8),Multifunction3.slice(2,5),Multifunction4.slice(2,5))
                                var _all18 = Multifunction1.concat(Multifunction2,Multifunction3,Multifunction4)

                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom18[Math.floor(Math.random()*(1+9))]
                                    }else {
                                        item.cellCode = _tempTop118[Math.floor(Math.random()*(1+15))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all18[Math.floor(Math.random()*(1+25))]
                                }
                            }
                        }
                    })

                    //特殊类货物
                    special.forEach(item => {
                        var num = parseInt(item.itemClass.split('*')[0]) * parseInt(item.itemClass.split('*')[1]);

                        //如果选择了尺寸性原则且只存大于50*50且注重尺寸
                        if (this.Strategy5 == '5' && num > 2500) {
                            //大型货物放多功能3号、4号
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放3号，B类放冷冻，c类放4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    //大型A类放在3号货架
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = specialShelf3[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = specialShelf3[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = specialShelf3[Math.floor(Math.random()*(3+1))]
                                    }
    
                                }else {
                                    //C类放在4号货架
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = specialShelf4[Math.floor(Math.random()*(1+1))]
                                        }else {
                                            item.cellCode = specialShelf4[Math.floor(Math.random()*(3-2+1)+2)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = specialShelf4[Math.floor(Math.random()*(3+1))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在大型3号和4号随便放
                                var _tempBottom = specialShelf3.slice(0,2).concat(specialShelf4.slice(0,2))
                                var _tempTop = specialShelf3.slice(2,4).concat(specialShelf4.slice(2,4))
                                var _all = specialShelf3.concat(specialShelf4)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom[Math.floor(Math.random()*(1+3))]
                                    }else {
                                        item.cellCode = _tempTop[Math.floor(Math.random()*(1+3))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all[Math.floor(Math.random()*(1+7))]
                                }
                            }
                        }else if (this.Strategy5 == '5' && num < 2500){
                            //小于2500且注重尺寸
                          
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = specialShelf1[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = specialShelf1[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = specialShelf1[Math.floor(Math.random()*(1+8))]
                                    }
    
                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = specialShelf2[Math.floor(Math.random()*(1+2))]
                                        }else {
                                            item.cellCode = specialShelf2[Math.floor(Math.random()*(8-3+1)+3)]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = specialShelf2[Math.floor(Math.random()*(1+8))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，在小型1号和2号随便放
                                var _tempBottom15 = specialShelf1.slice(0,3).concat(specialShelf2.slice(0,3))
                                var _tempTop15 = specialShelf1.slice(3,8).concat(specialShelf2.slice(3,8))
                                var _all17 = specialShelf1.concat(specialShelf2)
                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom15[Math.floor(Math.random()*(1+5))]
                                    }else {
                                        item.cellCode = _tempTop15[Math.floor(Math.random()*(1+11))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all17[Math.floor(Math.random()*(1+17))]
                                }
                            }
                        }else {
                            //完全不注重尺寸
                            var __tempBottom1 = specialShelf1.slice(0,3).concat(specialShelf2.slice(0,3))
                            var __tempTop1 = specialShelf1.slice(3,8).concat(specialShelf2.slice(3,8))
                            var __all1 = specialShelf1.concat(specialShelf2)
                            var __tempBottom2 = specialShelf3.slice(0,2).concat(specialShelf4.slice(0,2))
                            var __tempTop2 = specialShelf3.slice(2,5).concat(specialShelf4.slice(2,5))
                            var __all2 = specialShelf3.concat(specialShelf4)
                            if (this.Strategy3 == '3') {
                                //如果选择了相容性原则，A类放1,2号，B类放冷冻，c类放3,4号
                                if (item.abcClass == 'A' || item.abcClass == 'B') {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom1[Math.floor(Math.random()*(1+5))]
                                        }else {
                                            item.cellCode = __tempTop1[Math.floor(Math.random()*(1+11))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all1[Math.floor(Math.random()*(1+17))]
                                    }
    
                                }else {
                                    if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                        //如果选择了周转率和重量性原则
                                        var weight = 0;
                                        item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                        item.unitName == '千克' && (weight = item.acceptQuantity)
                                        item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                        if (item.upperLimit < 500 || weight > 100) {
                                            //上限小于500或者重超过100千克放下层货位
                                            item.cellCode = __tempBottom2[Math.floor(Math.random()*(1+3))]
                                        }else {
                                            item.cellCode = __tempTop2[Math.floor(Math.random()*(1+3))]
                                        }
                                    }else {
                                        //没选周转率和重量性原则
                                        item.cellCode = __all2[Math.floor(Math.random()*(1+7))]
                                    }
                                }
                            }else {
                                //没选择相容性原则，随便放
                                var _tempBottom18 = specialShelf1.slice(0,3).concat(specialShelf2.slice(0,3),specialShelf3.slice(0,2),specialShelf4.slice(0,2))
                                var _tempTop118 = specialShelf1.slice(3,8).concat(specialShelf2.slice(3,8),specialShelf3.slice(2,5),specialShelf4.slice(2,5))
                                var _all18 = specialShelf1.concat(specialShelf2,specialShelf3,specialShelf4)

                                if (this.Strategy1 == '1' || this.Strategy4 == '4') {
                                    //如果选择了周转率和重量性原则
                                    var weight = 0;
                                    item.unitName == '吨' && (weight = item.acceptQuantity * 1000)
                                    item.unitName == '千克' && (weight = item.acceptQuantity)
                                    item.unitName == '克' && (weight = item.acceptQuantity / 1000)
                                    if (item.upperLimit < 500 || weight > 100) {
                                        //上限小于500或者重超过100千克放下层货位
                                        item.cellCode = _tempBottom18[Math.floor(Math.random()*(1+9))]
                                    }else {
                                        item.cellCode = _tempTop118[Math.floor(Math.random()*(1+15))]
                                    }
                                }else {
                                    //没选周转率和重量性原则
                                    item.cellCode = _all18[Math.floor(Math.random()*(1+25))]
                                }
                            }
                        }
                    })

                    //建材类货物
                    material.forEach(item => {
                        var m = container1.concat(container2)
                        item.cellCode = m[Math.floor(Math.random()*(1+7))];
                    })

                    chemistry.forEach(item => {
                        item.cellCode = chemicalShelf1[Math.floor(Math.random()*(1+3))]
                    })
                    totalarr = general.concat(special, material,eat,chemistry);
                    console.log(cellItem)
                }else {
                    var ag = [];
                    switch(this.shelModel) {
                        case 'Multifunction1' : ag = Multifunction1; break;
                        case 'Multifunction2' : ag = Multifunction2; break;
                        case 'Multifunction3' : ag = Multifunction3; break;
                        case 'Multifunction4' : ag = Multifunction4; break;
                        case 'freezing1' : ag = freezing1; break;
                        case 'freezing2' : ag = freezing2; break;
                        case 'freezing3' : ag = freezing3; break;
                        case 'freezing4' : ag = freezing4; break;
                        case 'specialShelf1' : ag = specialShelf1; break;
                        case 'specialShelf2' : ag = specialShelf2; break;
                        case 'specialShelf3' : ag = specialShelf3; break;
                        case 'specialShelf4' : ag = specialShelf4; break;
                        case 'container1' : ag = container1; break;
                        case 'container2' : ag = container2; break;
                        case 'chemicalShelf1' : ag = chemicalShelf1; break;
                    }
                    var cellItem1 = $vue.$data.insertData.billDetails;
                    cellItem1.forEach(item => {
                        item.cellCode = ag[Math.floor(Math.random()*(1+3))];
                    })

                    totalarr = cellItem1;
                }

                IOT.showOverlay('保存中，请稍等...');
                $("#prepareModal").modal('hide');
                IOT.getServerData('http://localhost:8000/wms/cell/items/insert',{item:JSON.stringify(totalarr)},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('上架成功！', 'success', 1000 , function () {
                            
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                            $(".modal-backdrop").remove();
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            commitPrepare:function(){
                var taskBatch = $vue.$data.prepareInsert.taskBatch;
                var prepareType = $vue.$data.prepareInsert.prepareType;
                var prepareInsert = $vue.$data.prepareInsert;
                if(prepareType ==null || prepareType=='' ){
                    return false
                }

                IOT.showOverlay('保存中，请稍等...');
                $("#prepareModal").modal('hide');
                IOT.getServerData(URI.TASK.PREPARE_TASK.ADD,prepareInsert,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {

                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });


                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            upAllModal:function(){
                this.mywareCode = IOT.getLocalStore("backWare")
                $("#upAllModal").modal('show');
            },






        },

        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.client-detail-hook');


                let tableHookName = '.billDetail-in-table-hook';


                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_DETAIL.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',


                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {

                        var queryParams ={billNo:$vue.$data.masterData.billNo};
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(data);
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },


                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },

                        {
                            field: 'itemName', title: '物料名', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'unitName', title: '单位', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'batch', title: '批次', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'quantity', title: '预约数量', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'acceptQuantity', title: '验收数量', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'completeQuantity', title: '上架数量', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                                'click .print': function (e, value, rowData, index) {

                                   var detailNo = rowData.detailNo;

                                    IOT.getServerData(URI.BASE.ITEM.BATCH,{detailNo:detailNo},(ret) => {
                                        if (ret.code === 200) {
                                            $vue.$data.batch = ret.rows[0];
                                            var batchId = $vue.$data.batch.itemBatchBarCode;
                                            $("#batchBar").barcode(batchId, "code128",{
                                                // output:'css',       //渲染方式 css/bmp/svg/canvas
                                                //bgColor: '#ff0000', //条码背景颜色
                                                color: '#000000',   //条码颜色
                                                barWidth: 1.8,        //单条条码宽度
                                                barHeight: 60,     //单体条码高度
                                                // moduleSize: 5,   //条码大小
                                                // posX: 10,        //条码坐标X
                                                // posY: 5,         //条码坐标Y
                                                //  addQuietZone: false  //是否添加空白区（内边距）
                                            });
                                            $("#itemName").text($vue.$data.batch.itemName);
                                            $("#batch").text($vue.$data.batch.batch);
                                            $("#itemClass").text($vue.$data.batch.itemClass);
                                            $("#itemCode").text($vue.$data.batch.itemCode);

                                        } else {
                                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                        }
                                        $("#batchPrintArea").printArea();
                                    });
                                },
                                'click .delete': function (e, value, rowData, index) {




                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var id = rowData.id;
                                        IOT.getServerData(URI.BILL.BILL_DETAIL.DELETE,{id:id},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('删除成功！', 'success', 1000 , function () {
                                                    layer.closeAll();
                                                    M.Table.refresh.all();
                                                });

                                            } else {
                                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                            }
                                        });
                                    }, function(){
                                        //取消
                                    });

                                },

                                'click .complete': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#upModal").modal('show');

                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if(row.state ==1){

                                    operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                    operate.push(' <button class="btn btn-red delete">删除</button>');
                                }

                                if(row.state ==2){  //已验收
                                    // operate.push(' <button style="" class="btn btn-blue complete">上架</button>');
                                }
                                operate.push(' <button style="" class="btn btn-blue print">打印条码</button>');



                                return  operate.join(' ');
                            }
                        }


                    ]
                });

            });
        }

    });


})();


