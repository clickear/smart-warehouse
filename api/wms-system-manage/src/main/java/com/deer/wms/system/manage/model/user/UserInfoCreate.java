package com.deer.wms.system.manage.model.user;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 创建用户的信息类
 *
 * Created by Floki on 2017/10/6.
 */
public class UserInfoCreate {
    /**
     * 用户所属公司信息id
     */
    private Integer companyId;

    /**
     * 用户所属角色信息id
     */
    private Integer roleId;

    /**
     * 姓名
     */
    private String userName;

    /**
     * 登录密码
     */
    @NotEmpty(message = "登录密码不能为空")
    private String password;

    /**
     * 确认密码
     */
    private String confirmPassword;

    /**
     * 性别：1=先生；2=女士；
     */
    private Integer gender;

    /**
     * 手机号码
     */
    @NotEmpty(message = "手机号码不能为空")
    private String mobile;

    /**
     * 电子邮箱
     */
    private String email;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
