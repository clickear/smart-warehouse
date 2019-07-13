package com.deer.wms.system.manage.model.user;

/**
 * 账户详细信息的视图类
 *
 * Created by Floki on 2017/10/6.
 */
public class UserInfoDetailVO {
    /**
     * 用户信息id
     */
    private Integer userId;

    /**
     * 手机号码
     */
    private String mobile;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 姓名
     */
    private String userName;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 性别：1=先生；2=女士；
     */
    private Integer gender;

    /**
     * 单位名称
     */
    private String companyName;

    /**
     * 账户创建人姓名
     */
    private String createUserName;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 最后修改时间
     */
    private String modifyTime;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(String modifyTime) {
        this.modifyTime = modifyTime;
    }
}
