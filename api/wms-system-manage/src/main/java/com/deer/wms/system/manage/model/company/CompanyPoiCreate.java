package com.deer.wms.system.manage.model.company;

import org.springframework.web.multipart.MultipartFile;

/**
 * 新增POI客户的信息类
 *
 * Created by Floki on 2017/10/9.
 */
public class CompanyPoiCreate {
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
    private String lon;

    /**
     * 纬度
     */
    private String lat;

    /**
     * 联系人/企业法人
     */
    private String artificialPersonName;

    /**
     * 联系人电话
     */
    private String linkmanUserPhone;

    /**
     * 营业执照
     */
    private MultipartFile businessLicenseFile;

    /**
     * 法人身份证正面
     */
    private MultipartFile artificialPersonIdCardPositiveFile;

    /**
     * 法人身份证反面
     */
    private MultipartFile artificialPersonIdCardOppositeFile;

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

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
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

    public String getLinkmanUserPhone() {
        return linkmanUserPhone;
    }

    public void setLinkmanUserPhone(String linkmanUserPhone) {
        this.linkmanUserPhone = linkmanUserPhone;
    }

    public MultipartFile getBusinessLicenseFile() {
        return businessLicenseFile;
    }

    public void setBusinessLicenseFile(MultipartFile businessLicenseFile) {
        this.businessLicenseFile = businessLicenseFile;
    }

    public MultipartFile getArtificialPersonIdCardPositiveFile() {
        return artificialPersonIdCardPositiveFile;
    }

    public void setArtificialPersonIdCardPositiveFile(MultipartFile artificialPersonIdCardPositiveFile) {
        this.artificialPersonIdCardPositiveFile = artificialPersonIdCardPositiveFile;
    }

    public MultipartFile getArtificialPersonIdCardOppositeFile() {
        return artificialPersonIdCardOppositeFile;
    }

    public void setArtificialPersonIdCardOppositeFile(MultipartFile artificialPersonIdCardOppositeFile) {
        this.artificialPersonIdCardOppositeFile = artificialPersonIdCardOppositeFile;
    }
}
