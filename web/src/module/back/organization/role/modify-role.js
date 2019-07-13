import $ from 'jQuery';

(function () {
    const EL = '.modify-role-hook';
    let storeData = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.ROLE.MODIFY.PAGE));
    let action = storeData.action;
    let $tree = null;

    let $vue = new Vue({
        el: EL,
        data: {
            action: action,
            title: action === 'query' ? '查看' : '编辑',
            info: {
                roleId: '',
                roleName: '',
                roleDescribe: '',
                permissions: [
                    // {
                    //     "objectId": 0,
                    //     "objectType": "role",
                    //     "resourceId": 0
                    // }
                ]
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            save: function () {

            }
        },
        created: function () {

        },
        mounted: function () {
            this.$nextTick(() => {
                var setting = {
                    check: {
                        enable: true
                    },
                    // key: {
                    //     checked: 'check'
                    // },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentId',
                            rootPId: 0
                        }
                    },
                    callback: {
                        beforeCheck: function beforeCheck (treeId, treeNode) {
                            return action === 'modify';
                        }
                    }
                };
                IOT.getServerData(URI.ORGANIZATION.ROLE.MODIFY.DATA, {roleId: storeData.roleId}, (ret) => {
                    if (ret.code === 200) {
                        let data = ret.data;
                        // console.log(JSON.stringify(data));
                        let treeList = ret.data.treeList;
                        $tree = $.fn.zTree.init($('#roleTree'), setting, treeList);
                        $tree.expandAll(true);
                        this.info = $.extend({}, this.info, ret.data);
                    } else {
                        IOT.tips(ret.msg, 'error');
                    }
                });
            });

            let $modifyRole = $(EL);
            $modifyRole.find('.form-hook').validate({
                debug: true,
                rules: {
                    roleName: {
                        required: true,
                        minlength: 1,
                        maxlength: 50
                    },
                    roleDescribe: {
                        minlength: 0,
                        maxlength: 200
                    }
                },
                submitHandler: function (form) {
                    let params = $vue.$data.info;
                    delete params.treeList;
                    params.permissions.length = 0;
                    var nodes = $tree.getCheckedNodes(true);
                    for (let i in nodes) {
                        params.permissions.push({
                            'objectId': params.roleId,
                            'objectType': 'role',
                            'resourceId': nodes[i].id
                        });
                    }
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.ORGANIZATION.ROLE.MODIFY.SAVE, params, function (ret) {
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            M.Table.refresh.role();
                        } else {
                            IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        }
                    });
                    return false;
                }
            });

        }
    });
})();





















