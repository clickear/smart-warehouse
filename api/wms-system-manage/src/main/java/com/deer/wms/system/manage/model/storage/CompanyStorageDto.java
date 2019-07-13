package com.deer.wms.system.manage.model.storage;

import java.util.List;

public class CompanyStorageDto extends CompanyStorage
{
	// 企业名称
	private String companyName;
	
	private long palletCount;

	//基站
	private String baseStationId;
	
	private String lac;
	
	private String cellId;
	
	private List<StorageBase> storageBaseList;

	public String getBaseStationId() {
		return baseStationId;
	}

	public void setBaseStationId(String baseStationId) {
		this.baseStationId = baseStationId;
	}

	public long getPalletCount() {
		return palletCount;
	}

	public void setPalletCount(long palletCount) {
		this.palletCount = palletCount;
	}

	public String getCompanyName()
	{
		return companyName;
	}

	public void setCompanyName( String companyName )
	{
		this.companyName = companyName;
	}

	public String getLac() {
		return lac;
	}

	public void setLac(String lac) {
		this.lac = lac;
	}

	public String getCellId() {
		return cellId;
	}

	public void setCellId(String cellId) {
		this.cellId = cellId;
	}

	public List<StorageBase> getStorageBaseList() {
		return storageBaseList;
	}

	public void setStorageBaseList(List<StorageBase> storageBaseList) {
		this.storageBaseList = storageBaseList;
	}
}
