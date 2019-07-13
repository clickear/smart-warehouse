package com.deer.wms.message.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Table(name = "help_category")
public class HelpCategory {
    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    @Column(name = "category_name")
    private String categoryName;

    /**
     * 顶级为-1
     */
    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "icon_url")
    private String iconUrl;

    private Integer level;

    @Column(name = "sort_number")
    private Integer sortNumber;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人
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
     * 存储不同级别的标题内容
     */
    @Transient
    private List<HelpCategory> helpCategoryList;
    /**
     * 帮助文档详细内容
     */
    @Transient
    private String content;
    /**
     * 存储不同级别目录下的帮助文档信息
     */
    @Transient
    private List<HelpContentDto> helpContentList;

    public List<HelpContentDto> getHelpContentList() {
		return helpContentList;
	}

	public void setHelpContentList(List<HelpContentDto> helpContentList) {
		this.helpContentList = helpContentList;
	}

	/**
     * @return category_id
     */
    public Integer getCategoryId() {
        return categoryId;
    }

    /**
     * @param categoryId
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * @return category_name
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * @param categoryName
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    /**
     * 获取顶级为-1
     *
     * @return parent_id - 顶级为-1
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 设置顶级为-1
     *
     * @param parentId 顶级为-1
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * @return icon_url
     */
    public String getIconUrl() {
        return iconUrl;
    }

    /**
     * @param iconUrl
     */
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    /**
     * @return level
     */
    public Integer getLevel() {
        return level;
    }

    /**
     * @param level
     */
    public void setLevel(Integer level) {
        this.level = level;
    }

    /**
     * @return sort_number
     */
    public Integer getSortNumber() {
        return sortNumber;
    }

    /**
     * @param sortNumber
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
     * 获取创建人
     *
     * @return create_user_id - 创建人
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人
     *
     * @param createUserId 创建人
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

	public List<HelpCategory> getHelpCategoryList() {
		return helpCategoryList;
	}

	public void setHelpCategoryList(List<HelpCategory> helpCategoryList) {
		this.helpCategoryList = helpCategoryList;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}