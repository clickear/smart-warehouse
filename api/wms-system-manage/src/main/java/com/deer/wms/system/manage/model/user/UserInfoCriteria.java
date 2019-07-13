package com.deer.wms.system.manage.model.user;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/01.
*/
public class UserInfoCriteria extends QueryCriteria {
    /**
     * 角色类型(角色名称)
     */
    private String roleName;

    /**
     * 账户状态
     */
    private String accountStatus;

    /**
     * 关键字
     */
    private String keyword;
    
    // 仓库ID
    private Integer companyId;

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

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

	public Integer getCompanyId()
	{
		return companyId;
	}

	public void setCompanyId( Integer companyId )
	{
		this.companyId = companyId;
	}
}
