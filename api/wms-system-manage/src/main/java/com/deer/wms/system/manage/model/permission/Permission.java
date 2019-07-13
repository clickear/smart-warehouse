package com.deer.wms.system.manage.model.permission;

import java.util.Date;
import javax.persistence.*;

public class Permission {
    /**
     * 权限信息id
     */
    @Id
    @Column(name = "permission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer permissionId;

    /**
     * 资源信息id
     */
    @Column(name = "resource_id")
    private Integer resourceId;

    /**
     * 授权对象类型：user=用户授权；role=角色授权；
     */
    @Column(name = "object_type")
    private String objectType;

    /**
     * 授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     */
    @Column(name = "object_id")
    private Integer objectId;

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
     * 组  1:仓库作业  2-基本信息   3-报表
     */
    @Column(name = "group")
    private Integer group;

    public Integer getGroup() {
        return group;
    }

    public void setGroup(Integer group) {
        this.group = group;
    }

    /**
     * 获取权限信息id
     *
     * @return permission_id - 权限信息id
     */
    public Integer getPermissionId() {
        return permissionId;
    }

    /**
     * 设置权限信息id
     *
     * @param permissionId 权限信息id
     */
    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }

    /**
     * 获取资源信息id
     *
     * @return resource_id - 资源信息id
     */
    public Integer getResourceId() {
        return resourceId;
    }

    /**
     * 设置资源信息id
     *
     * @param resourceId 资源信息id
     */
    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    /**
     * 获取授权对象类型：user=用户授权；role=角色授权；
     *
     * @return object_type - 授权对象类型：user=用户授权；role=角色授权；
     */
    public String getObjectType() {
        return objectType;
    }

    /**
     * 设置授权对象类型：user=用户授权；role=角色授权；
     *
     * @param objectType 授权对象类型：user=用户授权；role=角色授权；
     */
    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    /**
     * 获取授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     *
     * @return object_id - 授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     */
    public Integer getObjectId() {
        return objectId;
    }

    /**
     * 设置授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     *
     * @param objectId 授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     */
    public void setObjectId(Integer objectId) {
        this.objectId = objectId;
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