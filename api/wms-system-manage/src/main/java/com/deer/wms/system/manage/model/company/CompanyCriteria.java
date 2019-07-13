package com.deer.wms.system.manage.model.company;

import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/01.
*/
public class CompanyCriteria extends QueryCriteria {
    /**
     * 企业信息id
     */
    private Integer companyId;

    /**
     * 企业类型
     */
    private Integer companyType;

    /**
     * 关键字
     */
    private String keyword;
    
    /**
     * 区域
     */
    private String areaId;

    /**
     * 省份
     */
    private String province;

    /**
     * 城市
     */
    private String city;

    /**
     * 区县
     */
    private String county;

    /**
     * 存量的数字
     */
    private Integer stockCount;

    /**
     * 状态
     */
    private String state = Constants.INFO_STATE_NORMAL;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getCompanyType() {
        return companyType;
    }

    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
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

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public Integer getStockCount() {
		return stockCount;
	}

	public void setStockCount(Integer stockCount) {
		this.stockCount = stockCount;
	}
}
