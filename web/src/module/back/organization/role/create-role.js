import $ from 'jQuery';

(function () {
    const EL = '.create-role-hook';
    let $tree = null;

    let $vue = new Vue({
        el: EL,
        data: {
            pRoleName: [{roleId: '1', roleName: '商人'}],
            info: {
                parentRoleId: '',
                roleName: '',
                roleDescribe: '',
                permissions: []
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            checkRole: function (type) {

                var setting = {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentId',
                            rootPId: 0
                        }
                    },
                    callback: {
                        beforeCheck: function beforeCheck(treeId, treeNode) {
                            // return false;
                        }
                    }
                };
                if (!type) {
                    $tree = $.fn.zTree.init($('#roleTree'), setting, []);
                    return;
                }
                IOT.getServerData(URI.ORGANIZATION.ROLE.CREATE.DATA, {roleId: type.roleId}, (ret) => {
                    if (ret.code === 200) {
                        let treeList = ret.data;
                        $tree = $.fn.zTree.init($('#roleTree'), setting, treeList);
                        $tree.expandAll(false);
                        $tree.checkAllNodes(false);
                        this.info.parentRoleId  = type.roleId;
                    } else {
                        IOT.tips(ret.message, 'error');
                    }
                });
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.ROLE.P_ROLE_DATA, {roleLevel: 1}, (ret)=> {
                if (ret && ret.code === 200) {
                    this.pRoleName = ret.data;
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {


            });

            let $createRole = $(EL);
            $createRole.find('.form-hook').validate({
                debug: true,
                rules: {
                    pRoleName: {
                        required: true,
                    },
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
                    var nodes = $tree.getCheckedNodes(true);
                    for (let i in nodes) {
                        params.permissions.push({
                            'objectId': params.roleId,
                            'objectType': 'role',
                            'resourceId': nodes[i].id
                        });
                    }
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.ORGANIZATION.ROLE.CREATE.SAVE, params, function (ret) {
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success', 1000 , function () {
                                M.Table.refresh.role();
                                M.Page.emitPrePage();
                            });
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





















