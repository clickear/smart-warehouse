/**
 * Created by Administrator on 2017/12/21.
 */
/**
 * Created by Administrator on 2017/10/26.
 */
/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let $vue = null;
    let $tree = null;
    let storeParams = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.CREATE.PAGE));
    let action = storeParams.action;
    $vue = new Vue({
        el: '.create-tracking-hook',
        data: {
            title: action === ACTION.CREATE ? '新增' : '修改',
            info:{
                'transportBillNo': '',         //运单号
                'billType':'',                 //运单类型
                'operationCompany':'',         //操作单位
                'operatorName':'',                         //操作人
                'note':'' ,//备注信息
                'plasticStock':'',
                'supplier':'',
                'consignee':''
            },
        },
        created: function () {
            if(action===ACTION.CREATE){
                IOT.getServerData(URI.RENT.TRACKING.CREATE.INFO, {}, (ret) => {
                    if (ret.code === 200) {
                        this.info = $.extend({}, this.info, ret.data);
                        if (this.info.billType == '1' ){
                            this.info.billType ="调拨运单";
                        }else if (this.info.billType == '2' ){
                            this.info.billType ="流转运单";
                        }

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }else{
                this.info = $.extend({}, this.info, storeParams);

              /*  $('#address').val();
                 $('#total-amount').val()
                $('#company-name').val('111111111');
                $('#receiveCompany').val('2222222');*/
               /* $('#company-name').val(storeParams.supplierCompanyName);
                $('#receiveCompany').val(storeParams.consigneeCompanyName);*/



            }

        },
        methods: {

            prevStep:function(){
                M.Page.emitPrePage();
            },
            selectSupplierTree:function(){        //选择供货单位
                layer.open({
                    type:1,
                    title:'选择派发地市',
                    shadeClose:true,
                    resize:false,
                    shade:0.4,
                    area:['300px','400px'],
                    skin: 'layui-layer-rim',
                    content:$('.zTreeDemoBackground') ,
                    success:function () {
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
                                    if (treeNode.isParent) {
                                        layer.alert('请选择具体仓库网点');
                                        return false;
                                    }else if(Number(treeNode.palletCount)<Number($vue.$data.info.plasticStock)){
                                        layer.alert('该仓库网点的托盘数小于需租赁的托盘总数');
                                        return false;
                                    }else{
                                        $('#address').val(treeNode.name);
                                        $('#total-amount').val("托盘数："+treeNode.palletCount+"")
                                        $('#company-name').val(treeNode.companyName);
                                        $vue.$data.info.supplier = treeNode.resourceId;
                                        layer.closeAll();
                                    }
                                }
                            }
                        };
                        IOT.getServerData(URI.RENT.ALLOCATION.DETAIL.SUREORDER.STORAGE_TREE, {}, (ret) => {
                            if (ret.code === 200) {
                                let treeList = ret.data;
                                $tree = $.fn.zTree.init($('#company_zTree'), setting, treeList);
                                $tree.expandAll(true);
                            } else {
                                IOT.tips(ret.msg, 'error');
                            }
                        });
                    },
                    end:function(){

                    }
                })

            },
            selectConsigneeTree:function(){             //选择收货单位
                layer.open({
                    type:1,
                    title:'选择派发地市',
                    shadeClose:true,
                    resize:false,
                    shade:0.4,
                    area:['300px','400px'],
                    skin: 'layui-layer-rim',
                    content:$('.zTreeDemoBackground') ,
                    success:function () {
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
                                   /* var addStr = "<span class='pallent_span'>托盘数："+treeNode.palletCount+"</span>";
                                    sObj.append(addStr);*/
                                }
                            },
                            callback: {
                                onClick:function onCheckTreeNode(event, treeId, treeNode){
                                    if (treeNode.isParent) {
                                        layer.alert('请选择具体仓库网点');
                                        return false;
                                    }else{
                                        $('#receiveAddress').val(treeNode.name);
                                        $('#receiveCompany').val(treeNode.companyName);
                                        $vue.$data.info.consignee = treeNode.resourceId;
                                        layer.closeAll();
                                    }
                                }
                            }
                        };
                        IOT.getServerData(URI.RENT.ALLOCATION.DETAIL.SUREORDER.STORAGE_TREE, {}, (ret) => {
                            if (ret.code === 200) {
                                let treeList = ret.data;
                                $tree = $.fn.zTree.init($('#company_zTree'), setting, treeList);
                                $tree.expandAll(true);
                            } else {
                                IOT.tips(ret.msg, 'error');
                            }
                        });
                    },
                    end:function(){

                    }
                })

            },
            submitOrders:function(){

                if($('#company-name').val() == ""){
                    layer.alert('供货单位不能为空!');
                    return false;
                }
                if($('#receiveCompany').val() == ""){
                    layer.alert('收货单位不能为空!');
                    return false;
                }
                let params = $vue.$data.info;
                if ($vue.$data.info.billType == '调拨运单' ){
                    params.billType ="1";
                }else if ($vue.$data.info.billType == '流转运单' ){
                    params.billType ="2";
                }
                let url = URI.RENT.TRACKING.CREATE.SAVE;
                if (action === ACTION.MODIFY) {
                    url = URI.RENT.TRACKING.DETAIL.EDIT;
                }
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(url,params, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    console.log(ret.data);
                    if (ret && ret.code === 200) {
                        IOT.tips('保存成功！', 'success');
                        layer.closeAll();
                        M.Table.refresh.all();
                        M.Page.emitPrePage();
                        if (action === ACTION.MODIFY) {
                            M.Page.emitPrePage();
                        }

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                return false;
            }
        },
        mounted: function () {
        }
    });
})();





















