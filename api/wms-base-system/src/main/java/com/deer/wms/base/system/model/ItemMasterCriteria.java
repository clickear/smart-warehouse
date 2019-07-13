package com.deer.wms.base.system.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by guo on 2018/08/03.
*/
public class ItemMasterCriteria extends QueryCriteria {
    private Integer companyId;


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}
