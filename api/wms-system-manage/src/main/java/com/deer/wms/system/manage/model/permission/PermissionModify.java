package com.deer.wms.system.manage.model.permission;

/**
 * 权限修改信息类
 *
 * Created by Floki on 2017/10/8.
 */
public class PermissionModify {
    /**
     * 资源信息id
     */
    private Integer resourceId;

    /**
     * 授权对象类型：user=用户授权；role=角色授权；
     */
    private String objectType;

    /**
     * 授权对象信息id：如果是用户授权就是用户信息id，如果是角色授权就是角色信息id
     */
    private Integer objectId;

    public Integer getResourceId() {
        return resourceId;
    }

    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public Integer getObjectId() {
        return objectId;
    }

    public void setObjectId(Integer objectId) {
        this.objectId = objectId;
    }
}
