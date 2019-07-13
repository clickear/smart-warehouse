package com.deer.wms.message.model;

import java.util.Date;

import javax.persistence.*;

@Table(name = "help_content")
public class HelpContent {
    @Id
    @Column(name = "content_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contentId;

    @Column(name = "category_id")
    private Integer categoryId;

    private String content;
    
    private String title;
    
    @Column(name = "create_time")
    private Date createTime;
    
    @Column(name = "modify_time")
    private Date modifyTime;
    
    /**
	 * 状态：enable=启用；disable=未启用
	 */
    @Column(name = "state")
    private String state;

    /**
     * @return content_id
     */
    public Integer getContentId() {
        return contentId;
    }

    /**
     * @param contentId
     */
    public void setContentId(Integer contentId) {
        this.contentId = contentId;
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
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}