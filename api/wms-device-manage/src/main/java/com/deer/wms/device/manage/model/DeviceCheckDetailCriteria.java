package com.deer.wms.device.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by GuoJingXun on 2018/10/16.
*/
public class DeviceCheckDetailCriteria extends QueryCriteria {

    private Integer deviceCheckMasterId;
    private Integer deviceSingleId;

    public Integer getDeviceCheckMasterId() {
        return deviceCheckMasterId;
    }

    public void setDeviceCheckMasterId(Integer deviceCheckMasterId) {
        this.deviceCheckMasterId = deviceCheckMasterId;
    }
}
