package com.deer.wms.system.manage.model.resource;

import java.util.Date;
import javax.persistence.*;

@Table(name = "resource_url_param")
public class ResourceUrlParam {
    /**
     * 资源路径参数信息id
     */
    @Id
    @Column(name = "param_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paramId;

    /**
     * 资源信息id
     */
    @Column(name = "resource_id")
    private Integer resourceId;

    /**
     * 路径信息id
     */
    @Column(name = "url_id")
    private Integer urlId;

    /**
     * 参数名
     */
    @Column(name = "param_name")
    private String paramName;

    /**
     * 参数类型：int、long、string、float、double
     */
    @Column(name = "param_type")
    private String paramType;

    /**
     * 排序号
     */
    @Column(name = "sort_number")
    private Integer sortNumber;

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
     * 获取资源路径参数信息id
     *
     * @return param_id - 资源路径参数信息id
     */
    public Integer getParamId() {
        return paramId;
    }

    /**
     * 设置资源路径参数信息id
     *
     * @param paramId 资源路径参数信息id
     */
    public void setParamId(Integer paramId) {
        this.paramId = paramId;
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
     * 获取参数名
     *
     * @return param_name - 参数名
     */
    public String getParamName() {
        return paramName;
    }

    /**
     * 设置参数名
     *
     * @param paramName 参数名
     */
    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    /**
     * 获取参数类型：int、long、string、float、double
     *
     * @return param_type - 参数类型：int、long、string、float、double
     */
    public String getParamType() {
        return paramType;
    }

    /**
     * 设置参数类型：int、long、string、float、double
     *
     * @param paramType 参数类型：int、long、string、float、double
     */
    public void setParamType(String paramType) {
        this.paramType = paramType;
    }

    /**
     * 获取排序号
     *
     * @return sort_number - 排序号
     */
    public Integer getSortNumber() {
        return sortNumber;
    }

    /**
     * 设置排序号
     *
     * @param sortNumber 排序号
     */
    public void setSortNumber(Integer sortNumber) {
        this.sortNumber = sortNumber;
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