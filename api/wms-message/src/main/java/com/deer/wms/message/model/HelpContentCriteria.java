package com.deer.wms.message.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/09.
*/
public class HelpContentCriteria extends QueryCriteria {
	
	/**
	 * 一级导航id
	 */
	private String parentId;
	
	/**
	 * 一级导航名称
	 */
	private String parentName;
	
	/**
	 * 二级导航id
	 */
	private Integer categoryId;
	
	/**
	 * 二级导航名称
	 */
	private String categoryName;
	
	/**
	 * 关键字
	 */
	private String keywords;
	
	/**
	 * 帮助文档标题
	 */
	private String title;
	
	/**
	 * 帮助文档内容
	 */
	private String content;
	
	/**
	 * 状态 :enable=启用；disable=未启用
	 */
	private String state;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	
}
