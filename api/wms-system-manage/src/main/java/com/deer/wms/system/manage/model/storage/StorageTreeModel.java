package com.deer.wms.system.manage.model.storage;

/**
 * 权限树形结构模型
 * 
 * @author shilihua
 */
public class StorageTreeModel
{
	// 主键ID
	private Integer id;
	
	// 父类ID
	private Integer pid;
	
	// 页面展示数据
	private String name;
	
	// 托盘总数
	private Long palletCount;
	
	// 数据库中仓库对应的ID
	private Integer resourceId;

	// 级别
	private int level;

	// 公司名称
	private String companyName;

	/**
	 * 经度
	 */
	private String lng;

	/**
	 * 纬度
	 */
	private String lat;

	/**
	 * 地址
	 */
	private String address;

	/**
	 * 联系人
	 */
	private String linkmanName;

	/**
	 * 电话
	 */
	private String phone;
	
	public Integer getId()
	{
		return id;
	}

	public void setId( Integer id )
	{
		this.id = id;
	}

	public Integer getPid()
	{
		return pid;
	}

	public void setPid( Integer pid )
	{
		this.pid = pid;
	}

	public String getName()
	{
		return name;
	}

	public void setName( String name )
	{
		this.name = name;
	}

	public Long getPalletCount()
	{
		return palletCount;
	}

	public void setPalletCount( Long palletCount )
	{
		this.palletCount = palletCount;
	}

	public Integer getResourceId()
	{
		return resourceId;
	}

	public void setResourceId( Integer resourceId )
	{
		this.resourceId = resourceId;
	}

	public int getLevel()
	{
		return level;
	}

	public void setLevel( int level )
	{
		this.level = level;
	}

	public String getCompanyName()
	{
		return companyName;
	}

	public void setCompanyName( String companyName )
	{
		this.companyName = companyName;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLinkmanName() {
		return linkmanName;
	}

	public void setLinkmanName(String linkmanName) {
		this.linkmanName = linkmanName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
