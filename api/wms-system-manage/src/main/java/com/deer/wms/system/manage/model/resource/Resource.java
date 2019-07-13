package com.deer.wms.system.manage.model.resource;

import java.util.Date;
import javax.persistence.*;

public class Resource {
    /**
     * 资源信息id
     */
    @Id
    @Column(name = "resource_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resourceId;

    /**
     * 资源代码
     */
    @Column(name = "resource_code")
    private String resourceCode;

    /**
     * 资源名称
     */
    @Column(name = "resource_name")
    private String resourceName;

    /**
     * 父级资源信息id，一级资源为-1
     */
    @Column(name = "parent_id")
    private Integer parentId;

    /**
     * 资源类型：M=模块；F=功能；B=按钮；
     */
    @Column(name = "resource_type")
    private String resourceType;

    /**
     * 是否权限控制：0=否；1=是；默认是
     */
    private Boolean control;

    /**
     * 资源显示区域：L=左边部位；T=顶部；I=首页；默认L
     */
    private String region;

    /**
     * 层级
     */
    private Integer level;

    /**
     * 图标
     */
    private String icon;

    /**
     * 样式
     */
    private String style;

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
     * 获取资源代码
     *
     * @return resource_code - 资源代码
     */
    public String getResourceCode() {
        return resourceCode;
    }

    /**
     * 设置资源代码
     *
     * @param resourceCode 资源代码
     */
    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    /**
     * 获取资源名称
     *
     * @return resource_name - 资源名称
     */
    public String getResourceName() {
        return resourceName;
    }

    /**
     * 设置资源名称
     *
     * @param resourceName 资源名称
     */
    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    /**
     * 获取父级资源信息id，一级资源为-1
     *
     * @return parent_id - 父级资源信息id，一级资源为-1
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 设置父级资源信息id，一级资源为-1
     *
     * @param parentId 父级资源信息id，一级资源为-1
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取资源类型：M=模块；F=功能；B=按钮；
     *
     * @return resource_type - 资源类型：M=模块；F=功能；B=按钮；
     */
    public String getResourceType() {
        return resourceType;
    }

    /**
     * 设置资源类型：M=模块；F=功能；B=按钮；
     *
     * @param resourceType 资源类型：M=模块；F=功能；B=按钮；
     */
    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    /**
     * 获取是否权限控制：0=否；1=是；默认是
     *
     * @return control - 是否权限控制：0=否；1=是；默认是
     */
    public Boolean getControl() {
        return control;
    }

    /**
     * 设置是否权限控制：0=否；1=是；默认是
     *
     * @param control 是否权限控制：0=否；1=是；默认是
     */
    public void setControl(Boolean control) {
        this.control = control;
    }

    /**
     * 获取资源显示区域：L=左边部位；T=顶部；I=首页；默认L
     *
     * @return region - 资源显示区域：L=左边部位；T=顶部；I=首页；默认L
     */
    public String getRegion() {
        return region;
    }

    /**
     * 设置资源显示区域：L=左边部位；T=顶部；I=首页；默认L
     *
     * @param region 资源显示区域：L=左边部位；T=顶部；I=首页；默认L
     */
    public void setRegion(String region) {
        this.region = region;
    }

    /**
     * 获取层级
     *
     * @return level - 层级
     */
    public Integer getLevel() {
        return level;
    }

    /**
     * 设置层级
     *
     * @param level 层级
     */
    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
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