package com.deer.wms.system.manage.model.role;

import java.util.Date;
import javax.persistence.*;

public class Role {
    /**
     * 角色信息id
     */
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 角色名称
     */
    @Column(name = "role_name")
    private String roleName;

    /**
     * 父级角色id
     */
    @Column(name = "parent_role_id")
    private Integer parentRoleId;

    /**
     * 角色层级
     */
    @Column(name = "role_level")
    private Integer roleLevel;

    /**
     * 角色描述
     */
    @Column(name = "role_describe")
    private String roleDescribe;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人：如果为-1表示系统初始化
     */
    @Column(name = "create_user_id")
    private Integer createUserId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改人
     */
    @Column(name = "modify_user_id")
    private Integer modifyUserId;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 获取角色信息id
     *
     * @return role_id - 角色信息id
     */
    public Integer getRoleId() {
        return roleId;
    }

    /**
     * 设置角色信息id
     *
     * @param roleId 角色信息id
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取角色名称
     *
     * @return role_name - 角色名称
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 设置角色名称
     *
     * @param roleName 角色名称
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getParentRoleId() {
        return parentRoleId;
    }

    public void setParentRoleId(Integer parentRoleId) {
        this.parentRoleId = parentRoleId;
    }

    public Integer getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(Integer roleLevel) {
        this.roleLevel = roleLevel;
    }

    /**
     * 获取角色描述
     *
     * @return role_describe - 角色描述
     */
    public String getRoleDescribe() {
        return roleDescribe;
    }

    /**
     * 设置角色描述
     *
     * @param roleDescribe 角色描述
     */
    public void setRoleDescribe(String roleDescribe) {
        this.roleDescribe = roleDescribe;
    }

    /**
     * 获取信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @return state - 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @param state 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取创建人：如果为-1表示系统初始化
     *
     * @return create_user_id - 创建人：如果为-1表示系统初始化
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人：如果为-1表示系统初始化
     *
     * @param createUserId 创建人：如果为-1表示系统初始化
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取修改人
     *
     * @return modify_user_id - 修改人
     */
    public Integer getModifyUserId() {
        return modifyUserId;
    }

    /**
     * 设置修改人
     *
     * @param modifyUserId 修改人
     */
    public void setModifyUserId(Integer modifyUserId) {
        this.modifyUserId = modifyUserId;
    }

    /**
     * 获取修改时间
     *
     * @return modify_time - 修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置修改时间
     *
     * @param modifyTime 修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}