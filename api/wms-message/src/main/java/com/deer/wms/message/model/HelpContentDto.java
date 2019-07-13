package com.deer.wms.message.model;

/**
 * 帮助文档扩展
 * @author songyuyang
 * @create 2017/11/29
 */
public class HelpContentDto extends HelpContent
{
	/**
	 * 导航名称
	 */
	private String categoryName;
	
	/**
	 * 父级导航id
	 */
	private Integer parentId;
	
	/**
	 * 父级导航名称
	 */
	private String parentName;

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

}
