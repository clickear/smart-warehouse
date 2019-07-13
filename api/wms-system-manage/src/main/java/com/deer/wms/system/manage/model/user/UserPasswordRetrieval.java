package com.deer.wms.system.manage.model.user;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 用户密码找回信息
 *
 * Created by Floki on 2017/10/2.
 */
public class UserPasswordRetrieval {
    /**
     * 手机号码
     */
    @NotEmpty(message = "手机号码不能为空")
    private String mobile;

    /**
     * 新密码
     */
    @NotEmpty(message = "新密码不能为空")
    private String password;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
