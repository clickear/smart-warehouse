package com.deer.wms.system.manage.model.resource;

import java.util.Date;
import javax.persistence.*;

@Table(name = "resource_url")
public class ResourceUrl {
    /**
     * 路径信息id
     */
    @Id
    @Column(name = "url_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer urlId;

    /**
     * 资源信息id
     */
    @Column(name = "resource_id")
    private Integer resourceId;

    /**
     * 资源类型：F=功能；B=按钮；
     */
    @Column(name = "resource_type")
    private String resourceType;

    /**
     * 路径类型：P=页面；I=接口；
     */
    @Column(name = "url_type")
    private String urlType;

    /**
     * 请求方式：GET；POST；PUT；DELETE；
     */
    private String method;

    /**
     * 路径地址
     */
    private String url;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

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
     * 获取路径信息id
     *
     * @return url_id - 路径信息id
     */
    public Integer getUrlId() {
        return urlId;
    }

    /**
     * 设置路径信息id
     *
     * @param urlId 路径信息id
     */
    public void setUrlId(Integer urlId) {
        this.urlId = urlId;
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
     * 获取资源类型：F=功能；B=按钮；
     *
     * @return resource_type - 资源类型：F=功能；B=按钮；
     */
    public String getResourceType() {
        return resourceType;
    }

    /**
     * 设置资源类型：F=功能；B=按钮；
     *
     * @param resourceType 资源类型：F=功能；B=按钮；
     */
    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    /**
     * 获取路径类型：P=页面；I=接口；
     *
     * @return url_type - 路径类型：P=页面；I=接口；
     */
    public String getUrlType() {
        return urlType;
    }

    /**
     * 设置路径类型：P=页面；I=接口；
     *
     * @param urlType 路径类型：P=页面；I=接口；
     */
    public void setUrlType(String urlType) {
        this.urlType = urlType;
    }

    /**
     * 获取请求方式：GET；POST；PUT；DELETE；
     *
     * @return method - 请求方式：GET；POST；PUT；DELETE；
     */
    public String getMethod() {
        return method;
    }

    /**
     * 设置请求方式：GET；POST；PUT；DELETE；
     *
     * @param method 请求方式：GET；POST；PUT；DELETE；
     */
    public void setMethod(String method) {
        this.method = method;
    }

    /**
     * 获取路径地址
     *
     * @return url - 路径地址
     */
    public String getUrl() {
        return url;
    }

    /**
     * 设置路径地址
     *
     * @param url 路径地址
     */
    public void setUrl(String url) {
        this.url = url;
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