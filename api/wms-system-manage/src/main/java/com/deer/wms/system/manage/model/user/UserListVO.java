package com.deer.wms.system.manage.model.user;

import com.sun.org.apache.xpath.internal.operations.Bool;

/**
 * 账户管理信息列表视图类
 *
 * Created by Floki on 2017/10/13.
 */
public class UserListVO {
    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 手机号码
     */
    private String mobile;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 性别：1=先生；2=女士；
     */
    private Integer gender;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 用户角色
     */
    private String roleName;

    /**
     * 是否管理员
     */
    private Boolean admin;

    /**
     * 状态
     */
    private String accountStatus;

    /**
     * 所属单位
     */
    private String companyName;

    /**
     * 注册时间
     */
    private String registerTime;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(String registerTime) {
        this.registerTime = registerTime;
    }
}
