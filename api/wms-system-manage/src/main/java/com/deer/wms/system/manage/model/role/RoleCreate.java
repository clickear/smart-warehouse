package com.deer.wms.system.manage.model.role;

import com.deer.wms.system.manage.model.permission.PermissionModify;

import java.util.List;

/**
 * 创建角色信息的封装类
 *
 * Created by Floki on 2017/11/9.
 */
public class RoleCreate {
    /**
     * 角色所属机构id
     */
    private Integer companyId;

    /**
     * 角色层级
     */
    private Integer roleLevel;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 父级角色id
     */
    private Integer parentRoleId;

    /**
     * 角色描述
     */
    private String roleDescribe;

    /**
     * 角色权限信息列表
     */
    private List<PermissionModify> permissions;


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(Integer roleLevel) {
        this.roleLevel = roleLevel;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getParentRoleId() {
        return parentRoleId;
    }

    public void setParentRoleId(Integer parentRoleId) {
        this.parentRoleId = parentRoleId;
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
