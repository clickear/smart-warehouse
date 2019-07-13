package com.deer.wms.system.manage.model.user;

import org.springframework.web.multipart.MultipartFile;

/**
 * 用户注册信息类，用于接收用户注册信息
 *
 * Created by Floki on 2017/10/1.
 */
public class UserRegisterInfo {

    /**
     * 登录密码
     */
    private String password;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 性别：1=先生；2=女士；
     */
    private Integer gender;

    /**
     * 手机号码
     */
    private String mobile;

    /**
     * 短信验证码
     */
    private String smsCode;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 企业类型：1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；
     */
    private Integer companyType;

    /**
     * 企业名称
     */
    private String companyName;

    /**
     * 法人名称
     */
    private String artificialPersonName;

    /**
     * 法人身份证号
     */
    private String artificialPersonIdCard;

    /**
     * 社会信用代码
     */
    private String creditCode;

    /**
     * 企业注册地址
     */
    private String registeredAddress;

    /**
     * 企业成立时间
     */
    private String establishDate;

    /**
     * 联系地址
     */
    private String linkmanAddress;

    /**
     * 联系电话
     */
    private String linkmanPhone;

   /* *//**
     * 营业执照
     *//*
    private MultipartFile businessLicenseFile;

    *//**
     * 法人身份证正面
     *//*
    private MultipartFile artificialPersonIdCardPositiveFile;

    *//**
     * 法人身份证反面
     *//*
    private MultipartFile artificialPersonIdCardOppositeFile;*/

    /**
     * 经度
     */
    private String lng;

    /**
     * 纬度
     */
    private String lat;
    
   /* *//**
     * 营业执照临时文件路径
     *//*
    private String businessLicenseFilePath;
    private String businessLicenseFileContentType;

    *//**
     * 法人身份证正面临时文件路径
     *//*
    private String artificialPersonIdCardPositiveFilePath;
    private String artificialPersonIdCardPositiveFileContentType;

    *//**
     * 法人身份证反面临时文件路径
     *//*
    private String artificialPersonIdCardOppositeFilePath;
    private String artificialPersonIdCardOppositeFileContentType;*/
    
    /**
     * 供应能力
     */
    private String supplyAbility;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getSmsCode() {
        return smsCode;
    }

    public void setSmsCode(String smsCode) {
        this.smsCode = smsCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCompanyType() {
        return companyType;
    }

    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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

    public String getEstablishDate() {
        return establishDate;
    }

    public void setEstablishDate(String establishDate) {
        this.establishDate = establishDate;
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

   /* public MultipartFile getBusinessLicenseFile() {
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
    }*/

   /* public String getBusinessLicenseFilePath() {
        return businessLicenseFilePath;
    }

    public void setBusinessLicenseFilePath(String businessLicenseFilePath) {
        this.businessLicenseFilePath = businessLicenseFilePath;
    }

    public String getArtificialPersonIdCardPositiveFilePath() {
        return artificialPersonIdCardPositiveFilePath;
    }

    public void setArtificialPersonIdCardPositiveFilePath(String artificialPersonIdCardPositiveFilePath) {
        this.artificialPersonIdCardPositiveFilePath = artificialPersonIdCardPositiveFilePath;
    }

    public String getArtificialPersonIdCardOppositeFilePath() {
        return artificialPersonIdCardOppositeFilePath;
    }

    public void setArtificialPersonIdCardOppositeFilePath(String artificialPersonIdCardOppositeFilePath) {
        this.artificialPersonIdCardOppositeFilePath = artificialPersonIdCardOppositeFilePath;
    }

    public String getBusinessLicenseFileContentType() {
        return businessLicenseFileContentType;
    }

    public void setBusinessLicenseFileContentType(String businessLicenseFileContentType) {
        this.businessLicenseFileContentType = businessLicenseFileContentType;
    }

    public String getArtificialPersonIdCardPositiveFileContentType() {
        return artificialPersonIdCardPositiveFileContentType;
    }

    public void setArtificialPersonIdCardPositiveFileContentType(String artificialPersonIdCardPositiveFileContentType) {
        this.artificialPersonIdCardPositiveFileContentType = artificialPersonIdCardPositiveFileContentType;
    }

    public String getArtificialPersonIdCardOppositeFileContentType() {
        return artificialPersonIdCardOppositeFileContentType;
    }

    public void setArtificialPersonIdCardOppositeFileContentType(String artificialPersonIdCardOppositeFileContentType) {
        this.artificialPersonIdCardOppositeFileContentType = artificialPersonIdCardOppositeFileContentType;
    }*/

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

	public String getSupplyAbility() {
		return supplyAbility;
	}

	public void setSupplyAbility(String supplyAbility) {
		this.supplyAbility = supplyAbility;
	}


}
