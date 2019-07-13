package com.deer.wms.system.manage.model.storage;

import java.util.List;

/**
 * 创建网点/存储点的信息
 *
 * Created by Floki on 2017/10/8.
 */
public class CompanyStorageCreate {
    /**
     * 所属公司信息id
     */
    private Integer companyId;

    /**
     * 名称
     */
    private String storageName;

    /**
     * 地址
     */
    private String address;

    /**
     * 电话
     */
    private String phone;

    /**
     * 联系人
     */
    private String linkmanName;

    /**
     * 经度
     */
    private String lng;

    /**
     * 纬度
     */
    private String lat;

    /**
     * 所在省份
     */
    private String province;

    /**
     * 所在城市
     */
    private String city;

    /*
    * 基站ID
    * */
    private String  baseStationId;
    
    /**
     * lac列表
     */
    private String[] lacArr;
    
    /**
     * cell_id列表
     */
    private String[] cellIdArr;
    
    private List<StorageBase> baseList;



    /**
    *  类型：1=网点；2=仓储点；
    */
    private String storageType;

    public String getStorageType() {
        return storageType;
    }

    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    public String getBaseStationId() {
        return baseStationId;
    }

    public void setBaseStationId(String baseStationId) {
        this.baseStationId = baseStationId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLinkmanName() {
        return linkmanName;
    }

    public void setLinkmanName(String linkmanName) {
        this.linkmanName = linkmanName;
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

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

	public String[] getLacArr() {
		return lacArr;
	}

	public void setLacArr(String[] lacArr) {
		this.lacArr = lacArr;
	}

	public String[] getCellIdArr() {
		return cellIdArr;
	}

	public void setCellIdArr(String[] cellIdArr) {
		this.cellIdArr = cellIdArr;
	}

	public List<StorageBase> getBaseList() {
		return baseList;
	}

	public void setBaseList(List<StorageBase> baseList) {
		this.baseList = baseList;
	}
}
