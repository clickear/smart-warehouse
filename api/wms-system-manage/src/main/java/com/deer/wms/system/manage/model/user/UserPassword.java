package com.deer.wms.system.manage.model.user;

/**
 * 用户修改自己账户密码的封装类
 *
 * Created by Floki on 2017/10/2.
 */
public class UserPassword {
    /**
     * 旧密码
     */
    private String oldPassword;

    /**
     * 新密码
     */
    private String password;

    /**
     * 确认密码
     */
    private String confirmPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
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
}
