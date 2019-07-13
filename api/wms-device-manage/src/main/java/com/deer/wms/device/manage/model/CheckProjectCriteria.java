package com.deer.wms.device.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by GuoJingXun on 2018/10/11.
*/
public class CheckProjectCriteria extends QueryCriteria {

    private Integer deviceId;

    public Integer getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }
}
