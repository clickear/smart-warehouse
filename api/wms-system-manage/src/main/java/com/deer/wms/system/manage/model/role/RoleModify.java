package com.deer.wms.system.manage.model.role;

import com.deer.wms.system.manage.model.permission.PermissionModify;

import java.util.List;

/**
 * 角色修改信息类
 *
 * Created by Floki on 2017/10/8.
 */
public class RoleModify {
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
     * 角色权限信息列表
     */
    private List<PermissionModify> permissions;

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

    public List<PermissionModify> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<PermissionModify> permissions) {
        this.permissions = permissions;
    }
}
