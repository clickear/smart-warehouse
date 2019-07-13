package com.deer.wms.message.model;

/**
 * 咨询管理扩展
 * @author songyuyang
 * @create 2017/11/22
 */
public class ConsultDto extends Consult
{
	/**
	 * 回复人姓名
	 */
	private String replyUserName;
	
	/**
	 * 咨询人公司名称
	 */
	private String companyName;
	
	/**
	 * 是否是登录用户咨询 ：0-否  1-是 
	 * (咨询人id是null时为0，否则为1)
	 */
	private String isLogin;
	
	/**
	 * 是否是电话回复(对未登录咨询用户的回复是电话回复)： 0-否 1-是
	 * (当咨询人id为null并且回复状态为已回复时为1，否则为0)
	 */
	private String isPhone;

	public String getReplyUserName() {
		return replyUserName;
	}

	public void setReplyUserName(String replyUserName) {
		this.replyUserName = replyUserName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(String isLogin) {
		this.isLogin = isLogin;
	}

	public String getIsPhone() {
		return isPhone;
	}

	public void setIsPhone(String isPhone) {
		this.isPhone = isPhone;
	}
	
	
}