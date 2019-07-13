package com.deer.wms.message.model;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by Floki on 2017/10/17.
 */
public class Validate {
    /**
     * 业务类型：1=用户注册；2=找回密码；
     */
    @NotEmpty(message = "业务类型不能为空：1=用户注册；2=找回密码；")
    private String type;

    /**
     * 手机号码
     */
    private String mobile;

    /**
     * 手机短信验证码
     */
    private String smsCode;
    
    /**
     * 邮箱验证码：
     */
    private String emailCode;

    // 邮箱账号
    private String email;
    
    /**
     * 验证类型：1=手机验证；2：邮箱验证
     */
    private String validateType;
    
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

	public String getEmailCode()
	{
		return emailCode;
	}

	public void setEmailCode( String emailCode )
	{
		this.emailCode = emailCode;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail( String email )
	{
		this.email = email;
	}

	public String getValidateType()
	{
		return validateType;
	}

	public void setValidateType( String validateType )
	{
		this.validateType = validateType;
	}
}
