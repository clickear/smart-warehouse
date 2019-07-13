package com.deer.wms.system.manage.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "user_role")
public class UserRole {
    /**
     * 用户角色信息id
     */
    @Id
    @Column(name = "user_role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userRoleId;

    /**
     * 用户信息id
     */
    @Column(name = "user_id")
    private Integer userId;

    /**
     * 角色信息id
     */
    @Column(name = "role_id")
    private Integer roleId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 获取用户角色信息id
     *
     * @return user_role_id - 用户角色信息id
     */
    public Integer getUserRoleId() {
        return userRoleId;
    }

    /**
     * 设置用户角色信息id
     *
     * @param userRoleId 用户角色信息id
     */
    public void setUserRoleId(Integer userRoleId) {
        this.userRoleId = userRoleId;
    }

    /**
     * 获取用户信息id
     *
     * @return user_id - 用户信息id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 设置用户信息id
     *
     * @param userId 用户信息id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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