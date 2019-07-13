package com.deer.wms.system.manage.model.role;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/07.
*/
public class RoleCriteria extends QueryCriteria {
    /**
     * 角色层级
     */
    private Integer roleLevel;

    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 公司id
     */
    private Integer companyId;

    /**
     * 关键字查询
     */
    private String keyword;


    public Integer getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(Integer roleLevel) {
        this.roleLevel = roleLevel;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
