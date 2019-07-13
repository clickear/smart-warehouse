package com.deer.wms.device.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by GuoJingXun on 2018/10/16.
*/
public class DeviceCheckMasterCriteria extends QueryCriteria {

    private Integer companyId;
    private Integer type;
    private Integer dutyUserId;


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getDutyUserId() {
        return dutyUserId;
    }

    public void setDutyUserId(Integer dutyUserId) {
        this.dutyUserId = dutyUserId;
    }
}
