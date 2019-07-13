package com.deer.wms.system.manage.model.company;

/**
 * 机构列表信息视图类
 *
 * Created by Floki on 2017/10/8.
 */
public class CompanyListVO {
    /**
     * 企业信息id
     */
    private Integer companyId;

    /**
     * 企业名称
     */
    private String companyName;

    /**
     * 地址
     */
    private String linkmanAddress;

    /**
     * 电话
     */
    private String linkmanPhone;

    /**
     * 法人名称
     */
    private String artificialPersonName;

    /**
     * 供应能力
     */
    private Integer supplyCapability;

    /**
     * 创建时间/注册时间
     */
    private String createTime;
    
    /**
     * 供应能力(万块/月)
     */
    private String supplyAbility;
    
    /**
     * 企业类型
     */
    private Integer companyType;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLinkmanAddress() {
        return linkmanAddress;
    }

    public void setLinkmanAddress(String linkmanAddress) {
        this.linkmanAddress = linkmanAddress;
    }

    public String getLinkmanPhone() {
        return linkmanPhone;
    }

    public void setLinkmanPhone(String linkmanPhone) {
        this.linkmanPhone = linkmanPhone;
    }

    public String getArtificialPersonName() {
        return artificialPersonName;
    }

    public void setArtificialPersonName(String artificialPersonName) {
        this.artificialPersonName = artificialPersonName;
    }

    public Integer getSupplyCapability() {
        return supplyCapability;
    }

    public void setSupplyCapability(Integer supplyCapability) {
        this.supplyCapability = supplyCapability;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

	public String getSupplyAbility() {
		return supplyAbility;
	}

	public void setSupplyAbility(String supplyAbility) {
		this.supplyAbility = supplyAbility;
	}

	public Integer getCompanyType() {
		return companyType;
	}

	public void setCompanyType(Integer companyType) {
		this.companyType = companyType;
	}
}
