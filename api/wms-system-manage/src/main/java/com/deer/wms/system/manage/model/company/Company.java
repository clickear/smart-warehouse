package com.deer.wms.system.manage.model.company;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.deer.wms.system.manage.model.storage.CompanyStorage;

public class Company {
    /**
     * 企业信息id
     */
    @Id
    @Column(name = "company_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer companyId;

    /**
     * 企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     */
    @Column(name = "company_type")
    private Integer companyType;

    /**
     * 企业名称
     */
    @Column(name = "company_name")
    private String companyName;

    /**
     * 法人名称
     */
    @Column(name = "artificial_person_name")
    private String artificialPersonName;

    /**
     * 法人身份证号
     */
    @Column(name = "artificial_person_id_card")
    private String artificialPersonIdCard;

    /**
     * 社会信用代码
     */
    @Column(name = "credit_code")
    private String creditCode;

    /**
     * 企业注册地址
     */
    @Column(name = "registered_address")
    private String registeredAddress;

    /**
     * 企业成立时间
     */
    @Column(name = "establish_date")
    private Date establishDate;

    /**
     * 联系地址
     */
    @Column(name = "linkman_address")
    private String linkmanAddress;

    /**
     * 联系电话
     */
    @Column(name = "linkman_phone")
    private String linkmanPhone;

    /**
     * 供应能力：xxx/周，只对供应商有效，默认0
     */
    @Column(name = "supply_capability")
    private Integer supplyCapability;

    /**
     * 联系人电话
     */
    @Column(name = "linkman_user_phone")
    private String linkmanUserPhone;

    /**
     * 经度
     */
    private String lng;

    /**
     * 纬度
     */
    private String lat;

    @Column(name = "role_id")
    private Integer roleId;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人
     */
    @Column(name = "create_user_id")
    private Integer createUserId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改人
     */
    @Column(name = "modify_user_id")
    private Integer modifyUserId;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;
    

    
	/**
     * 托盘的存量
     */
    @Transient
    private Integer palletCount;

    /**
     * 网点总数
     */
    @Transient
    private Integer storageCount;
    
    /**
     * 网点相关信息
     */
    @Transient
    private List<CompanyStorage>  companyStoragelist;

    /**
     * 获取企业信息id
     *
     * @return company_id - 企业信息id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置企业信息id
     *
     * @param companyId 企业信息id
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     *
     * @return company_type - 企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     */
    public Integer getCompanyType() {
        return companyType;
    }

    /**
     * 设置企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     *
     * @param companyType 企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     */
    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    /**
     * 获取企业名称
     *
     * @return company_name - 企业名称
     */
    public String getCompanyName() {
        return companyName;
    }

    /**
     * 设置企业名称
     *
     * @param companyName 企业名称
     */
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    /**
     * 获取法人名称
     *
     * @return artificial_person_name - 法人名称
     */
    public String getArtificialPersonName() {
        return artificialPersonName;
    }

    /**
     * 设置法人名称
     *
     * @param artificialPersonName 法人名称
     */
    public void setArtificialPersonName(String artificialPersonName) {
        this.artificialPersonName = artificialPersonName;
    }

    /**
     * 获取法人身份证号
     *
     * @return artificial_person_id_card - 法人身份证号
     */
    public String getArtificialPersonIdCard() {
        return artificialPersonIdCard;
    }

    /**
     * 设置法人身份证号
     *
     * @param artificialPersonIdCard 法人身份证号
     */
    public void setArtificialPersonIdCard(String artificialPersonIdCard) {
        this.artificialPersonIdCard = artificialPersonIdCard;
    }

    /**
     * 获取社会信用代码
     *
     * @return credit_code - 社会信用代码
     */
    public String getCreditCode() {
        return creditCode;
    }

    /**
     * 设置社会信用代码
     *
     * @param creditCode 社会信用代码
     */
    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }

    /**
     * 获取企业注册地址
     *
     * @return registered_address - 企业注册地址
     */
    public String getRegisteredAddress() {
        return registeredAddress;
    }

    /**
     * 设置企业注册地址
     *
     * @param registeredAddress 企业注册地址
     */
    public void setRegisteredAddress(String registeredAddress) {
        this.registeredAddress = registeredAddress;
    }

    /**
     * 获取企业成立时间
     *
     * @return establish_date - 企业成立时间
     */
    public Date getEstablishDate() {
        return establishDate;
    }

    /**
     * 设置企业成立时间
     *
     * @param establishDate 企业成立时间
     */
    public void setEstablishDate(Date establishDate) {
        this.establishDate = establishDate;
    }

    /**
     * 获取联系地址
     *
     * @return linkman_address - 联系地址
     */
    public String getLinkmanAddress() {
        return linkmanAddress;
    }

    /**
     * 设置联系地址
     *
     * @param linkmanAddress 联系地址
     */
    public void setLinkmanAddress(String linkmanAddress) {
        this.linkmanAddress = linkmanAddress;
    }

    /**
     * 获取联系电话
     *
     * @return linkman_phone - 联系电话
     */
    public String getLinkmanPhone() {
        return linkmanPhone;
    }

    /**
     * 设置联系电话
     *
     * @param linkmanPhone 联系电话
     */
    public void setLinkmanPhone(String linkmanPhone) {
        this.linkmanPhone = linkmanPhone;
    }

    public Integer getSupplyCapability() {
        return supplyCapability;
    }

    public void setSupplyCapability(Integer supplyCapability) {
        this.supplyCapability = supplyCapability;
    }

    public String getLinkmanUserPhone() {
        return linkmanUserPhone;
    }

    public void setLinkmanUserPhone(String linkmanUserPhone) {
        this.linkmanUserPhone = linkmanUserPhone;
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

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    /**
     * 获取信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @return state - 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @param state 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取创建人
     *
     * @return create_user_id - 创建人
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人
     *
     * @param createUserId 创建人
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取修改人
     *
     * @return modify_user_id - 修改人
     */
    public Integer getModifyUserId() {
        return modifyUserId;
    }

    /**
     * 设置修改人
     *
     * @param modifyUserId 修改人
     */
    public void setModifyUserId(Integer modifyUserId) {
        this.modifyUserId = modifyUserId;
    }

    /**
     * 获取修改时间
     *
     * @return modify_time - 修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置修改时间
     *
     * @param modifyTime 修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

	public Integer getPalletCount() {
		return palletCount;
	}

	public void setPalletCount(Integer palletCount) {
		this.palletCount = palletCount;
	}

	public Integer getStorageCount() {
		return storageCount;
	}

	public void setStorageCount(Integer storageCount) {
		this.storageCount = storageCount;
	}

	public List<CompanyStorage> getCompanyStoragelist() {
		return companyStoragelist;
	}

	public void setCompanyStoragelist(List<CompanyStorage> companyStoragelist) {
		this.companyStoragelist = companyStoragelist;
	}
	

}