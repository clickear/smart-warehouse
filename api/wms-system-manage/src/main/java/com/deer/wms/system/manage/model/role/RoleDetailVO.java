package com.deer.wms.system.manage.model.role;

import com.deer.wms.system.manage.model.permission.PermissionTreeModel;

import java.util.List;

/**
 * 角色详细信息视图类
 *
 * Created by Floki on 2017/10/8.
 */
public class RoleDetailVO {
    /**
     * 角色信息id
     */
    private Integer roleId;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色描述
     */
    private String roleDescribe;

    /**
     * 角色权限资源的树形结构模型
     */
    private List<PermissionTreeModel> treeList;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescribe() {
        return roleDescribe;
    }

    public void setRoleDescribe(String roleDescribe) {
        this.roleDescribe = roleDescribe;
    }

    public List<PermissionTreeModel> getTreeList() {
        return treeList;
    }

    public void setTreeList(List<PermissionTreeModel> treeList) {
        this.treeList = treeList;
    }
}
