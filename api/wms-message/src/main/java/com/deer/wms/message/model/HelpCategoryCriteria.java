package com.deer.wms.message.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/09.
*/
public class HelpCategoryCriteria extends QueryCriteria {
	
	private Integer categoryId;
	
	private String parentId;
	
	private Integer level;
	
	private String categoryName;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
}
