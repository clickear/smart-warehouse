package com.deer.wms.system.manage.model.company;

/**
 * 公司/企业/机构/单位详细信息视图类
 *
 * Created by Floki on 2017/10/9.
 */
public class CompanyDetailVO {
    /**
     * 信息id
     */
    private Integer companyId;

    /**
     * 客户名称
     */
    private String companyName;

    /**
     * 客户类型
     */
    private Integer companyType;

    /**
     * 统一社会信用代码
     */
    private String creditCode;

    /**
     * 注册地址
     */
    private String registeredAddress;

    /**
     * 联系地址
     */
    private String linkmanAddress;

    /**
     * 联系电话
     */
    private String linkmanPhone;

    /**
     * 经度
     */
    private String lng;

    /**
     * 纬度
     */
    private String lat;

    /**
     * 联系人/企业法人
     */
    private String artificialPersonName;

    /**
     * 法人身份证号
     */
    private String artificialPersonIdCard;

    /**
     * 企业成立时间
     */
    private String establishDate;

    /**
     * 联系人电话
     */
    private String linkmanUserPhone;

    /**
     * 供应能力
     */
    private Integer supplyCapability;

    /**
     * 营业执照复印件
     */
    private String businessLicenseImgUrl;

    /**
     * 法人身份证复印件正面
     */
    private String idCardPositiveImgUrl;

    /**
     * 法人身份证复印件反面
     */
    private String idCardOppositeImgUrl;
    
    /**
     * 供应能力(万块)
     */
    private String supplyAbility;

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

    public Integer getCompanyType() {
        return companyType;
    }

    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    public String getCreditCode() {
        return creditCode;
    }

    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }

    public String getRegisteredAddress() {
        return registeredAddress;
    }

    public void setRegisteredAddress(String registeredAddress) {
        this.registeredAddress = registeredAddress;
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

    public String getArtificialPersonName() {
        return artificialPersonName;
    }

    public void setArtificialPersonName(String artificialPersonName) {
        this.artificialPersonName = artificialPersonName;
    }

    public String getArtificialPersonIdCard() {
        return artificialPersonIdCard;
    }

    public void setArtificialPersonIdCard(String artificialPersonIdCard) {
        this.artificialPersonIdCard = artificialPersonIdCard;
    }

    public String getEstablishDate() {
        return establishDate;
    }

    public void setEstablishDate(String establishDate) {
        this.establishDate = establishDate;
    }

    public String getLinkmanUserPhone() {
        return linkmanUserPhone;
    }

    public void setLinkmanUserPhone(String linkmanUserPhone) {
        this.linkmanUserPhone = linkmanUserPhone;
    }

    public Integer getSupplyCapability() {
        return supplyCapability;
    }

    public void setSupplyCapability(Integer supplyCapability) {
        this.supplyCapability = supplyCapability;
    }

    public String getBusinessLicenseImgUrl() {
        return businessLicenseImgUrl;
    }

    public void setBusinessLicenseImgUrl(String businessLicenseImgUrl) {
        this.businessLicenseImgUrl = businessLicenseImgUrl;
    }

    public String getIdCardPositiveImgUrl() {
        return idCardPositiveImgUrl;
    }

    public void setIdCardPositiveImgUrl(String idCardPositiveImgUrl) {
        this.idCardPositiveImgUrl = idCardPositiveImgUrl;
    }

    public String getIdCardOppositeImgUrl() {
        return idCardOppositeImgUrl;
    }

    public void setIdCardOppositeImgUrl(String idCardOppositeImgUrl) {
        this.idCardOppositeImgUrl = idCardOppositeImgUrl;
    }

	public String getSupplyAbility() {
		return supplyAbility;
	}

	public void setSupplyAbility(String supplyAbility) {
		this.supplyAbility = supplyAbility;
	}
}
