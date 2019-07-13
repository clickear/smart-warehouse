package com.deer.wms.system.manage.model.param;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/02.
*/
public class SystemParamCriteria extends QueryCriteria {
    /**
     * 状态：normal=正常的(启用)；invalid=无效的(停用)；
     */
    private String state;

    /**
     * 关键字
     */
    private String keyword;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
